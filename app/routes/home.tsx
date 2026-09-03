import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { flights } from '../data/flights';
import { airports, type AirportCode } from '../data/airports';
import type { Airport } from '../types/airport';
import type { Route } from "./+types/home";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { format, startOfDay } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';
import { AIRCRAFT_TYPES, type AircraftType } from '../types/flight';

// Served by the maplibreGlWorkerAssets Vite plugin (vite.config.ts), which copies
// maplibre-gl's worker files from node_modules to this fixed path so the bundler's
// dependency optimizer/rollup step doesn't need to statically detect the worker.
const MAPLIBRE_WORKER_URL = '/maplibre-gl-worker.mjs';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flight Routes Map" },
    { name: "description", content: "Map showing all flight routes" },
  ];
}

// Helper function to normalize dates to start of day
const normalizeDate = (date: Date): Date => startOfDay(date);

// Raster style pointing at the public OSM tile server, mirroring the previous Leaflet TileLayer.
const OSM_STYLE = {
  version: 8,
  projection: { type: 'globe' },
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [reactMapGl, setReactMapGl] = useState<any>(null);
  const [popupAirport, setPopupAirport] = useState<Airport | null>(null);
  const [projection, setProjection] = useState<'globe' | 'mercator'>('globe');
  const mapRef = useRef<any>(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [aircraftFilter, setAircraftFilter] = useState<'all' | AircraftType>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    Promise.all([
      import('react-map-gl/maplibre'),
      import('maplibre-gl'),
      import('maplibre-gl/dist/maplibre-gl.css'),
    ]).then(([mod, maplibregl]) => {
      maplibregl.setWorkerUrl(MAPLIBRE_WORKER_URL);
      setReactMapGl(mod);
    });
  }, []);

  // Memoize airport lookup map
  const airportMap = useMemo(() => {
    return new Map(airports.map(a => [a.id, a] as const));
  }, []);

  // Sort flights by date, most recent first
  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => {
      return b.departureDateTime.getTime() - a.departureDateTime.getTime();
    });
  }, []);

  // Filter flights by aircraft type and date range
  const filteredFlights = useMemo(() => {
    return sortedFlights.filter(flight => {
      // Aircraft filter
      if (aircraftFilter !== 'all' && flight.planeType !== aircraftFilter) {
        return false;
      }
      
      // Date range filter
      if (startDate || endDate) {
        const flightDate = normalizeDate(flight.departureDateTime);
        
        if (startDate && flightDate < normalizeDate(startDate)) {
          return false;
        }
        
        if (endDate && flightDate > normalizeDate(endDate)) {
          return false;
        }
      }
      
      return true;
    });
  }, [sortedFlights, aircraftFilter, startDate, endDate]);

  // Memoize used airports for markers
  const usedAirports = useMemo(() => {
    const airportSet = new Set<AirportCode>();
    filteredFlights.forEach(flight => {
      airportSet.add(flight.originAirport);
      airportSet.add(flight.destinationAirport);
    });
    return airportSet;
  }, [filteredFlights]);

  // Calculate route frequencies for color coding
  const { routeFrequencies, maxFrequency, uniqueRoutes } = useMemo(() => {
    const frequencyMap = new Map<string, number>();
    const routeSet = new Set<string>();
    
    filteredFlights.forEach(flight => {
      const routeKey = `${flight.originAirport}-${flight.destinationAirport}`;
      frequencyMap.set(routeKey, (frequencyMap.get(routeKey) || 0) + 1);
      routeSet.add(routeKey);
    });
    
    const max = Math.max(...Array.from(frequencyMap.values()), 1);
    
    return {
      routeFrequencies: frequencyMap,
      maxFrequency: max,
      uniqueRoutes: routeSet
    };
  }, [filteredFlights]);

  // Helper function to get color and weight based on frequency
  const getRouteStyle = useCallback((originAirport: string, destinationAirport: string, isSelected: boolean) => {
    if (isSelected) {
      return {
        color: "#ef4444",
        weight: 5,
        opacity: 1
      };
    }
    
    const routeKey = `${originAirport}-${destinationAirport}`;
    const frequency = routeFrequencies.get(routeKey) || 1;
    const normalizedFrequency = frequency / maxFrequency;
    
    // Color gradient from light blue (infrequent) to dark blue (frequent)
    const opacity = 0.3 + (normalizedFrequency * 0.5); // 0.3 to 0.8
    const weight = 1 + (normalizedFrequency * 3); // 1 to 4
    
    // Use a color gradient based on frequency
    const hue = 210; // Blue hue
    const saturation = 70 + (normalizedFrequency * 30); // 70% to 100%
    const lightness = 65 - (normalizedFrequency * 25); // 65% to 40% (darker = more frequent)
    
    return {
      color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      weight: weight,
      opacity: opacity
    };
  }, [routeFrequencies, maxFrequency]);

  // Clear dates handler
  const handleClearDates = useCallback(() => {
    setStartDate(undefined);
    setEndDate(undefined);
  }, []);

  // Build a single GeoJSON FeatureCollection for all routes (MapLibre uses [lng, lat] order)
  const routesGeoJSON = useMemo(() => {
    const features = Array.from(uniqueRoutes)
      .map((routeKey) => {
        const [originAirport, destinationAirport] = routeKey.split('-') as [AirportCode, AirportCode];
        const from = airportMap.get(originAirport);
        const to = airportMap.get(destinationAirport);
        if (!from || !to) return null;

        const isRouteSelected = filteredFlights.some(flight =>
          flight.originAirport === originAirport &&
          flight.destinationAirport === destinationAirport &&
          selectedFlight === `${flight.flightNumber}-${flight.departureDateTime.toISOString()}`
        );

        const style = getRouteStyle(originAirport, destinationAirport, isRouteSelected);

        return {
          type: 'Feature' as const,
          properties: style,
          geometry: {
            type: 'LineString' as const,
            coordinates: [
              [from.coords[1], from.coords[0]],
              [to.coords[1], to.coords[0]],
            ],
          },
        };
      })
      .filter((feature) => feature !== null);

    return { type: 'FeatureCollection' as const, features };
  }, [uniqueRoutes, airportMap, filteredFlights, selectedFlight, getRouteStyle]);

  // Build a GeoJSON FeatureCollection for the airport circle markers.
  // Every known airport is shown, even ones with no flight yet, styled by visited state.
  const airportsGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: airports.map((airport) => ({
        type: 'Feature' as const,
        properties: { id: airport.id, visited: usedAirports.has(airport.id) },
        geometry: {
          type: 'Point' as const,
          coordinates: [airport.coords[1], airport.coords[0]],
        },
      })),
    };
  }, [usedAirports]);

  const handleMapClick = useCallback((event: any) => {
    const feature = event.features?.[0];
    if (feature?.layer?.id === 'airport-circles') {
      const airport = airportMap.get(feature.properties.id as AirportCode);
      setPopupAirport(airport ?? null);
      return;
    }
    setPopupAirport(null);
  }, [airportMap]);

  const handleToggleProjection = useCallback(() => {
    setProjection((current) => {
      const next = current === 'globe' ? 'mercator' : 'globe';
      mapRef.current?.getMap().setProjection({ type: next });
      return next;
    });
  }, []);

  if (!isClient || !reactMapGl) {
    return (
      <div className="h-[96vh] w-full flex overflow-hidden">
        <div className="p-5">Loading map...</div>
      </div>
    );
  }

  const { Map: MapGL, Source, Layer, Popup, NavigationControl } = reactMapGl;

  return (
    <div className="h-[96vh] w-full flex overflow-hidden relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileListOpen(!isMobileListOpen)}
        className="md:hidden absolute top-4 right-4 z-30 bg-white border border-gray-200 rounded-lg px-4 py-2.5 cursor-pointer font-semibold text-sm shadow-md"
      >
        {isMobileListOpen ? 'Hide' : 'Flights'} ({filteredFlights.length})
      </button>

      {/* Flight list sidebar */}
      <div className={`w-[350px] h-full overflow-y-auto border-r border-gray-200 bg-white relative z-10 hidden md:block ${isMobileListOpen ? 'mobile-open' : ''}`}>
        <div className="p-4 border-b border-gray-200 space-y-3">
          <h2 className="m-0 text-lg font-bold">
            Flights ({filteredFlights.length})
          </h2>
          
          <Select value={aircraftFilter} onValueChange={(value) => setAircraftFilter(value as 'all' | AircraftType)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Aircraft Type" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectGroup>
                <SelectItem value="all">All Aircraft</SelectItem>
                {AIRCRAFT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Date Range</span>
              {(startDate || endDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearDates}
                  className="h-auto py-1 px-2 text-xs"
                >
                  <XIcon className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!startDate}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!endDate}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          {filteredFlights.map((flight) => {
            const airport = airportMap.get(flight.originAirport);
            const destAirport = airportMap.get(flight.destinationAirport);
            const flightId = `${flight.flightNumber}-${flight.departureDateTime.toISOString()}`;
            const isSelected = selectedFlight === flightId;
            
            if (!airport || !destAirport) return null;
            
            return (
              <div
                key={flightId}
                onClick={() => setSelectedFlight(isSelected ? null : flightId)}
                className={`py-3 px-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                  isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {flight.flightNumber}
                </div>
                <div className="text-[13px] text-gray-600 mb-1 flex items-center gap-1.5">
                  <span className={`fi fi-${airport.country.toLowerCase()} text-base`}></span>
                  <span>{airport.city}</span>
                  <span>→</span>
                  <span className={`fi fi-${destAirport.country.toLowerCase()} text-base`}></span>
                  <span>{destAirport.city}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {format(flight.departureDateTime, 'yyyy-MM-dd')} • {format(flight.departureDateTime, 'HH:mm')} • {flight.planeType}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 h-full relative">
        <button
          onClick={handleToggleProjection}
          className="absolute bottom-6 left-2.5 z-10 bg-white border border-gray-200 rounded-md px-3 py-1.5 cursor-pointer font-medium text-xs shadow-md"
        >
          {projection === 'globe' ? '2D' : 'Globe'}
        </button>

        <MapGL
          ref={mapRef}
          initialViewState={{ longitude: 55, latitude: 25, zoom: 3 }}
          style={{ height: '100%', width: '100%' }}
          mapStyle={OSM_STYLE}
          interactiveLayerIds={['airport-circles']}
          onClick={handleMapClick}
        >
          <NavigationControl position="top-left" showCompass={false} />

          {/* Draw flight routes */}
          <Source id="routes" type="geojson" data={routesGeoJSON}>
            <Layer
              id="route-lines"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': ['get', 'weight'],
                'line-opacity': ['get', 'opacity'],
              }}
            />
          </Source>

          {/* Draw airport markers */}
          <Source id="airports" type="geojson" data={airportsGeoJSON}>
            <Layer
              id="airport-circles"
              type="circle"
              paint={{
                'circle-radius': ['case', ['get', 'visited'], 6, 5],
                'circle-color': ['case', ['get', 'visited'], '#ef4444', '#2563eb'],
                'circle-opacity': ['case', ['get', 'visited'], 0.9, 0.85],
                'circle-stroke-color': '#fff',
                'circle-stroke-width': ['case', ['get', 'visited'], 2, 1.5],
              }}
            />
          </Source>

          {popupAirport && (
            <Popup
              longitude={popupAirport.coords[1]}
              latitude={popupAirport.coords[0]}
              onClose={() => setPopupAirport(null)}
              closeOnClick={false}
            >
              <strong>{popupAirport.city}</strong><br />
              {popupAirport.name} ({popupAirport.id})
            </Popup>
          )}
        </MapGL>
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
            z-index: 20 !important;
            overflow-y: auto !important;
            border-right: none !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
          }
          
          .maplibregl-map {
            z-index: 0 !important;
          }
          
          [data-vaul-drawer],
          [data-vaul-drawer-wrapper],
          .group\\/sidebar {
            z-index: 40 !important;
          }
        }
      `}</style>
    </div>
  );
}
