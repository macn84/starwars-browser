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

export type SwapiRecord =
  | SwapiPerson
  | SwapiPlanet
  | SwapiFilm
  | SwapiStarship
  | SwapiVehicle
  | SwapiSpecies;

export async function getList<T = SwapiRecord>(
  category: Category,
  search = '',
  page = 1,
): Promise<SwapiListResponse<T>> {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;

  const response = await apiClient.get<SwapiListResponse<T>>(`/${category}`, {
    params,
  });
  return response.data;
}

export async function getById<T = SwapiRecord>(
  category: Category,
  id: string | number,
): Promise<T> {
  const response = await apiClient.get<T>(`/${category}/${id}`);
  return response.data;
}
