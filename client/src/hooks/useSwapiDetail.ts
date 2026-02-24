import { useState, useEffect } from 'react';
import { getById } from '../api/swapiApi';
import type { Category } from '../types/swapi';
import type { SwapiRecord } from '../api/swapiApi';

interface UseSwapiDetailState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useSwapiDetail<T = SwapiRecord>(
  category: Category,
  id: string | null,
): UseSwapiDetailState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getById<T>(category, id);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to fetch details';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [category, id]);

  return { data, loading, error };
}
