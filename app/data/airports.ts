import type { Airport } from '../types/airport';

export const airports = [
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
  {
    id: 'MAN',
    city: 'Manchester',
    country: 'GB', // United Kingdom
    name: 'Manchester Airport',
    coords: [53.3537, -2.2750],
  },
  {
    id: 'MXP',
    city: 'Milan',
    country: 'IT', // Italy
    name: 'Milan Malpensa Airport',
    coords: [45.6306, 8.7281],
  },
  {
    id: 'PEW',
    city: 'Peshawar',
    country: 'PK', // Pakistan
    name: 'Bacha Khan International Airport',
    coords: [33.9939, 71.5146],
  },
  {
    id: 'CPH',
    city: 'Copenhagen',
    country: 'DK', // Denmark
    name: 'Copenhagen Airport',
    coords: [55.6180, 12.6508],
  },
  {
    id: 'PRG',
    city: 'Prague',
    country: 'CZ', // Czech Republic
    name: 'Václav Havel Airport Prague',
    coords: [50.1008, 14.2600],
  },
  {
    id: 'KWI',
    city: 'Kuwait City',
    country: 'KW', // Kuwait
    name: 'Kuwait International Airport',
    coords: [29.2267, 47.9689],
  },
  {
    id: 'AMS',
    city: 'Amsterdam',
    country: 'NL', // Netherlands
    name: 'Amsterdam Airport Schiphol',
    coords: [52.3105, 4.7683],
  },
  {
    id: 'HAM',
    city: 'Hamburg',
    country: 'DE', // Germany
    name: 'Hamburg Airport',
    coords: [53.6304, 9.9882],
  },
  {
    id: 'SEA',
    city: 'Seattle',
    country: 'US', // United States
    name: 'Seattle-Tacoma International Airport',
    coords: [47.4502, -122.3088],
  },
  {
    id: 'CAN',
    city: 'Guangzhou',
    country: 'CN', // China
    name: 'Guangzhou Baiyun International Airport',
    coords: [23.3924, 113.2988],
  },
  {
    id: 'LAX',
    city: 'Los Angeles',
    country: 'US', // United States
    name: 'Los Angeles International Airport',
    coords: [33.9416, -118.4085],
  },
  {
    id: 'SIN',
    city: 'Singapore',
    country: 'SG', // Singapore
    name: 'Singapore Changi Airport',
    coords: [1.3644, 103.9915],
  },
  {
    id: 'SFO',
    city: 'San Francisco',
    country: 'US', // United States
    name: 'San Francisco International Airport',
    coords: [37.6213, -122.3790],
  },
  {
    id: 'ATH',
    city: 'Athens',
    country: 'GR', // Greece
    name: 'Athens International Airport',
    coords: [37.9364, 23.9445],
  },
  {
    id: 'EWR',
    city: 'Newark',
    country: 'US', // United States
    name: 'Newark Liberty International Airport',
    coords: [40.6895, -74.1745],
  },
  {
    id: 'MIA',
    city: 'Miami',
    country: 'US', // United States
    name: 'Miami International Airport',
    coords: [25.7959, -80.2870],
  },
  {
    id: 'BOG',
    city: 'Bogotá',
    country: 'CO', // Colombia
    name: 'Aeropuerto Internacional El Dorado',
    coords: [4.7016, -74.1469],
  },
  {
    id: 'BOS',
    city: 'Boston',
    country: 'US', // United States
    name: 'Boston Logan International Airport',
    coords: [42.3656, -71.0096],
  },
  {
    id: 'MUC',
    city: 'Munich',
    country: 'DE', // Germany
    name: 'Munich Airport',
    coords: [48.3538, 11.7861],
  },
  {
    id: 'LCA',
    city: 'Larnaca',
    country: 'CY', // Cyprus
    name: 'Larnaca International Airport',
    coords: [34.8751, 33.6249],
  },
  {
    id: 'MLA',
    city: 'Luqa',
    country: 'MT', // Malta
    name: 'Malta International Airport',
    coords: [35.8575, 14.4775],
  },
  {
    id: 'MRU',
    city: 'Mauritius',
    country: 'MU', // Mauritius
    name: 'Sir Seewoosagur Ramgoolam International Airport',
    coords: [-20.4302, 57.6836],
  },
  {
    id: 'KTI',
    city: 'Phnom Penh',
    country: 'KH', // Cambodia
    name: 'Techo International Airport',
    coords: [11.3629, 104.9166],
  },
  {
    id: 'ICN',
    city: 'Seoul',
    country: 'KR', // South Korea
    name: 'Incheon International Airport',
    coords: [37.4602, 126.4407],
  },
  {
    id: 'TPE',
    city: 'Taipei',
    country: 'TW', // Taiwan
    name: 'Taiwan Taoyuan International Airport',
    coords: [25.0797, 121.2342],
  },
  {
    id: 'ARN',
    city: 'Stockholm',
    country: 'SE', // Sweden
    name: 'Stockholm Arlanda Airport',
    coords: [59.6519, 17.9186],
  },
  {
    id: 'IST',
    city: 'Istanbul',
    country: 'TR', // Turkey
    name: 'Istanbul Airport',
    coords: [41.2753, 28.7519],
  },
  {
    id: 'EZE',
    city: 'Buenos Aires',
    country: 'AR', // Argentina
    name: 'Ministro Pistarini International Airport',
    coords: [-34.8222, -58.5358],
  },
  {
    id: 'BAH',
    city: 'Manama',
    country: 'BH', // Bahrain
    name: 'Bahrain International Airport',
    coords: [26.2708, 50.6336],
  },
  {
    id: 'ALG',
    city: 'Algiers',
    country: 'DZ', // Algeria
    name: 'Houari Boumediene Airport',
    coords: [36.6910, 3.2154],
  },
  {
    id: 'NBJ',
    city: 'Luanda',
    country: 'AO', // Angola
    name: 'Dr. António Agostinho Neto International Airport',
    coords: [-9.0468, 13.5072],
  },
  {
    id: 'ABJ',
    city: 'Abidjan',
    country: 'CI', // Ivory Coast
    name: 'Félix-Houphouët-Boigny International Airport',
    coords: [5.2614, -3.9263],
  },
  {
    id: 'ADD',
    city: 'Addis Ababa',
    country: 'ET', // Ethiopia
    name: 'Addis Ababa Bole International Airport',
    coords: [8.9779, 38.7993],
  },
  {
    id: 'ACC',
    city: 'Accra',
    country: 'GH', // Ghana
    name: 'Kotoka International Airport',
    coords: [5.6052, -0.1668],
  },
  {
    id: 'CKY',
    city: 'Conakry',
    country: 'GN', // Guinea
    name: 'Ahmed Sékou Touré International Airport',
    coords: [9.5769, -13.6120],
  },
  {
    id: 'NBO',
    city: 'Nairobi',
    country: 'KE', // Kenya
    name: 'Jomo Kenyatta International Airport',
    coords: [-1.3192, 36.9278],
  },
  {
    id: 'TNR',
    city: 'Antananarivo',
    country: 'MG', // Madagascar
    name: 'Ivato International Airport',
    coords: [-18.7969, 47.4788],
  },
  {
    id: 'CMN',
    city: 'Casablanca',
    country: 'MA', // Morocco
    name: 'Mohammed V International Airport',
    coords: [33.3675, -7.5900],
  },
  {
    id: 'LOS',
    city: 'Lagos',
    country: 'NG', // Nigeria
    name: 'Murtala Muhammed International Airport',
    coords: [6.5774, 3.3212],
  },
  {
    id: 'DSS',
    city: 'Dakar',
    country: 'SN', // Senegal
    name: 'Blaise Diagne International Airport',
    coords: [14.6700, -17.0733],
  },
  {
    id: 'DUR',
    city: 'Durban',
    country: 'ZA', // South Africa
    name: 'King Shaka International Airport',
    coords: [-29.6144, 31.1197],
  },
  {
    id: 'CPT',
    city: 'Cape Town',
    country: 'ZA', // South Africa
    name: 'Cape Town International Airport',
    coords: [-33.9715, 18.6021],
  },
  {
    id: 'DAR',
    city: 'Dar es Salaam',
    country: 'TZ', // Tanzania
    name: 'Julius Nyerere International Airport',
    coords: [-6.8781, 39.2026],
  },
  {
    id: 'TUN',
    city: 'Tunis',
    country: 'TN', // Tunisia
    name: 'Tunis–Carthage International Airport',
    coords: [36.8510, 10.2272],
  },
  {
    id: 'EBB',
    city: 'Entebbe',
    country: 'UG', // Uganda
    name: 'Entebbe International Airport',
    coords: [0.0424, 32.4435],
  },
  {
    id: 'LUN',
    city: 'Lusaka',
    country: 'ZM', // Zambia
    name: 'Kenneth Kaunda International Airport',
    coords: [-15.3308, 28.4526],
  },
  {
    id: 'HRE',
    city: 'Harare',
    country: 'ZW', // Zimbabwe
    name: 'Robert Gabriel Mugabe International Airport',
    coords: [-17.9318, 31.0928],
  },
  {
    id: 'ADL',
    city: 'Adelaide',
    country: 'AU', // Australia
    name: 'Adelaide Airport',
    coords: [-34.9461, 138.5306],
  },
  {
    id: 'MEL',
    city: 'Melbourne',
    country: 'AU', // Australia
    name: 'Melbourne Airport',
    coords: [-37.6690, 144.8410],
  },
  {
    id: 'PER',
    city: 'Perth',
    country: 'AU', // Australia
    name: 'Perth Airport',
    coords: [-31.9385, 115.9672],
  },
  {
    id: 'SAI',
    city: 'Siem Reap',
    country: 'KH', // Cambodia
    name: 'Siem Reap–Angkor International Airport',
    coords: [13.3753, 104.2208],
  },
  {
    id: 'PEK',
    city: 'Beijing',
    country: 'CN', // China
    name: 'Beijing Capital International Airport',
    coords: [40.0799, 116.6031],
  },
  {
    id: 'SZX',
    city: 'Shenzhen',
    country: 'CN', // China
    name: 'Shenzhen Bao\'an International Airport',
    coords: [22.6393, 113.8107],
  },
  {
    id: 'PVG',
    city: 'Shanghai',
    country: 'CN', // China
    name: 'Shanghai Pudong International Airport',
    coords: [31.1443, 121.8083],
  },
  {
    id: 'HGH',
    city: 'Hangzhou',
    country: 'CN', // China
    name: 'Hangzhou Xiaoshan International Airport',
    coords: [30.2295, 120.4344],
  },
  {
    id: 'HYD',
    city: 'Hyderabad',
    country: 'IN', // India
    name: 'Rajiv Gandhi International Airport',
    coords: [17.2403, 78.4294],
  },
  {
    id: 'DEL',
    city: 'Delhi',
    country: 'IN', // India
    name: 'Indira Gandhi International Airport',
    coords: [28.5562, 77.1000],
  },
  {
    id: 'AMD',
    city: 'Ahmedabad',
    country: 'IN', // India
    name: 'Sardar Vallabhbhai Patel International Airport',
    coords: [23.0772, 72.6347],
  },
  {
    id: 'COK',
    city: 'Kochi',
    country: 'IN', // India
    name: 'Cochin International Airport',
    coords: [10.1520, 76.4019],
  },
  {
    id: 'TRV',
    city: 'Thiruvananthapuram',
    country: 'IN', // India
    name: 'Trivandrum International Airport',
    coords: [8.4821, 76.9200],
  },
  {
    id: 'MAA',
    city: 'Chennai',
    country: 'IN', // India
    name: 'Chennai International Airport',
    coords: [12.9941, 80.1709],
  },
  {
    id: 'CGK',
    city: 'Jakarta',
    country: 'ID', // Indonesia
    name: 'Soekarno–Hatta International Airport',
    coords: [-6.1256, 106.6559],
  },
  {
    id: 'NGY',
    city: 'Nagoya',
    country: 'JP', // Japan
    name: 'Nagoya Bus Terminal (Chubu Centrair Airport coach link)',
    coords: [35.1709, 136.8815],
  },
  {
    id: 'KIX',
    city: 'Osaka',
    country: 'JP', // Japan
    name: 'Kansai International Airport',
    coords: [34.4320, 135.2304],
  },
  {
    id: 'HND',
    city: 'Tokyo',
    country: 'JP', // Japan
    name: 'Haneda Airport',
    coords: [35.5494, 139.7798],
  },
  {
    id: 'NRT',
    city: 'Tokyo',
    country: 'JP', // Japan
    name: 'Narita International Airport',
    coords: [35.7647, 140.3864],
  },
  {
    id: 'PEN',
    city: 'Penang',
    country: 'MY', // Malaysia
    name: 'Penang International Airport',
    coords: [5.2971, 100.2769],
  },
  {
    id: 'MLE',
    city: 'Malé',
    country: 'MV', // Maldives
    name: 'Velana International Airport',
    coords: [4.1918, 73.5292],
  },
  {
    id: 'RGN',
    city: 'Yangon',
    country: 'MM', // Myanmar
    name: 'Yangon International Airport',
    coords: [16.9073, 96.1332],
  },
  {
    id: 'AKL',
    city: 'Auckland',
    country: 'NZ', // New Zealand
    name: 'Auckland Airport',
    coords: [-37.0082, 174.7850],
  },
  {
    id: 'CHC',
    city: 'Christchurch',
    country: 'NZ', // New Zealand
    name: 'Christchurch International Airport',
    coords: [-43.4894, 172.5320],
  },
  {
    id: 'ISB',
    city: 'Islamabad',
    country: 'PK', // Pakistan
    name: 'Islamabad International Airport',
    coords: [33.5606, 72.8354],
  },
  {
    id: 'LHE',
    city: 'Lahore',
    country: 'PK', // Pakistan
    name: 'Allama Iqbal International Airport',
    coords: [31.5216, 74.4036],
  },
  {
    id: 'SKT',
    city: 'Sialkot',
    country: 'PK', // Pakistan
    name: 'Sialkot International Airport',
    coords: [32.5356, 74.3639],
  },
  {
    id: 'CRK',
    city: 'Clark',
    country: 'PH', // Philippines
    name: 'Clark International Airport',
    coords: [15.1858, 120.5601],
  },
  {
    id: 'CEB',
    city: 'Cebu',
    country: 'PH', // Philippines
    name: 'Mactan–Cebu International Airport',
    coords: [10.3075, 123.9791],
  },
  {
    id: 'CMB',
    city: 'Colombo',
    country: 'LK', // Sri Lanka
    name: 'Bandaranaike International Airport',
    coords: [7.1808, 79.8841],
  },
  {
    id: 'DAD',
    city: 'Da Nang',
    country: 'VN', // Vietnam
    name: 'Da Nang International Airport',
    coords: [16.0439, 108.1994],
  },
  {
    id: 'HAN',
    city: 'Hanoi',
    country: 'VN', // Vietnam
    name: 'Noi Bai International Airport',
    coords: [21.2212, 105.8072],
  },
  {
    id: 'SGN',
    city: 'Ho Chi Minh City',
    country: 'VN', // Vietnam
    name: 'Tan Son Nhat International Airport',
    coords: [10.8188, 106.6520],
  },
  {
    id: 'HEL',
    city: 'Helsinki',
    country: 'FI', // Finland
    name: 'Helsinki-Vantaa Airport',
    coords: [60.3172, 24.9633],
  },
  {
    id: 'NCE',
    city: 'Nice',
    country: 'FR', // France
    name: 'Nice Côte d\'Azur Airport',
    coords: [43.6584, 7.2159],
  },
  {
    id: 'LYS',
    city: 'Lyon',
    country: 'FR', // France
    name: 'Lyon–Saint-Exupéry Airport',
    coords: [45.7256, 5.0811],
  },
  {
    id: 'CDG',
    city: 'Paris',
    country: 'FR', // France
    name: 'Charles de Gaulle Airport',
    coords: [49.0097, 2.5479],
  },
  {
    id: 'FRA',
    city: 'Frankfurt',
    country: 'DE', // Germany
    name: 'Frankfurt Airport',
    coords: [50.0379, 8.5622],
  },
  {
    id: 'DUS',
    city: 'Düsseldorf',
    country: 'DE', // Germany
    name: 'Düsseldorf Airport',
    coords: [51.2895, 6.7668],
  },
  {
    id: 'BUD',
    city: 'Budapest',
    country: 'HU', // Hungary
    name: 'Budapest Ferenc Liszt International Airport',
    coords: [47.4298, 19.2611],
  },
  {
    id: 'DUB',
    city: 'Dublin',
    country: 'IE', // Ireland
    name: 'Dublin Airport',
    coords: [53.4213, -6.2701],
  },
  {
    id: 'BLQ',
    city: 'Bologna',
    country: 'IT', // Italy
    name: 'Bologna Guglielmo Marconi Airport',
    coords: [44.5354, 11.2887],
  },
  {
    id: 'FCO',
    city: 'Rome',
    country: 'IT', // Italy
    name: 'Leonardo da Vinci–Fiumicino Airport',
    coords: [41.8003, 12.2389],
  },
  {
    id: 'VCE',
    city: 'Venice',
    country: 'IT', // Italy
    name: 'Venice Marco Polo Airport',
    coords: [45.5053, 12.3519],
  },
  {
    id: 'OSL',
    city: 'Oslo',
    country: 'NO', // Norway
    name: 'Oslo Airport, Gardermoen',
    coords: [60.1939, 11.1004],
  },
  {
    id: 'WAW',
    city: 'Warsaw',
    country: 'PL', // Poland
    name: 'Warsaw Chopin Airport',
    coords: [52.1657, 20.9671],
  },
  {
    id: 'LIS',
    city: 'Lisbon',
    country: 'PT', // Portugal
    name: 'Humberto Delgado Airport',
    coords: [38.7813, -9.1359],
  },
  {
    id: 'LED',
    city: 'St. Petersburg',
    country: 'RU', // Russia
    name: 'Pulkovo Airport',
    coords: [59.8003, 30.2625],
  },
  {
    id: 'MAD',
    city: 'Madrid',
    country: 'ES', // Spain
    name: 'Adolfo Suárez Madrid–Barajas Airport',
    coords: [40.4983, -3.5676],
  },
  {
    id: 'STN',
    city: 'London',
    country: 'GB', // United Kingdom
    name: 'Stansted Airport',
    coords: [51.8860, 0.2389],
  },
  {
    id: 'NCL',
    city: 'Newcastle',
    country: 'GB', // United Kingdom
    name: 'Newcastle International Airport',
    coords: [55.0375, -1.6917],
  },
  {
    id: 'EDI',
    city: 'Edinburgh',
    country: 'GB', // United Kingdom
    name: 'Edinburgh Airport',
    coords: [55.9500, -3.3725],
  },
  {
    id: 'GLA',
    city: 'Glasgow',
    country: 'GB', // United Kingdom
    name: 'Glasgow Airport',
    coords: [55.8642, -4.4331],
  },
  {
    id: 'GIG',
    city: 'Rio de Janeiro',
    country: 'BR', // Brazil
    name: 'Rio de Janeiro–Galeão International Airport',
    coords: [-22.8090, -43.2436],
  },
  {
    id: 'YYZ',
    city: 'Toronto',
    country: 'CA', // Canada
    name: 'Toronto Pearson International Airport',
    coords: [43.6777, -79.6248],
  },
  {
    id: 'YUL',
    city: 'Montréal',
    country: 'CA', // Canada
    name: 'Montréal–Trudeau International Airport',
    coords: [45.4706, -73.7408],
  },
  {
    id: 'SCL',
    city: 'Santiago',
    country: 'CL', // Chile
    name: 'Arturo Merino Benítez International Airport',
    coords: [-33.3930, -70.7858],
  },
  {
    id: 'IAD',
    city: 'Washington, D.C.',
    country: 'US', // United States
    name: 'Washington Dulles International Airport',
    coords: [38.9531, -77.4565],
  },
  {
    id: 'MCO',
    city: 'Orlando',
    country: 'US', // United States
    name: 'Orlando International Airport',
    coords: [28.4312, -81.3081],
  },
  {
    id: 'ORD',
    city: 'Chicago',
    country: 'US', // United States
    name: 'O\'Hare International Airport',
    coords: [41.9742, -87.9073],
  },
  {
    id: 'DFW',
    city: 'Dallas',
    country: 'US', // United States
    name: 'Dallas/Fort Worth International Airport',
    coords: [32.8998, -97.0403],
  },
  {
    id: 'IAH',
    city: 'Houston',
    country: 'US', // United States
    name: 'George Bush Intercontinental Airport',
    coords: [29.9902, -95.3368],
  },
  {
    id: 'IKA',
    city: 'Tehran',
    country: 'IR', // Iran
    name: 'Imam Khomeini International Airport',
    coords: [35.4161, 51.1522],
  },
  {
    id: 'BGW',
    city: 'Baghdad',
    country: 'IQ', // Iraq
    name: 'Baghdad International Airport',
    coords: [33.2625, 44.2346],
  },
  {
    id: 'BSR',
    city: 'Basra',
    country: 'IQ', // Iraq
    name: 'Basra International Airport',
    coords: [30.5491, 47.6622],
  },
  {
    id: 'AMM',
    city: 'Amman',
    country: 'JO', // Jordan
    name: 'Queen Alia International Airport',
    coords: [31.7226, 35.9932],
  },
  {
    id: 'BEY',
    city: 'Beirut',
    country: 'LB', // Lebanon
    name: 'Beirut–Rafic Hariri International Airport',
    coords: [33.8209, 35.4884],
  },
  {
    id: 'MCT',
    city: 'Muscat',
    country: 'OM', // Oman
    name: 'Muscat International Airport',
    coords: [23.5933, 58.2844],
  },
  {
    id: 'DMS',
    city: 'Al Khobar',
    country: 'SA', // Saudi Arabia
    name: 'Khobar SAPTCO Bus Station (coach link)',
    coords: [26.2794, 50.2083],
  },
  {
    id: 'DMM',
    city: 'Dammam',
    country: 'SA', // Saudi Arabia
    name: 'King Fahd International Airport',
    coords: [26.4712, 49.7979],
  },
  {
    id: 'RUH',
    city: 'Riyadh',
    country: 'SA', // Saudi Arabia
    name: 'King Khalid International Airport',
    coords: [24.9576, 46.6988],
  },
  {
    id: 'ZVJ',
    city: 'Abu Dhabi',
    country: 'AE', // United Arab Emirates
    name: 'Abu Dhabi Bus Terminal (Emirates coach link)',
    coords: [24.4764, 54.3705],
  },
  {
    id: 'ZVH',
    city: 'Al Ain',
    country: 'AE', // United Arab Emirates
    name: 'Al Ain Bus Terminal (Emirates coach link)',
    coords: [24.2075, 55.7447],
  },
] as const;

export type AirportCode = (typeof airports)[number]['id'];

// Helper function to get airport by ID
export const getAirportById = (id: AirportCode): Airport | undefined => {
  return airports.find(airport => airport.id === id);
};
