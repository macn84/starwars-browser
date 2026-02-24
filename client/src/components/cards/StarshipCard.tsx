// A summary card for one Star Wars starship, displayed in the Starships grid.
// Shows the ship's name, model, class, manufacturer, and minimum crew size.
// Clicking the card (or the "View Details" button) opens the full detail modal.

import type { SwapiStarship } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface StarshipCardProps {
  starship: SwapiStarship;
  onSelect: (id: string) => void;
}

export function StarshipCard({ starship, onSelect }: StarshipCardProps) {
  const id = extractId(starship.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{starship.name}</h3>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Model</span>
          {starship.model}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Class</span>
          {starship.starship_class}  {/* e.g. "Starfighter", "Freighter" */}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Manufacturer</span>
          {starship.manufacturer}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Crew</span>
          {starship.crew}  {/* Minimum crew needed to fly the ship */}
        </div>
      </div>
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
