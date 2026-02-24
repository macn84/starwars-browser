// This file contains the two functions that the rest of the front-end uses
// to fetch data from our Express server (which in turn fetches it from swapi.dev).
//
// The front-end never talks to swapi.dev directly — it always goes through our server.
// That keeps authentication, error handling, and rate-limiting in one place.

import { apiClient } from './axiosInstance';
import type {
  Category,
  SwapiListResponse,
  SwapiPerson,
  SwapiPlanet,
  SwapiFilm,
  SwapiStarship,
  SwapiVehicle,
  SwapiSpecies,
} from '../types/swapi';

// A convenience type that represents "any one of the six Star Wars data types".
// Useful when you don't know or care which specific type you're working with.
export type SwapiRecord =
  | SwapiPerson
  | SwapiPlanet
  | SwapiFilm
  | SwapiStarship
  | SwapiVehicle
  | SwapiSpecies;

// Fetch a page of items for the given category.
// - category: which type of data to fetch (e.g. 'people', 'planets')
// - search:   optional search text to filter results (empty string = no filter)
// - page:     which page to fetch; swapi.dev returns 10 items per page
//
// Returns a response object containing the items array plus pagination info
// (total count, whether there's a next/previous page).
export async function getList<T = SwapiRecord>(
  category: Category,
  search = '',
  page = 1,
): Promise<SwapiListResponse<T>> {
  // Always include the page number. Only include search if the user typed something.
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;

  const response = await apiClient.get<SwapiListResponse<T>>(`/${category}`, {
    params,
  });
  return response.data;
}

// Fetch the full details for a single item by its numeric ID.
// - category: which type of data (e.g. 'starships')
// - id:       the item's ID number (e.g. 9 for the Millennium Falcon)
//
// Returns the complete data object for that item.
export async function getById<T = SwapiRecord>(
  category: Category,
  id: string | number,
): Promise<T> {
  const response = await apiClient.get<T>(`/${category}/${id}`);
  return response.data;
}
