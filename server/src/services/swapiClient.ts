// This file is the "middleman" between our server and the real Star Wars API (swapi.dev).
// Instead of calling swapi.dev directly from the browser (which can be slow or blocked),
// the browser calls OUR server, and our server calls swapi.dev here.
// This pattern is called a "proxy" — we sit in the middle and pass data along.

import axios, { AxiosError } from 'axios';
import { config } from '../config';
import type { SwapiListResponse, SwapiResource } from '../types/swapi';

// Create a reusable HTTP client (Axios) pre-configured to talk to swapi.dev.
// - baseURL: every request will start with https://swapi.dev/api
// - timeout: if swapi.dev doesn't respond within 10 seconds, we give up
// - Accept header: we tell swapi.dev we want JSON (not HTML)
const swapiAxios = axios.create({
  baseURL: config.SWAPI_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

// A custom error class for problems that come from swapi.dev.
// By giving it a name and a status code, our error handler can
// send the right HTTP status back to the browser instead of always
// returning a generic "500 Server Error".
export class SwapiError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500, // HTTP status code, e.g. 404 = Not Found
  ) {
    super(message);
    this.name = 'SwapiError';
  }
}

// A private helper that converts low-level Axios errors into our SwapiError format.
// We mark it `never` because this function always throws — it never returns normally.
function handleAxiosError(err: unknown): never {
  if (err instanceof AxiosError) {
    // Pull out the HTTP status code (e.g. 404) and the message from swapi.dev's response.
    const status = err.response?.status ?? 500;
    const message =
      err.response?.data?.detail ?? err.message ?? 'SWAPI request failed';
    throw new SwapiError(String(message), status);
  }
  // If the error wasn't an Axios error at all (very unusual), give a generic message.
  throw new SwapiError('Unexpected error contacting SWAPI');
}

// Fetch a page of results from swapi.dev for a given category.
// - resource: which category to fetch (e.g. 'people', 'planets')
// - search:   optional text to filter results (e.g. 'Luke')
// - page:     which page of results to fetch (swapi.dev returns 10 per page)
// Returns a list response containing the results array plus pagination info.
export async function fetchList<T>(
  resource: SwapiResource,
  search?: string,
  page?: string,
): Promise<SwapiListResponse<T>> {
  try {
    // Build the query parameters we'll send to swapi.dev.
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

// Fetch a single item from swapi.dev by its numeric ID.
// - resource: which category (e.g. 'people')
// - id:       the item's ID number as a string (e.g. '1' for Luke Skywalker)
// Returns the full data object for that item.
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
