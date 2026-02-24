// Displays "« Prev" and "Next »" buttons with the current page info in between.
// The Prev button is disabled when on the first page; Next is disabled on the last.
// Clicking a button calls onPageChange, which updates the page in useSwapiList,
// which triggers a new API request.

import styles from './Pagination.module.css';

// Props expected from the parent (CategoryPage):
// - page:         the current page number (1-based)
// - hasNext:      true if there are more pages after this one
// - hasPrevious:  true if there are pages before this one
// - totalCount:   total number of results across all pages
// - onPageChange: called with the new page number when the user clicks a button
interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
  onPageChange: (page: number) => void;
}

// swapi.dev always returns 10 results per page.
// We use this to calculate the total number of pages to display.
const PAGE_SIZE = 10;

export function Pagination({
  page,
  hasNext,
  hasPrevious,
  totalCount,
  onPageChange,
}: PaginationProps) {
  // Round up so that a partial last page still counts (e.g. 82 results = 9 pages).
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className={styles.container}>
      {/* Previous button — disabled when we're already on page 1 */}
      <button
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        aria-label="Previous page"
      >
        &laquo; Prev
      </button>

      {/* Page info in the middle, e.g. "Page 2 of 9 (82 results)" */}
      <span className={styles.info}>
        Page {page} of {totalPages}
        <span className={styles.count}> ({totalCount} results)</span>
      </span>

      {/* Next button — disabled when we're on the last page */}
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
