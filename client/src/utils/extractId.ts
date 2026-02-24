// swapi.dev identifies every item by a full URL rather than just a plain number.
// For example, Luke Skywalker's URL is: "https://swapi.dev/api/people/1/"
//
// Our app needs the numeric ID (just "1") to build its own API requests.
// This utility function pulls that ID out of the URL string.
//
// How it works:
//   1. Remove the trailing slash (if there is one): "https://swapi.dev/api/people/1"
//   2. Split the string on every "/" to get an array of parts
//   3. Return the last part, which is always the numeric ID: "1"

export function extractId(url: string): string {
  // Strip the trailing "/" so we don't get an empty string as the last element
  const trimmed = url.endsWith('/') ? url.slice(0, -1) : url;

  // Break the URL into segments and return the final one (the ID)
  const parts = trimmed.split('/');
  return parts[parts.length - 1];
}
