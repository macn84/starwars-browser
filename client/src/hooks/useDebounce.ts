// This hook "debounces" a value — it waits for the user to stop typing
// before updating the value that actually triggers a search.
//
// Without debouncing, every keystroke would fire a new API request.
// That's wasteful and can make the UI feel laggy. With debouncing, we wait
// until the user has paused for `delay` milliseconds (400ms by default)
// before we consider the value "settled" and pass it along.
//
// Example: if a user types "Luke" quickly, we only fire ONE request for "Luke"
// rather than four requests for "L", "Lu", "Luk", "Luke".

import { useState, useEffect } from 'react';

// T is a generic placeholder — this hook works for any type of value,
// not just strings (though strings are the most common use case).
export function useDebounce<T>(value: T, delay = 400): T {
  // Keep a separate copy of the value that only updates after the delay.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Start a countdown timer. If it reaches zero, update the debounced value.
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the value changes again before the timer fires (user keeps typing),
    // cancel the old timer and start a fresh one. This is the key mechanism
    // that prevents intermediate values from being used.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run this effect whenever value or delay changes

  return debouncedValue;
}
