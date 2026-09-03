import { useCallback, useEffect, useRef, useState } from 'react';
import type { AirportCode } from '../data/airports';
import type { Airport } from '../types/airport';

// This file's `.client.tsx` suffix tells @react-router/dev's Vite plugin to strip it
// (and everything it imports, including maplibre-gl and react-map-gl) from the SSR
// bundle entirely, since the map only ever renders in the browser. Without it, the
// map libraries end up bundled into the deployed Cloudflare Worker for no reason,
// even though this code never runs server-side.

// Served by the maplibreGlWorkerAssets Vite plugin (vite.config.ts), which copies
// maplibre-gl's worker files from node_modules to this fixed path so the bundler's
// dependency optimizer/rollup step doesn't need to statically detect the worker.
const MAPLIBRE_WORKER_URL = '/maplibre-gl-worker.mjs';

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

interface FlightMapProps {
  routesGeoJSON: any;
  airportsGeoJSON: any;
  airportMap: Map<AirportCode, Airport>;
}

export function FlightMap({ routesGeoJSON, airportsGeoJSON, airportMap }: FlightMapProps) {
  const [reactMapGl, setReactMapGl] = useState<any>(null);
  const [popupAirport, setPopupAirport] = useState<Airport | null>(null);
  const [projection, setProjection] = useState<'globe' | 'mercator'>('globe');
  const mapRef = useRef<any>(null);

  useEffect(() => {
    Promise.all([
      import('react-map-gl/maplibre'),
      import('maplibre-gl'),
      import('maplibre-gl/dist/maplibre-gl.css'),
    ]).then(([mod, maplibregl]) => {
      maplibregl.setWorkerUrl(MAPLIBRE_WORKER_URL);
      setReactMapGl(mod);
    });
  }, []);

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

  if (!reactMapGl) {
    return <div className="p-5">Loading map...</div>;
  }

  const { Map: MapGL, Source, Layer, Popup, NavigationControl } = reactMapGl;

  return (
    <>
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
    </>
  );
}
