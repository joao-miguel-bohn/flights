import type { Route } from "./+types/stats";
import { flights } from '../data/flights';
import { airports } from '../data/airports';
import 'flag-icons/css/flag-icons.min.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flight Statistics" },
    { name: "description", content: "Statistics about flight routes" },
  ];
}

export default function Stats() {
  // Calculate top countries
  const countryCount = new Map<string, { name: string; count: number }>();
  flights.forEach(flight => {
    const destAirport = airports.find(a => a.id === flight.destinationAirport);
    if (destAirport) {
      const existing = countryCount.get(destAirport.country);
      if (existing) {
        existing.count++;
      } else {
        countryCount.set(destAirport.country, { name: destAirport.country, count: 1 });
      }
    }
  });
  const topCountries = Array.from(countryCount.values())
    .sort((a, b) => b.count - a.count);

  // Calculate top aircraft
  const aircraftCount = new Map<string, number>();
  flights.forEach(flight => {
    aircraftCount.set(flight.planeType, (aircraftCount.get(flight.planeType) || 0) + 1);
  });
  const topAircraft = Array.from(aircraftCount.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Calculate top cities
  const cityCount = new Map<string, { name: string; country: string; count: number }>();
  flights.forEach(flight => {
    const destAirport = airports.find(a => a.id === flight.destinationAirport);
    if (destAirport) {
      const existing = cityCount.get(destAirport.city);
      if (existing) {
        existing.count++;
      } else {
        cityCount.set(destAirport.city, { 
          name: destAirport.city, 
          country: destAirport.country,
          count: 1 
        });
      }
    }
  });
  const topCities = Array.from(cityCount.values())
    .sort((a, b) => b.count - a.count);

  // Total stats
  const totalFlights = flights.length;
  const uniqueCountries = new Set(flights.map(f => {
    const airport = airports.find(a => a.id === f.destinationAirport);
    return airport?.country;
  }).filter(Boolean)).size;
  const uniqueCities = new Set(flights.map(f => {
    const airport = airports.find(a => a.id === f.destinationAirport);
    return airport?.city;
  }).filter(Boolean)).size;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Flight Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-blue-500 mb-2">{totalFlights}</div>
          <div className="text-sm text-gray-600 font-medium">Total Flights</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-blue-500 mb-2">{uniqueCountries}</div>
          <div className="text-sm text-gray-600 font-medium">Countries Visited</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-blue-500 mb-2">{uniqueCities}</div>
          <div className="text-sm text-gray-600 font-medium">Cities Visited</div>
        </div>
      </div>

      {/* Statistics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Countries */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Top Countries</h2>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {topCountries.map((country, idx) => (
              <div key={country.name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="text-lg font-bold text-gray-400 min-w-[24px]">{idx + 1}</div>
                <span className={`fi fi-${country.name.toLowerCase()} text-xl`}></span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{country.name}</div>
                  <div className="text-sm text-gray-600">{country.count} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Top Cities</h2>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {topCities.map((city, idx) => (
              <div key={city.name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="text-lg font-bold text-gray-400 min-w-[24px]">{idx + 1}</div>
                <span className={`fi fi-${city.country.toLowerCase()} text-xl`}></span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{city.name}</div>
                  <div className="text-sm text-gray-600">{city.count} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Aircraft */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Aircraft Types</h2>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {topAircraft.map((aircraft, idx) => (
              <div key={aircraft.type} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="text-lg font-bold text-gray-400 min-w-[24px]">{idx + 1}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{aircraft.type}</div>
                  <div className="text-sm text-gray-600">{aircraft.count} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
