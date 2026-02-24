// This hook fetches the full details for a single Star Wars item (e.g. one character,
// one planet) when the user clicks on a card to open the detail modal.
//
// Key behaviours:
//   - If `id` is null (no item selected), the hook does nothing and returns no data.
//   - As soon as `id` is set, it fires a request and returns loading/data/error state.
//   - If the user closes the modal mid-request (or clicks a different card),
//     the "cancelled" flag prevents the stale response from updating the UI.

import { useState, useEffect } from 'react';
import { getById } from '../api/swapiApi';
import type { Category } from '../types/swapi';
import type { SwapiRecord } from '../api/swapiApi';

// The shape of the object this hook returns.
interface UseSwapiDetailState<T> {
  data: T | null;        // The fetched item, or null if not yet loaded
  loading: boolean;      // True while the request is in flight
  error: string | null;  // Error message, or null if there's no error
}

// category: which type of item to fetch (e.g. 'people')
// id:       the numeric ID as a string (e.g. '1'), or null if nothing is selected
export function useSwapiDetail<T = SwapiRecord>(
  category: Category,
  id: string | null,
): UseSwapiDetailState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If there's no ID (modal closed), clear any previous data and stop.
    if (!id) {
      setData(null);
      setError(null);
      return;
    }

    // This flag prevents a response from a previous (now-stale) request from
    // overwriting the state after the component has moved on.
    // For example: user clicks item A, then quickly clicks item B. We don't
    // want item A's response to arrive late and replace item B's data.
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getById<T>(category, id);
        // Only update the UI if this request is still relevant
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

    // Cleanup function: runs when `id` or `category` changes, or when the
    // component unmounts. Setting cancelled = true prevents stale updates.
    return () => {
      cancelled = true;
    };
  }, [category, id]); // Re-run whenever the user selects a different item or tab

  return { data, loading, error };
}
