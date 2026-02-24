// A responsive grid layout that wraps a collection of cards.
// It handles two cases:
//   1. There are cards to show — renders them in a CSS grid (multiple columns on wide screens)
//   2. There are no cards — renders a friendly empty-state message instead
//      (e.g. "No people found. Try a different search.")
//
// This component doesn't know what kind of cards it contains — it just arranges
// whatever children are passed to it. This makes it reusable across all six categories.

import type { ReactNode } from 'react';
import styles from './CardGrid.module.css';

// children:      the card elements to display inside the grid
// emptyMessage:  text shown when there are no cards (optional, has a default)
interface CardGridProps {
  children: ReactNode;
  emptyMessage?: string;
}

export function CardGrid({ children, emptyMessage = 'No results found.' }: CardGridProps) {
  // Normalise children into an array so we can check if any of them are real content.
  // React passes a single element if there's only one child, or an array if there are many.
  const childArray = Array.isArray(children) ? children : [children];

  // `some(Boolean)` returns true if at least one child is truthy (i.e. not null/undefined/false).
  const hasChildren = childArray.some(Boolean);

  // If there's nothing to show, render the empty state message instead of an empty grid.
  if (!hasChildren) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Render the grid with all the cards inside it.
  return <div className={styles.grid}>{children}</div>;
}
