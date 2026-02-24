// Shows the full technical specifications of a single Star Wars starship.
// Starships are spacecraft capable of hyperspace travel (unlike vehicles).

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
      {/* Format the cost with commas and the Galactic Credits unit */}
      <DetailField label="Cost" value={starship.cost_in_credits !== 'unknown' ? `${Number(starship.cost_in_credits).toLocaleString()} credits` : 'Unknown'} />
      <DetailField label="Length" value={`${starship.length} m`} />
      <DetailField label="Crew" value={starship.crew} />
      <DetailField label="Passengers" value={starship.passengers} />
      <DetailField label="Cargo Capacity" value={starship.cargo_capacity} />
      {/* Hyperdrive rating — lower number means faster hyperspace travel */}
      <DetailField label="Hyperdrive Rating" value={starship.hyperdrive_rating} />
      {/* MGLT = Megalights per hour — a unit of sublight speed in the Star Wars universe */}
      <DetailField label="MGLT" value={starship.MGLT} />
      <DetailField label="Max Speed" value={starship.max_atmosphering_speed} />
      {/* Consumables = how long the ship can operate without resupply (e.g. "2 months") */}
      <DetailField label="Consumables" value={starship.consumables} />
      <DetailField label="Films" value={starship.films} />
      <DetailField label="Pilots" value={starship.pilots} />
    </dl>
  );
}
