import type { AirportCode } from '../data/airports';

export const AIRCRAFT_TYPES = ['A380', 'B777'] as const;
export type AircraftType = typeof AIRCRAFT_TYPES[number];

export interface Flight {
  departureDateTime: Date;
  arrivalDateTime: Date;
  flightNumber: string;
  originAirport: AirportCode;
  destinationAirport: AirportCode;
  planeType: AircraftType;
  duration: string; // e.g., "7h 30m"
  registration: string; // Plane registration (e.g., "A6-EUA")
}
