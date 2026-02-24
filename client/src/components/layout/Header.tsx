import type { Category } from '../../types/swapi';
import { CATEGORIES, CATEGORY_LABELS } from '../../types/swapi';
import styles from './Header.module.css';

interface HeaderProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function Header({ activeCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <div className={styles.starDecor}>&#9733;</div>
        <h1 className={styles.title}>Star Wars Explorer</h1>
        <div className={styles.starDecor}>&#9733;</div>
      </div>
      <p className={styles.subtitle}>Browse the Galaxy Far, Far Away</p>
      <nav className={styles.nav} aria-label="Category navigation">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`${styles.navButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </nav>
    </header>
  );
}
