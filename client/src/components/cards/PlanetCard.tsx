import type { SwapiPlanet } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface PlanetCardProps {
  planet: SwapiPlanet;
  onSelect: (id: string) => void;
}

export function PlanetCard({ planet, onSelect }: PlanetCardProps) {
  const id = extractId(planet.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{planet.name}</h3>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Climate</span>
          {planet.climate}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Terrain</span>
          {planet.terrain}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Population</span>
          {planet.population !== 'unknown'
            ? Number(planet.population).toLocaleString()
            : 'Unknown'}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Diameter</span>
          {planet.diameter !== 'unknown' ? `${planet.diameter} km` : 'Unknown'}
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
