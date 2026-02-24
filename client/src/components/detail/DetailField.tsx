// A single label-value row used inside the detail panels (PersonDetail, PlanetDetail, etc.).
// Handles three kinds of values gracefully:
//   - A plain text or number:     shown as-is (e.g. "Luke Skywalker", "172")
//   - An array (like a list of films): shown as a count (e.g. "4 entries") because
//     the full URLs from swapi.dev aren't meaningful to display directly
//   - null or undefined:          shown as "Unknown"

import styles from './DetailField.module.css';

// label: the field name displayed to the user (e.g. "Height", "Birth Year")
// value: the field's data — can be text, a number, a list of URLs, or missing
interface DetailFieldProps {
  label: string;
  value: string | number | string[] | null | undefined;
}

export function DetailField({ label, value }: DetailFieldProps) {
  // Decide what text to actually display:
  const displayValue = Array.isArray(value)
    ? value.length > 0
      ? `${value.length} entries`  // e.g. "6 entries" for a list of film URLs
      : 'None'                      // Empty array — nothing to show
    : value ?? 'Unknown';           // Plain value, or "Unknown" if null/undefined

  // <dt> and <dd> are HTML definition list terms — semantically correct for
  // a label-value pair and announced correctly by screen readers.
  return (
    <div className={styles.field}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{displayValue}</dd>
    </div>
  );
}
