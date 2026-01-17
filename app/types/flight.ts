export interface Flight {
  date: string; // ISO date format
  departureTime: string; // HH:mm format
  arrivalDate: string; // ISO date format
  arrivalTime: string; // HH:mm format
  flightNumber: string;
  originAirport: string; // IATA code reference (e.g., "DXB")
  destinationAirport: string; // IATA code reference (e.g., "LHR")
  planeType: 'A380' | '777';
  duration: string; // e.g., "7h 30m"
  registration: string; // Plane registration (e.g., "A6-EUA")
}
