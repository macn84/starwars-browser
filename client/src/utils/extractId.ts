/**
 * Extracts the numeric ID from a SWAPI resource URL.
 * e.g. "https://swapi.dev/api/people/1/" → "1"
 */
export function extractId(url: string): string {
  const trimmed = url.endsWith('/') ? url.slice(0, -1) : url;
  const parts = trimmed.split('/');
  return parts[parts.length - 1];
}
