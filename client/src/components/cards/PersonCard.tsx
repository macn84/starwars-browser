import type { SwapiPerson } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface PersonCardProps {
  person: SwapiPerson;
  onSelect: (id: string) => void;
}

export function PersonCard({ person, onSelect }: PersonCardProps) {
  const id = extractId(person.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{person.name}</h3>
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
          {person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Eye Color</span>
          {person.eye_color}
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
