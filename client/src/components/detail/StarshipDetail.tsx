import type { SwapiStarship } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface StarshipDetailProps {
  starship: SwapiStarship;
}

export function StarshipDetail({ starship }: StarshipDetailProps) {
  return (
    <dl className={styles.grid}>
      <DetailField label="Model" value={starship.model} />
      <DetailField label="Class" value={starship.starship_class} />
      <DetailField label="Manufacturer" value={starship.manufacturer} />
      <DetailField label="Cost" value={starship.cost_in_credits !== 'unknown' ? `${Number(starship.cost_in_credits).toLocaleString()} credits` : 'Unknown'} />
      <DetailField label="Length" value={`${starship.length} m`} />
      <DetailField label="Crew" value={starship.crew} />
      <DetailField label="Passengers" value={starship.passengers} />
      <DetailField label="Cargo Capacity" value={starship.cargo_capacity} />
      <DetailField label="Hyperdrive Rating" value={starship.hyperdrive_rating} />
      <DetailField label="MGLT" value={starship.MGLT} />
      <DetailField label="Max Speed" value={starship.max_atmosphering_speed} />
      <DetailField label="Consumables" value={starship.consumables} />
      <DetailField label="Films" value={starship.films} />
      <DetailField label="Pilots" value={starship.pilots} />
    </dl>
  );
}
