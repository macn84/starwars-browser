// This file defines the "shape" of all the data we receive from the Star Wars API.
// In TypeScript, an "interface" is like a blueprint — it describes exactly what fields
// a piece of data contains and what type each field is (text, number, list, etc.).
// Having these definitions means TypeScript can warn us if we try to use a field
// that doesn't exist or pass the wrong kind of value somewhere.

// The standard wrapper swapi.dev returns around every list request.
// 'T' is a placeholder for the actual item type (person, planet, film, etc.).
export interface SwapiListResponse<T> {
  count: number;       // Total number of matching records across all pages
  next: string | null; // URL to fetch the next page (null if we're on the last page)
  previous: string | null; // URL to fetch the previous page (null if we're on the first page)
  results: T[];        // The actual items on this page (up to 10 at a time)
}

// A Star Wars character (e.g. Luke Skywalker, Leia Organa).
export interface SwapiPerson {
  name: string;        // Full name
  height: string;      // Height in centimetres (may be "unknown")
  mass: string;        // Weight in kilograms (may be "unknown")
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;  // Year in the Star Wars calendar, e.g. "19BBY"
  gender: string;
  homeworld: string;   // URL pointing to the planet they come from
  films: string[];     // List of URLs for films they appear in
  species: string[];   // List of URLs for their species
  vehicles: string[];  // List of URLs for vehicles they pilot
  starships: string[]; // List of URLs for starships they pilot
  created: string;     // ISO date when this record was added to SWAPI
  edited: string;      // ISO date when this record was last updated
  url: string;         // The canonical URL for this person (contains their ID)
}

// A planet in the Star Wars universe (e.g. Tatooine, Coruscant).
export interface SwapiPlanet {
  name: string;
  rotation_period: string;  // Hours to complete one rotation (day length)
  orbital_period: string;   // Days to complete one orbit around the sun (year length)
  diameter: string;         // Diameter in kilometres
  climate: string;          // e.g. "arid", "temperate", "frozen"
  gravity: string;          // Relative to Earth standard gravity
  terrain: string;          // e.g. "desert", "ocean", "forest"
  surface_water: string;    // Percentage of surface covered by water
  population: string;       // Estimated number of inhabitants
  residents: string[];      // List of URLs for notable residents
  films: string[];          // List of URLs for films where this planet appears
  created: string;
  edited: string;
  url: string;
}

// A Star Wars film (e.g. "A New Hope", "The Empire Strikes Back").
export interface SwapiFilm {
  title: string;
  episode_id: number;      // Episode number (1–6 for the main saga)
  opening_crawl: string;   // The famous scrolling text at the start of each film
  director: string;
  producer: string;
  release_date: string;    // Format: YYYY-MM-DD
  characters: string[];    // List of URLs for characters who appear in the film
  planets: string[];       // List of URLs for planets that appear in the film
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

// A starship (faster-than-light capable spacecraft, e.g. Millennium Falcon, X-wing).
export interface SwapiStarship {
  name: string;
  model: string;                    // Manufacturer's model name
  manufacturer: string;
  cost_in_credits: string;          // Purchase price in Galactic Credits
  length: string;                   // Length in metres
  max_atmosphering_speed: string;   // Top speed within an atmosphere (km/h)
  crew: string;                     // Minimum crew required to operate
  passengers: string;               // Maximum passenger capacity
  cargo_capacity: string;           // Cargo capacity in kilograms
  consumables: string;              // How long it can operate without resupply (e.g. "2 months")
  hyperdrive_rating: string;        // Lower = faster hyperdrive
  MGLT: string;                     // Megalight speed rating
  starship_class: string;           // e.g. "Starfighter", "Freighter", "Star Destroyer"
  pilots: string[];                 // List of URLs for known pilots
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// A ground or air vehicle that cannot travel through hyperspace (e.g. Speeder Bike, AT-AT).
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

// A species (race) in the Star Wars universe (e.g. Human, Wookiee, Droid).
export interface SwapiSpecies {
  name: string;
  classification: string;    // Broad biological group, e.g. "mammal", "reptile", "artificial"
  designation: string;       // "sentient" or "non-sentient"
  average_height: string;    // Average height in centimetres
  skin_colors: string;       // Possible skin colours, comma-separated
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;  // In years (may be "indefinite" for droids)
  homeworld: string | null;  // URL to their home planet (null if unknown)
  language: string;          // Primary language spoken
  people: string[];          // List of URLs for notable members of this species
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// A union type listing all valid category names.
// Using this means TypeScript will complain if we accidentally type "starship" (missing the 's').
export type SwapiResource =
  | 'people'
  | 'planets'
  | 'films'
  | 'starships'
  | 'vehicles'
  | 'species';
