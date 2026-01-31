export interface Airport {
  id: string; // IATA code (e.g., "DXB")
  city: string;
  country: string; // ISO 3166-1 alpha-2 code (e.g., "AE", "GB", "US")
  name: string;
  coords: readonly [number, number]; // [latitude, longitude]
}
