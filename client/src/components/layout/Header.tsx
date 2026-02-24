// The sticky header that appears at the top of every page.
// It shows the app title ("Star Wars Explorer") and the six category tab buttons.
// Clicking a tab calls onCategoryChange, which is handled by App.tsx.

import type { Category } from '../../types/swapi';
import { CATEGORIES, CATEGORY_LABELS } from '../../types/swapi';
import styles from './Header.module.css';

// Props this component expects from its parent (App.tsx):
// - activeCategory:    which tab is currently selected (controls the highlighted tab)
// - onCategoryChange:  function to call when the user clicks a different tab
interface HeaderProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function Header({ activeCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Title row — decorative stars flank the app name */}
      <div className={styles.titleContainer}>
        <div className={styles.starDecor}>&#9733;</div>  {/* ★ */}
        <h1 className={styles.title}>Star Wars Explorer</h1>
        <div className={styles.starDecor}>&#9733;</div>  {/* ★ */}
      </div>

      <p className={styles.subtitle}>Browse the Galaxy Far, Far Away</p>

      {/* Navigation tabs — one button per category.
          The aria-label makes this understandable to screen readers.
          aria-current="page" tells screen readers which tab is active. */}
      <nav className={styles.nav} aria-label="Category navigation">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`${styles.navButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            {CATEGORY_LABELS[category]}  {/* e.g. "People", "Planets", "Films" */}
          </button>
        ))}
      </nav>
    </header>
  );
}
