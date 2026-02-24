// A simple animated spinning circle with a message underneath.
// Shown whenever data is being fetched from the server so the user knows
// something is happening rather than seeing a blank screen.
//
// The role="status" and aria-label attributes make it accessible:
// screen readers will announce the message (e.g. "Searching the galaxy...")
// to users who cannot see the visual animation.

import styles from './LoadingSpinner.module.css';

// message is optional — defaults to "Loading..." if not provided
interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className={styles.container} role="status" aria-label={message}>
      {/* The spinning circle — animated entirely with CSS */}
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
