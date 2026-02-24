// Shows the full details of a single Star Wars character inside the detail modal.
// Each field is rendered as a label-value pair using the DetailField component.
// Lists (films, starships, vehicles, species) are shown as a count (e.g. "4 entries")
// because the raw data from swapi.dev contains API URLs, not readable names.

import type { SwapiPerson } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface PersonDetailProps {
  person: SwapiPerson;
}

export function PersonDetail({ person }: PersonDetailProps) {
  return (
    // <dl> is an HTML "definition list" — the correct semantic element for a set
    // of label-value pairs, used here for accessibility.
    <dl className={styles.grid}>
      <DetailField label="Birth Year" value={person.birth_year} />
      <DetailField label="Gender" value={person.gender} />
      {/* Add units and fall back to "Unknown" when swapi.dev has no data */}
      <DetailField label="Height" value={person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'} />
      <DetailField label="Mass" value={person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown'} />
      <DetailField label="Hair Color" value={person.hair_color} />
      <DetailField label="Skin Color" value={person.skin_color} />
      <DetailField label="Eye Color" value={person.eye_color} />
      {/* Arrays are passed directly — DetailField converts them to "N entries" */}
      <DetailField label="Films" value={person.films} />
      <DetailField label="Starships" value={person.starships} />
      <DetailField label="Vehicles" value={person.vehicles} />
      <DetailField label="Species" value={person.species} />
    </dl>
  );
}
