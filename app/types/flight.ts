export const AIRCRAFT_TYPES = ['A380', '777'] as const;
export type AircraftType = typeof AIRCRAFT_TYPES[number];

export interface Flight {
  departureDateTime: Date;
  arrivalDateTime: Date;
  flightNumber: string;
  originAirport: string; // IATA code reference (e.g., "DXB")
  destinationAirport: string; // IATA code reference (e.g., "LHR")
  planeType: AircraftType;
  duration: string; // e.g., "7h 30m"
  registration: string; // Plane registration (e.g., "A6-EUA")
}
