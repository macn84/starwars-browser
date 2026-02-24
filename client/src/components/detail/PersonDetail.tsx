import type { SwapiPerson } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface PersonDetailProps {
  person: SwapiPerson;
}

export function PersonDetail({ person }: PersonDetailProps) {
  return (
    <dl className={styles.grid}>
      <DetailField label="Birth Year" value={person.birth_year} />
      <DetailField label="Gender" value={person.gender} />
      <DetailField label="Height" value={person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'} />
      <DetailField label="Mass" value={person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown'} />
      <DetailField label="Hair Color" value={person.hair_color} />
      <DetailField label="Skin Color" value={person.skin_color} />
      <DetailField label="Eye Color" value={person.eye_color} />
      <DetailField label="Films" value={person.films} />
      <DetailField label="Starships" value={person.starships} />
      <DetailField label="Vehicles" value={person.vehicles} />
      <DetailField label="Species" value={person.species} />
    </dl>
  );
}
