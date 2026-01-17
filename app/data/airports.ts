import type { Airport } from '../types/airport';

export const airports: Airport[] = [
  {
    id: 'DXB',
    city: 'Dubai',
    country: 'AE', // United Arab Emirates
    name: 'Dubai International Airport',
    coords: [25.2532, 55.3657],
  },
  {
    id: 'MED',
    city: 'Medina',
    country: 'SA', // Saudi Arabia
    name: 'Prince Mohammad Bin Abdulaziz Airport',
    coords: [24.5534, 39.7050],
  },
  {
    id: 'BKK',
    city: 'Bangkok',
    country: 'TH', // Thailand
    name: 'Suvarnabhumi Airport',
    coords: [13.6900, 100.7501],
  },
  {
    id: 'DPS',
    city: 'Denpasar',
    country: 'ID', // Indonesia
    name: 'Ngurah Rai International Airport',
    coords: [-8.7467, 115.1667],
  },
  {
    id: 'CCU',
    city: 'Kolkata',
    country: 'IN', // India
    name: 'Netaji Subhas Chandra Bose International Airport',
    coords: [22.6547, 88.4467],
  },
  {
    id: 'LGW',
    city: 'London',
    country: 'GB', // United Kingdom
    name: 'Gatwick Airport',
    coords: [51.1537, -0.1821],
  },
  {
    id: 'KUL',
    city: 'Kuala Lumpur',
    country: 'MY', // Malaysia
    name: 'Kuala Lumpur International Airport',
    coords: [2.7456, 101.7072],
  },
  {
    id: 'VIE',
    city: 'Vienna',
    country: 'AT', // Austria
    name: 'Vienna International Airport',
    coords: [48.1103, 16.5697],
  },
  {
    id: 'SYD',
    city: 'Sydney',
    country: 'AU', // Australia
    name: 'Sydney Kingsford Smith Airport',
    coords: [-33.9461, 151.1772],
  },
  {
    id: 'KHI',
    city: 'Karachi',
    country: 'PK', // Pakistan
    name: 'Jinnah International Airport',
    coords: [24.9065, 67.1608],
  },
  {
    id: 'BRU',
    city: 'Brussels',
    country: 'BE', // Belgium
    name: 'Brussels Airport',
    coords: [50.9014, 4.4844],
  },
  {
    id: 'MNL',
    city: 'Manila',
    country: 'PH', // Philippines
    name: 'Ninoy Aquino International Airport',
    coords: [14.5086, 121.0194],
  },
  {
    id: 'DAC',
    city: 'Dhaka',
    country: 'BD', // Bangladesh
    name: 'Hazrat Shahjalal International Airport',
    coords: [23.8433, 90.3978],
  },
  {
    id: 'DME',
    city: 'Moscow',
    country: 'RU', // Russia
    name: 'Domodedovo International Airport',
    coords: [55.4088, 37.9063],
  },
  {
    id: 'BLR',
    city: 'Bangalore',
    country: 'IN', // India
    name: 'Kempegowda International Airport',
    coords: [13.1979, 77.7063],
  },
  {
    id: 'HKT',
    city: 'Phuket',
    country: 'TH', // Thailand
    name: 'Phuket International Airport',
    coords: [8.1132, 98.3169],
  },
  {
    id: 'GRU',
    city: 'São Paulo',
    country: 'BR', // Brazil
    name: 'São Paulo/Guarulhos International Airport',
    coords: [-23.4356, -46.4731],
  },
  {
    id: 'JED',
    city: 'Jeddah',
    country: 'SA', // Saudi Arabia
    name: 'King Abdulaziz International Airport',
    coords: [21.6796, 39.1565],
  },
  {
    id: 'BOM',
    city: 'Mumbai',
    country: 'IN', // India
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    coords: [19.0896, 72.8656],
  },
  {
    id: 'BHX',
    city: 'Birmingham',
    country: 'GB', // United Kingdom
    name: 'Birmingham Airport',
    coords: [52.4539, -1.7480],
  },
  {
    id: 'LHR',
    city: 'London',
    country: 'GB', // United Kingdom
    name: 'Heathrow Airport',
    coords: [51.4700, -0.4543],
  },
  {
    id: 'SEZ',
    city: 'Seychelles',
    country: 'SC', // Seychelles
    name: 'Seychelles International Airport',
    coords: [-4.6743, 55.5218],
  },
  {
    id: 'HKG',
    city: 'Hong Kong',
    country: 'HK', // Hong Kong
    name: 'Hong Kong International Airport',
    coords: [22.3080, 113.9185],
  },
  {
    id: 'BNE',
    city: 'Brisbane',
    country: 'AU', // Australia
    name: 'Brisbane International Airport',
    coords: [-27.3842, 153.1175],
  },
  {
    id: 'CAI',
    city: 'Cairo',
    country: 'EG', // Egypt
    name: 'Cairo International Airport',
    coords: [30.1219, 31.4056],
  },
  {
    id: 'JNB',
    city: 'Johannesburg',
    country: 'ZA', // South Africa
    name: 'OR Tambo International Airport',
    coords: [-26.1367, 28.2411],
  },
  {
    id: 'ZRH',
    city: 'Zurich',
    country: 'CH', // Switzerland
    name: 'Zurich Airport',
    coords: [47.4647, 8.5492],
  },
  {
    id: 'GVA',
    city: 'Geneva',
    country: 'CH', // Switzerland
    name: 'Geneva Airport',
    coords: [46.2381, 6.1090],
  },
  {
    id: 'BCN',
    city: 'Barcelona',
    country: 'ES', // Spain
    name: 'Barcelona-El Prat Airport',
    coords: [41.2974, 2.0833],
  },
  {
    id: 'MEX',
    city: 'Mexico City',
    country: 'MX', // Mexico
    name: 'Mexico City International Airport',
    coords: [19.4363, -99.0721],
  },
  {
    id: 'JFK',
    city: 'New York',
    country: 'US', // United States
    name: 'John F. Kennedy International Airport',
    coords: [40.6413, -73.7781],
  },
];

// Helper function to get airport by ID
export const getAirportById = (id: string): Airport | undefined => {
  return airports.find(airport => airport.id === id);
};
