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
      <div className="h-[96vh] w-full flex overflow-hidden">
        <div className="p-5">Loading map...</div>
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
    <div className="h-[96vh] w-full flex overflow-hidden relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileListOpen(!isMobileListOpen)}
        className="hidden md:hidden absolute top-4 right-4 z-[20001] bg-white border border-gray-200 rounded-lg px-4 py-2.5 cursor-pointer font-semibold text-sm shadow-md"
      >
        {isMobileListOpen ? 'Hide' : 'Flights'} ({sortedFlights.length})
      </button>

      {/* Flight list sidebar */}
      <div className={`w-[350px] h-full overflow-y-auto border-r border-gray-200 bg-white relative z-[999] ${isMobileListOpen ? 'mobile-open' : ''}`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="m-0 text-lg font-bold">
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
                className={`py-3 px-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                  isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {flight.flightNumber}
                </div>
                <div className="text-[13px] text-gray-600 mb-1 flex items-center gap-1.5">
                  <span className={`fi fi-${airport?.country.toLowerCase()} text-base`}></span>
                  <span>{airport?.city}</span>
                  <span>→</span>
                  <span className={`fi fi-${destAirport?.country.toLowerCase()} text-base`}></span>
                  <span>{destAirport?.city}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {flight.date} • {flight.departureTime} • {flight.planeType}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 h-full">
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
        @media (max-width: 768px) {
          .mobile-open {
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
          
          .leaflet-container {
            z-index: 1 !important;
          }
          
          [data-vaul-drawer],
          [data-vaul-drawer-wrapper],
          .group\\/sidebar {
            z-index: 100 !important;
          }
        }
      `}</style>
    </div>
  );
}
