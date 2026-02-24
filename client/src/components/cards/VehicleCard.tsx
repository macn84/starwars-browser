import type { SwapiVehicle } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface VehicleCardProps {
  vehicle: SwapiVehicle;
  onSelect: (id: string) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const id = extractId(vehicle.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      <h3 className={styles.title}>{vehicle.name}</h3>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Model</span>
          {vehicle.model}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Class</span>
          {vehicle.vehicle_class}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Manufacturer</span>
          {vehicle.manufacturer}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Crew</span>
          {vehicle.crew}
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
