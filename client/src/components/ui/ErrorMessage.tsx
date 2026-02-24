// Displays a user-friendly error panel with a warning icon, a heading,
// the error message text, and an optional "Try Again" button.
//
// Used in two places:
//   1. In CategoryPage — when the list of cards fails to load (shows "Try Again")
//   2. Inside the detail modal — when a single item's details fail to load
//
// The role="alert" attribute makes this accessible: screen readers will
// immediately announce the error message when it appears on screen.

import styles from './ErrorMessage.module.css';

// message:   the error text to display (comes from the caught error)
// onRetry:   if provided, a "Try Again" button is shown. Optional because
//            the detail modal doesn't have a retry mechanism.
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      {/* Warning triangle icon ⚠ — decorative so screen readers skip it */}
      <div className={styles.icon} aria-hidden="true">&#9888;</div>
      <h3 className={styles.title}>Something went wrong</h3>
      <p className={styles.message}>{message}</p>

      {/* Only show the retry button when a retry function was passed in */}
      {onRetry && (
        <button className={styles.retry} onClick={onRetry} type="button">
          Try Again
        </button>
      )}
    </div>
  );
}
