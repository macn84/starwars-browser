// A full-screen pop-up (modal) that appears over the page when a user clicks
// on a card. It shows the item's full details inside a scrollable panel.
//
// Features:
//   - Pressing the Escape key closes the modal
//   - Clicking the dark backdrop behind the modal also closes it
//   - The page behind the modal can't be scrolled while it's open
//   - Clicking inside the modal panel itself does NOT close it
//   - Accessible: marked as a dialog, screen readers are aware of it

import { useEffect, type ReactNode } from 'react';
import styles from './DetailModal.module.css';

// title:    shown in the modal header (character name, planet name, film title, etc.)
// onClose:  called when the user wants to close the modal
// children: the detail component to render inside (PersonDetail, PlanetDetail, etc.)
interface DetailModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function DetailModal({ title, onClose, children }: DetailModalProps) {
  useEffect(() => {
    // Listen for the Escape key anywhere on the page while the modal is open.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    // Prevent the page behind the modal from scrolling.
    document.body.style.overflow = 'hidden';

    // Cleanup: remove the listener and restore scrolling when the modal closes.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    // The semi-transparent dark backdrop that covers the rest of the page.
    // Clicking the backdrop calls onClose.
    // role="dialog" and aria-modal="true" tell screen readers this is a modal dialog.
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* The white/dark panel in the centre of the screen.
          e.stopPropagation() prevents clicks inside the panel from reaching the
          backdrop, which would accidentally close the modal. */}
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row: title on the left, close (×) button on the right */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            &times;  {/* × */}
          </button>
        </div>

        {/* The scrollable body of the modal where the detail component is rendered */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
