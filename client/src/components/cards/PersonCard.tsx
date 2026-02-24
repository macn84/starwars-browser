// A summary card for one Star Wars character, displayed in the People grid.
// Shows the character's name, birth year, gender, height, and eye colour.
// The whole card is clickable (as well as the "View Details" button) to open
// the detail modal with their full information.

import type { SwapiPerson } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

// person:    the character data fetched from the API
// onSelect:  function to call with the character's numeric ID when they're clicked
interface PersonCardProps {
  person: SwapiPerson;
  onSelect: (id: string) => void;
}

export function PersonCard({ person, onSelect }: PersonCardProps) {
  // swapi.dev gives us a full URL like "https://swapi.dev/api/people/1/".
  // We extract just the "1" so we can pass it to onSelect.
  const id = extractId(person.url);

  return (
    // Clicking anywhere on the card opens the detail modal
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{person.name}</h3>

      {/* Summary stats shown on the card face */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Born</span>
          {person.birth_year}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Gender</span>
          {person.gender}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Height</span>
          {/* swapi.dev uses the string "unknown" when data isn't available */}
          {person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Eye Color</span>
          {person.eye_color}
        </div>
      </div>

      {/* The explicit button for keyboard/accessibility users.
          e.stopPropagation() prevents the click from also triggering the
          card's own onClick handler, which would call onSelect twice. */}
      <button
        className={styles.viewButton}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        type="button"
      >
        View Details
      </button>
    </div>
  );
}
