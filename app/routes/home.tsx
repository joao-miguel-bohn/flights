import { useEffect, useState } from 'react';
import { flights } from '../data/flights';
import { airports } from '../data/airports';
import type { Route } from "./+types/home";
import 'flag-icons/css/flag-icons.min.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flight Routes Map" },
    { name: "description", content: "Map showing all flight routes" },
  ];
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [reactLeaflet, setReactLeaflet] = useState<any>(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import('react-leaflet').then((mod) => {
      import('leaflet/dist/leaflet.css');
      setReactLeaflet(mod);
    });
  }, []);

  // Sort flights by date, most recent first
  const sortedFlights = [...flights].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (!isClient || !reactLeaflet) {
    return (
      <div style={{ height: '96vh', width: '100%', display: 'flex', overflow: 'hidden' }}>
        <div style={{ padding: '20px' }}>Loading map...</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, CircleMarker, Popup } = reactLeaflet;

  // Map of airport codes to coordinates
  const airportMap = new Map(airports.map(a => [a.id, a]));
  
  // Get unique airports that have flights
  const usedAirports = new Set<string>();
  flights.forEach(flight => {
    usedAirports.add(flight.originAirport);
    usedAirports.add(flight.destinationAirport);
  });
  const airportMarkers = Array.from(usedAirports)
    .map(code => airportMap.get(code))
    .filter(Boolean);

  return (
    <div className="map-container">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileListOpen(!isMobileListOpen)}
        className="mobile-toggle"
      >
        {isMobileListOpen ? 'Hide' : 'Flights'} ({sortedFlights.length})
      </button>

      {/* Flight list sidebar */}
      <div className={`flight-sidebar ${isMobileListOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            Flights ({sortedFlights.length})
          </h2>
        </div>
        <div>
          {sortedFlights.map((flight, idx) => {
            const airport = airports.find(a => a.id === flight.originAirport);
            const destAirport = airports.find(a => a.id === flight.destinationAirport);
            const flightId = `${flight.flightNumber}-${flight.date}`;
            const isSelected = selectedFlight === flightId;
            
            return (
              <div
                key={idx}
                onClick={() => setSelectedFlight(isSelected ? null : flightId)}
                className={`flight-item ${isSelected ? 'selected' : ''}`}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.classList.add('hover');
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.classList.remove('hover');
                }}
              >
                <div className="flight-number">
                  {flight.flightNumber}
                </div>
                <div className="flight-route">
                  <span className={`fi fi-${airport?.country.toLowerCase()}`}></span>
                  <span>{airport?.city}</span>
                  <span>→</span>
                  <span className={`fi fi-${destAirport?.country.toLowerCase()}`}></span>
                  <span>{destAirport?.city}</span>
                </div>
                <div className="flight-details">
                  {flight.date} • {flight.departureTime} • {flight.planeType}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <MapContainer 
          center={[25, 55]} 
          zoom={3} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Draw flight routes */}
          {flights.map((flight) => {
            const from = airportMap.get(flight.originAirport);
            const to = airportMap.get(flight.destinationAirport);
            if (!from || !to) return null;
            
            const flightId = `${flight.flightNumber}-${flight.date}`;
            const isSelected = selectedFlight === flightId;
            
            return (
              <Polyline
                key={flightId}
                positions={[
                  [from.coords[0], from.coords[1]],
                  [to.coords[0], to.coords[1]],
                ]}
                pathOptions={{
                  color: isSelected ? "#ef4444" : "#3b82f6",
                  weight: isSelected ? 4 : 2,
                  opacity: isSelected ? 1 : 0.6,
                }}
              />
            );
          })}

          {/* Draw airport markers */}
          {airportMarkers.map((airport) => (
            <CircleMarker
              key={airport!.id}
              center={[airport!.coords[0], airport!.coords[1]]}
              radius={6}
              fillColor="#ef4444"
              fillOpacity={0.8}
              color="#fff"
              weight={2}
            >
              <Popup>
                <strong>{airport!.city}</strong><br />
                {airport!.name} ({airport!.id})
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <style>{`
        .map-container {
          height: 96vh;
          width: 100%;
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .mobile-toggle {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10001;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: none;
        }

        .flight-sidebar {
          width: 350px;
          height: 100%;
          overflow-y: auto;
          border-right: 1px solid #e5e7eb;
          background: #fff;
          position: relative;
          z-index: 999;
        }

        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .sidebar-title {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }

        .flight-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          background: #fff;
          transition: background 0.2s;
        }

        .flight-item.selected {
          background: #eff6ff;
        }

        .flight-item.hover {
          background: #f9fafb;
        }

        .flight-number {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .flight-route {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .flight-route .fi {
          font-size: 16px;
        }

        .flight-details {
          font-size: 12px;
          color: #9ca3af;
        }

        .map-wrapper {
          flex: 1;
          height: 100%;
        }
        
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block !important;
            z-index: 20001 !important;
          }
          
          .leaflet-container {
            z-index: 1 !important;
          }
          
          [data-vaul-drawer],
          [data-vaul-drawer-wrapper],
          .group\\/sidebar {
            z-index: 100 !important;
          }
          
          .flight-sidebar:not(.mobile-open) {
            display: none !important;
          }
          
          .flight-sidebar.mobile-open {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: 75vh !important;
            z-index: 20000 !important;
            overflow-y: auto !important;
            border-right: none !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
          }
        }
      `}</style>
    </div>
  );
}
