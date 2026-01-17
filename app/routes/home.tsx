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
    <div style={{ height: '96vh', width: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Flight list sidebar */}
      <div style={{ 
        width: '350px', 
        height: '100%', 
        overflowY: 'auto', 
        borderRight: '1px solid #e5e7eb',
        background: '#fff'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
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
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  background: isSelected ? '#eff6ff' : '#fff',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#fff';
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {flight.flightNumber}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`fi fi-${airport?.country.toLowerCase()}`} style={{ fontSize: '16px' }}></span>
                  <span>{airport?.city}</span>
                  <span>→</span>
                  <span className={`fi fi-${destAirport?.country.toLowerCase()}`} style={{ fontSize: '16px' }}></span>
                  <span>{destAirport?.city}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {flight.date} • {flight.departureTime} • {flight.planeType}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, height: '100%' }}>
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
    </div>
  );
}
