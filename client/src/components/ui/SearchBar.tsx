// A styled text input for searching. It shows a search icon on the left and,
// once the user has typed something, a small "×" clear button on the right.
//
// This is a "controlled" component — it doesn't store the text itself.
// Instead, the parent provides the current value and a function to call
// whenever the user types something (the `onChange` prop). This keeps
// the actual search state up in the parent (CategoryPage / useSwapiList).

import styles from './SearchBar.module.css';

// Props expected from the parent:
// - value:        the current search text (controlled by the parent)
// - onChange:     called every time the user types a character
// - placeholder:  hint text shown when the box is empty (optional)
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className={styles.container}>
      {/* Decorative search icon. aria-hidden means screen readers skip it. */}
      <span className={styles.icon} aria-hidden="true">&#9906;</span>

      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />

      {/* Only show the clear button if there's text in the box.
          Clicking it calls onChange('') which resets the search in the parent. */}
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          &times;
        </button>
      )}
    </div>
  );
}
