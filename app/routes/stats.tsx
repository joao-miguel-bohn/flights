import { useState } from 'react';
import type { Route } from "./+types/stats";
import { flights } from '../data/flights';
import { airports } from '../data/airports';
import type { Flight } from '../types/flight';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import { format } from 'date-fns';
import { ChevronDown, ChevronRight } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flight Statistics" },
    { name: "description", content: "Statistics about flight routes" },
  ];
}

interface AirportStat {
  id: string;
  name: string;
  city: string;
  country: string;
  count: number;
}

// A single airport row that expands to show every flight date to that airport
function AirportRow({ airport, flightsForAirport, rank }: {
  airport: AirportStat;
  flightsForAirport: Flight[];
  rank?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand = airport.count > 0;

  return (
    <div className={`rounded-lg bg-gray-50 ${airport.count === 0 ? 'opacity-50' : ''}`}>
      <button
        type="button"
        onClick={() => canExpand && setIsExpanded(v => !v)}
        disabled={!canExpand}
        className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 text-left ${canExpand ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {rank !== undefined && <div className="text-lg font-bold text-gray-400 w-6">{rank}</div>}
        <span className={`fi fi-${airport.country.toLowerCase()} text-xl`}></span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{airport.id}</div>
          <div className="text-sm text-gray-600 truncate">{airport.name} ({airport.city})</div>
          <div className="text-xs text-gray-500">{airport.count} flights</div>
        </div>
        {canExpand && (
          isExpanded
            ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {isExpanded && (
        <div className="px-2 md:px-3 pb-2 md:pb-3">
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto bg-white border rounded-md p-2">
            {flightsForAirport.map(flight => (
              <div
                key={`${flight.flightNumber}-${flight.departureDateTime.toISOString()}`}
                className="flex items-center justify-between gap-2 text-xs py-1 px-1.5 rounded hover:bg-gray-50"
              >
                <span className="font-medium">{format(flight.departureDateTime, 'MMM d, yyyy')}</span>
                <span className="text-gray-400 truncate">{flight.flightNumber} · from {flight.originAirport}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Stats() {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const toggleCountry = (name: string) => {
    setExpandedCountries(current => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Calculate top airports — include every known airport, even ones never flown to
  const airportCount = new Map<string, AirportStat>();
  airports.forEach(airport => {
    airportCount.set(airport.id, {
      id: airport.id,
      name: airport.name,
      city: airport.city,
      country: airport.country,
      count: 0
    });
  });
  flights.forEach(flight => {
    const existing = airportCount.get(flight.destinationAirport);
    if (existing) {
      existing.count++;
    }
  });
  const topAirports = Array.from(airportCount.values())
    .sort((a, b) => b.count - a.count);
  const visitedAirportsCount = topAirports.filter(a => a.count > 0).length;
  const totalAirportsCount = airports.length;

  // Flights that landed at each airport, most recent first — used by the collapsible date list
  const airportFlights = new Map<string, Flight[]>();
  flights.forEach(flight => {
    const list = airportFlights.get(flight.destinationAirport);
    if (list) {
      list.push(flight);
    } else {
      airportFlights.set(flight.destinationAirport, [flight]);
    }
  });
  airportFlights.forEach(list => list.sort((a, b) => b.departureDateTime.getTime() - a.departureDateTime.getTime()));

  // Every known airport grouped by country, so we can show a per-country completion percentage
  const airportsByCountry = new Map<string, AirportStat[]>();
  topAirports.forEach(airport => {
    const list = airportsByCountry.get(airport.country);
    if (list) {
      list.push(airport);
    } else {
      airportsByCountry.set(airport.country, [airport]);
    }
  });

  // Calculate top countries — include every known country, even ones never flown to
  const countryCount = new Map<string, number>();
  flights.forEach(flight => {
    const destAirport = airports.find(a => a.id === flight.destinationAirport);
    if (destAirport) {
      countryCount.set(destAirport.country, (countryCount.get(destAirport.country) || 0) + 1);
    }
  });
  const topCountries = Array.from(airportsByCountry.entries())
    .map(([countryCode, countryAirports]) => {
      const totalAirports = countryAirports.length;
      const visitedAirports = countryAirports.filter(a => a.count > 0).length;
      const percentage = totalAirports > 0 ? Math.round((visitedAirports / totalAirports) * 100) : 0;
      return {
        name: countryCode,
        count: countryCount.get(countryCode) ?? 0,
        airports: countryAirports,
        totalAirports,
        visitedAirports,
        percentage
      };
    })
    .sort((a, b) => b.count - a.count);
  const visitedCountriesCount = topCountries.filter(c => c.count > 0).length;
  const totalCountriesCount = topCountries.length;

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

  // Calculate flights per month
  const monthlyFlights = new Map<string, number>();
  flights.forEach(flight => {
    const monthKey = `${flight.departureDateTime.getFullYear()}-${String(flight.departureDateTime.getMonth() + 1).padStart(2, '0')}`;
    monthlyFlights.set(monthKey, (monthlyFlights.get(monthKey) || 0) + 1);
  });
  
  const chartData = Array.from(monthlyFlights.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => {
      const [year, monthNum] = month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        month: `${monthNames[parseInt(monthNum) - 1]} ${year}`,
        flights: count
      };
    });

  const chartConfig = {
    flights: {
      label: "Flights",
      color: "#3b82f6",
    },
  };

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
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Flight Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-white border rounded-xl p-4 md:p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{totalFlights}</div>
          <div className="text-sm text-gray-600 font-medium">Total Flights</div>
        </div>
        <div className="bg-white border rounded-xl p-4 md:p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{uniqueCountries}</div>
          <div className="text-sm text-gray-600 font-medium">Countries Visited</div>
        </div>
        <div className="bg-white border rounded-xl p-4 md:p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{uniqueCities}</div>
          <div className="text-sm text-gray-600 font-medium">Cities Visited</div>
        </div>
      </div>

      {/* Flights Per Month Chart */}
      <div className="bg-white border rounded-xl p-4 md:p-6 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">Flights Per Month</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <div className="min-w-[500px]">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="flights" fill="var(--color-flights)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* Statistics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Countries */}
        <div className="bg-white border rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold">Top Countries</h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 whitespace-nowrap">
              {visitedCountriesCount} of {totalCountriesCount} visited
            </span>
          </div>
          <div className="flex flex-col gap-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
            {topCountries.map((country, idx) => {
              const isExpanded = expandedCountries.has(country.name);
              return (
                <div key={country.name} className={`rounded-lg bg-gray-50 ${country.count === 0 ? 'opacity-50' : ''}`}>
                  <button
                    type="button"
                    onClick={() => toggleCountry(country.name)}
                    className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 text-left cursor-pointer"
                  >
                    <div className="text-lg font-bold text-gray-400 w-6">{idx + 1}</div>
                    <span className={`fi fi-${country.name.toLowerCase()} text-xl`}></span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{country.name}</div>
                      <div className="text-sm text-gray-600">{country.count} flights</div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1 whitespace-nowrap shrink-0">
                      {country.visitedAirports}/{country.totalAirports} airports · {country.percentage}%
                    </span>
                    {isExpanded
                      ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="px-2 md:px-3 pb-2 md:pb-3 flex flex-col gap-2">
                      {country.airports.map(airport => (
                        <AirportRow
                          key={airport.id}
                          airport={airport}
                          flightsForAirport={airportFlights.get(airport.id) ?? []}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white border rounded-xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Top Cities</h2>
          <div className="flex flex-col gap-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
            {topCities.map((city, idx) => (
              <div key={city.name} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-gray-50">
                <div className="text-lg font-bold text-gray-400 w-6">{idx + 1}</div>
                <span className={`fi fi-${city.country.toLowerCase()} text-xl`}></span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{city.name}</div>
                  <div className="text-sm text-gray-600">{city.count} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Aircraft */}
        <div className="bg-white border rounded-xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Aircraft Types</h2>
          <div className="flex flex-col gap-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
            {topAircraft.map((aircraft, idx) => (
              <div key={aircraft.type} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-gray-50">
                <div className="text-lg font-bold text-gray-400 w-6">{idx + 1}</div>
                <div className="flex-1">
                  <div className="font-semibold">{aircraft.type}</div>
                  <div className="text-sm text-gray-600">{aircraft.count} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Visited Airports */}
        <div className="bg-white border rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold">Most Visited Airports</h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 whitespace-nowrap">
              {visitedAirportsCount} of {totalAirportsCount} visited
            </span>
          </div>
          <div className="flex flex-col gap-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
            {topAirports.map((airport, idx) => (
              <AirportRow
                key={airport.id}
                airport={airport}
                flightsForAirport={airportFlights.get(airport.id) ?? []}
                rank={idx + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
