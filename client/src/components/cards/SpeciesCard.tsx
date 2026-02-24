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
          {species.classification}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Designation</span>
          {species.designation}
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
