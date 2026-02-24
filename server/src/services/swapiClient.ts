import axios, { AxiosError } from 'axios';
import { config } from '../config';
import type { SwapiListResponse, SwapiResource } from '../types/swapi';

const swapiAxios = axios.create({
  baseURL: config.SWAPI_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export class SwapiError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500,
  ) {
    super(message);
    this.name = 'SwapiError';
  }
}

function handleAxiosError(err: unknown): never {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 500;
    const message =
      err.response?.data?.detail ?? err.message ?? 'SWAPI request failed';
    throw new SwapiError(String(message), status);
  }
  throw new SwapiError('Unexpected error contacting SWAPI');
}

export async function fetchList<T>(
  resource: SwapiResource,
  search?: string,
  page?: string,
): Promise<SwapiListResponse<T>> {
  try {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (page) params.page = page;

    const response = await swapiAxios.get<SwapiListResponse<T>>(
      `/${resource}/`,
      { params },
    );
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function fetchById<T>(
  resource: SwapiResource,
  id: string,
): Promise<T> {
  try {
    const response = await swapiAxios.get<T>(`/${resource}/${id}/`);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
}
