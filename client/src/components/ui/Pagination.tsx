import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const PAGE_SIZE = 10;

export function Pagination({
  page,
  hasNext,
  hasPrevious,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        aria-label="Previous page"
      >
        &laquo; Prev
      </button>

      <span className={styles.info}>
        Page {page} of {totalPages}
        <span className={styles.count}> ({totalCount} results)</span>
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        aria-label="Next page"
      >
        Next &raquo;
      </button>
    </div>
  );
}
