// This hook manages everything needed to display a paginated, searchable list
// of Star Wars items for a given category (people, planets, films, etc.).
//
// It handles:
//   - Fetching data from the server when the page loads or the user changes tabs
//   - Re-fetching when the user types in the search box (with debounce to avoid
//     sending a request on every keystroke)
//   - Re-fetching when the user clicks Next/Previous page
//   - Resetting the search and page number when the user switches to a new tab
//   - Exposing loading and error states so the UI can show a spinner or error message

import { useState, useEffect, useCallback } from 'react';
import { getList } from '../api/swapiApi';
import { useDebounce } from './useDebounce';
import type { Category, SwapiListResponse } from '../types/swapi';
import type { SwapiRecord } from '../api/swapiApi';

// The shape of the object this hook returns to whichever component uses it.
interface UseSwapiListState<T> {
  data: SwapiListResponse<T> | null; // The fetched data, or null if not yet loaded
  loading: boolean;                  // True while a network request is in flight
  error: string | null;              // Error message, or null if there's no error
  page: number;                      // Current page number (starts at 1)
  search: string;                    // Current search text the user has typed
  setPage: (page: number) => void;   // Call this to jump to a different page
  setSearch: (search: string) => void; // Call this when the search input changes
  refetch: () => void;               // Call this to manually retry after an error
}

// The hook takes a `category` (e.g. 'people') and returns everything needed
// to render a search bar, a grid of cards, and a pagination control.
export function useSwapiList<T = SwapiRecord>(
  category: Category,
): UseSwapiListState<T> {
  const [data, setData] = useState<SwapiListResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPageState] = useState(1);
  const [search, setSearchState] = useState('');

  // Use the debounced version of the search text for API requests.
  // This means we only trigger a fetch after the user stops typing for 400ms.
  const debouncedSearch = useDebounce(search, 400);

  // When the user types in the search box, reset to page 1 so they see results
  // from the beginning rather than landing in the middle of a filtered result set.
  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch);
    setPageState(1);
  }, []);

  // Wrapped in useCallback so that React doesn't recreate this function every render.
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  // The actual data-fetching function. It depends on the category, debounced search
  // text, and page number — React will automatically re-run fetchData whenever
  // any of those values change.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getList<T>(category, debouncedSearch, page);
      setData(result);
    } catch (err) {
      // Convert the error to a plain string message for display in the UI.
      const message =
        err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
    } finally {
      // Always turn off the loading spinner, whether the request succeeded or failed.
      setLoading(false);
    }
  }, [category, debouncedSearch, page]);

  // Run fetchData whenever it changes (i.e. whenever category, search, or page changes).
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // When the user switches to a different category tab, clear the previous tab's
  // search text, page, and data so the new tab starts fresh.
  useEffect(() => {
    setSearchState('');
    setPageState(1);
    setData(null);
  }, [category]);

  return { data, loading, error, page, search, setPage, setSearch, refetch: fetchData };
}
