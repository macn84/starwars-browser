import { useState, useEffect, useCallback } from 'react';
import { getList } from '../api/swapiApi';
import { useDebounce } from './useDebounce';
import type { Category, SwapiListResponse } from '../types/swapi';
import type { SwapiRecord } from '../api/swapiApi';

interface UseSwapiListState<T> {
  data: SwapiListResponse<T> | null;
  loading: boolean;
  error: string | null;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  refetch: () => void;
}

export function useSwapiList<T = SwapiRecord>(
  category: Category,
): UseSwapiListState<T> {
  const [data, setData] = useState<SwapiListResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPageState] = useState(1);
  const [search, setSearchState] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch);
    setPageState(1);
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getList<T>(category, debouncedSearch, page);
      setData(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch, page]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // Reset state when category changes
  useEffect(() => {
    setSearchState('');
    setPageState(1);
    setData(null);
  }, [category]);

  return { data, loading, error, page, search, setPage, setSearch, refetch: fetchData };
}
