// A summary card for one Star Wars film, displayed in the Films grid.
// Shows the episode number, title, director, release date, and producer.
// Clicking the card (or the "View Details" button) opens the full detail modal.

import type { SwapiFilm } from '../../types/swapi';
import { extractId } from '../../utils/extractId';
import styles from './Card.module.css';

interface FilmCardProps {
  film: SwapiFilm;
  onSelect: (id: string) => void;
}

export function FilmCard({ film, onSelect }: FilmCardProps) {
  const id = extractId(film.url);

  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      {/* Episode badge, e.g. "Episode 4" */}
      <span className={styles.episodeTag}>Episode {film.episode_id}</span>
      <h3 className={styles.title}>{film.title}</h3>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Director</span>
          {film.director}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Released</span>
          {film.release_date}
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Producer</span>
          {film.producer}
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
