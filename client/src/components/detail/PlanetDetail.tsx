// Shows the full details of a single Star Wars planet inside the detail modal.
// Formats raw API values into human-readable text (adding units, commas in numbers, etc.).

import type { SwapiPlanet } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface PlanetDetailProps {
  planet: SwapiPlanet;
}

export function PlanetDetail({ planet }: PlanetDetailProps) {
  return (
    <dl className={styles.grid}>
      <DetailField label="Climate" value={planet.climate} />
      <DetailField label="Terrain" value={planet.terrain} />
      {/* Format population with commas (e.g. 200000 → "200,000") for readability */}
      <DetailField
        label="Population"
        value={
          planet.population !== 'unknown'
            ? Number(planet.population).toLocaleString()
            : 'Unknown'
        }
      />
      <DetailField
        label="Diameter"
        value={planet.diameter !== 'unknown' ? `${planet.diameter} km` : 'Unknown'}
      />
      <DetailField label="Gravity" value={planet.gravity} />
      <DetailField label="Surface Water" value={`${planet.surface_water}%`} />
      {/* Rotation period = length of a day; orbital period = length of a year */}
      <DetailField label="Rotation Period" value={`${planet.rotation_period} hours`} />
      <DetailField label="Orbital Period" value={`${planet.orbital_period} days`} />
      <DetailField label="Residents" value={planet.residents} />
      <DetailField label="Films" value={planet.films} />
    </dl>
  );
}
