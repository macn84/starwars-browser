// Shows the full details of a single Star Wars species inside the detail modal.
// Covers biological classification, physical traits, culture, and appearances.

import type { SwapiSpecies } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface SpeciesDetailProps {
  species: SwapiSpecies;
}

export function SpeciesDetail({ species }: SpeciesDetailProps) {
  return (
    <dl className={styles.grid}>
      {/* Broad biological group, e.g. "mammal", "reptile", "artificial" */}
      <DetailField label="Classification" value={species.classification} />
      {/* "sentient" means capable of thought and speech; "non-sentient" means animal-level */}
      <DetailField label="Designation" value={species.designation} />
      <DetailField label="Language" value={species.language} />
      <DetailField
        label="Avg. Height"
        value={species.average_height !== 'unknown' ? `${species.average_height} cm` : 'Unknown'}
      />
      {/* Some species (like droids) have an "indefinite" lifespan */}
      <DetailField
        label="Avg. Lifespan"
        value={species.average_lifespan !== 'unknown' ? `${species.average_lifespan} years` : 'Unknown'}
      />
      <DetailField label="Skin Colors" value={species.skin_colors} />
      <DetailField label="Hair Colors" value={species.hair_colors} />
      <DetailField label="Eye Colors" value={species.eye_colors} />
      <DetailField label="Films" value={species.films} />
      {/* Notable members of this species; shown as a count of entries */}
      <DetailField label="Notable People" value={species.people} />
    </dl>
  );
}
