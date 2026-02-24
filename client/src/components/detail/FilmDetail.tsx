// Shows the full details of a single Star Wars film inside the detail modal.
// Includes the famous "opening crawl" text displayed at the start of each film.

import type { SwapiFilm } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface FilmDetailProps {
  film: SwapiFilm;
}

export function FilmDetail({ film }: FilmDetailProps) {
  return (
    <dl className={styles.grid}>
      <DetailField label="Episode" value={`Episode ${film.episode_id}`} />
      <DetailField label="Director" value={film.director} />
      <DetailField label="Producer" value={film.producer} />
      <DetailField label="Release Date" value={film.release_date} />
      {/* These lists contain URLs from swapi.dev — DetailField shows them as counts */}
      <DetailField label="Characters" value={film.characters} />
      <DetailField label="Planets" value={film.planets} />
      <DetailField label="Starships" value={film.starships} />
      <DetailField label="Vehicles" value={film.vehicles} />
      <DetailField label="Species" value={film.species} />

      {/* The opening crawl spans the full width of the grid so it's easy to read.
          This is the iconic scrolling text shown at the beginning of each Star Wars film. */}
      <div className={styles.fullWidth}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
          Opening Crawl
        </p>
        <div className={styles.crawl}>{film.opening_crawl}</div>
      </div>
    </dl>
  );
}
