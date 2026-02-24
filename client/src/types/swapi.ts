// This file defines the data types used throughout the front-end.
// It mirrors the types in server/src/types/swapi.ts but also adds a few
// front-end-specific constants (category lists and display labels).
//
// TypeScript uses these definitions to catch mistakes at compile time —
// for example, if you mistype a field name or pass the wrong kind of data.

// The six categories of Star Wars data we can browse.
// Using a union type means TypeScript will give an error if you ever
// accidentally type 'starship' (missing the 's') instead of 'starships'.
export type Category =
  | 'people'
  | 'planets'
  | 'films'
  | 'starships'
  | 'vehicles'
  | 'species';

// An ordered array of all categories — used to render the navigation tabs
// in the same order every time without having to remember the order manually.
export const CATEGORIES: Category[] = [
  'people',
  'planets',
  'films',
  'starships',
  'vehicles',
  'species',
];

// Maps each category key to its human-readable display label.
// e.g. CATEGORY_LABELS['people'] === 'People'
// Used for tab button text, search bar placeholder, empty state messages, etc.
export const CATEGORY_LABELS: Record<Category, string> = {
  people: 'People',
  planets: 'Planets',
  films: 'Films',
  starships: 'Starships',
  vehicles: 'Vehicles',
  species: 'Species',
};

// The standard wrapper swapi.dev returns for every list request.
// 'T' is a placeholder for the actual item type (SwapiPerson, SwapiPlanet, etc.)
export interface SwapiListResponse<T> {
  count: number;           // Total number of records matching the query (all pages combined)
  next: string | null;     // URL for the next page (null if this is the last page)
  previous: string | null; // URL for the previous page (null if this is the first page)
  results: T[];            // The items on the current page (up to 10 at a time)
}

// A Star Wars character (e.g. Luke Skywalker)
export interface SwapiPerson {
  name: string;
  height: string;      // In centimetres; may be "unknown"
  mass: string;        // In kilograms; may be "unknown"
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;  // e.g. "19BBY" (BBY = Before the Battle of Yavin)
  gender: string;
  homeworld: string;   // URL pointing to their planet of origin
  films: string[];     // List of film URLs they appear in
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;     // ISO date this record was added to SWAPI
  edited: string;      // ISO date this record was last changed
  url: string;         // The canonical URL for this record (contains the numeric ID)
}

// A planet in the Star Wars universe (e.g. Tatooine)
export interface SwapiPlanet {
  name: string;
  rotation_period: string;  // Hours per day
  orbital_period: string;   // Days per year
  diameter: string;         // In kilometres
  climate: string;          // e.g. "arid", "temperate"
  gravity: string;          // Relative to Earth standard
  terrain: string;          // e.g. "desert", "forest", "ocean"
  surface_water: string;    // Percentage of surface covered by water
  population: string;       // Number of inhabitants (may be "unknown")
  residents: string[];      // URLs of notable residents
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// A Star Wars film (e.g. "A New Hope")
export interface SwapiFilm {
  title: string;
  episode_id: number;       // 1–6 for the original and prequel trilogies
  opening_crawl: string;    // The scrolling text at the start of the film
  director: string;
  producer: string;
  release_date: string;     // Format: YYYY-MM-DD
  characters: string[];     // URLs of characters who appear in the film
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

// A starship (hyperspace-capable spacecraft, e.g. Millennium Falcon, X-wing)
export interface SwapiStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;                   // In metres
  max_atmosphering_speed: string;   // Top speed within an atmosphere (km/h)
  crew: string;                     // Minimum crew required to operate
  passengers: string;               // Maximum passenger capacity
  cargo_capacity: string;           // In kilograms
  consumables: string;              // How long it can operate without resupply
  hyperdrive_rating: string;        // Lower = faster hyperspace travel
  MGLT: string;                     // Sublight speed in Megalights per hour
  starship_class: string;           // e.g. "Starfighter", "Freighter"
  pilots: string[];                 // URLs of known pilots
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// A ground or air vehicle that cannot travel through hyperspace (e.g. AT-AT, Speeder Bike)
export interface SwapiVehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;  // e.g. "wheeled", "walker", "airspeeder"
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// A species (race) in the Star Wars universe (e.g. Human, Wookiee, Droid)
export interface SwapiSpecies {
  name: string;
  classification: string;    // e.g. "mammal", "reptile", "artificial"
  designation: string;       // "sentient" or "non-sentient"
  average_height: string;    // In centimetres
  skin_colors: string;       // Possible colours, comma-separated
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;  // In years (may be "indefinite" for droids)
  homeworld: string | null;  // URL to their home planet; null if unknown
  language: string;
  people: string[];           // URLs of notable members
  films: string[];
  created: string;
  edited: string;
  url: string;
}
