// A summary card for one Star Wars species, displayed in the Species grid.
// Shows the species name, biological classification (e.g. "mammal"), designation
// (sentient or not), language, and average lifespan.
// Clicking the card (or the "View Details" button) opens the full detail modal.

import type { SwapiSpecies } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface SpeciesCardProps {
  species: SwapiSpecies;
  onSelect: (id: string) => void;
}

export function SpeciesCard({ species, onSelect }: SpeciesCardProps) {
  const id = extractId(species.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{species.name}</h3>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Classification</span>
          {species.classification}  {/* e.g. "mammal", "reptile", "artificial" */}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Designation</span>
          {species.designation}  {/* "sentient" or "non-sentient" */}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Language</span>
          {species.language}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Avg. Lifespan</span>
          {species.average_lifespan !== 'unknown'
            ? `${species.average_lifespan} years`
            : 'Unknown'}
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
