import type { ReactNode } from 'react';
import styles from './CardGrid.module.css';

interface CardGridProps {
  children: ReactNode;
  emptyMessage?: string;
}

export function CardGrid({ children, emptyMessage = 'No results found.' }: CardGridProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const hasChildren = childArray.some(Boolean);

  if (!hasChildren) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return <div className={styles.grid}>{children}</div>;
}
