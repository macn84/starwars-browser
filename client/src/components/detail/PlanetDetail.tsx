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
      <DetailField label="Rotation Period" value={`${planet.rotation_period} hours`} />
      <DetailField label="Orbital Period" value={`${planet.orbital_period} days`} />
      <DetailField label="Residents" value={planet.residents} />
      <DetailField label="Films" value={planet.films} />
    </dl>
  );
}
