// A simple footer that sits at the bottom of every page.
// It credits the free Star Wars API (swapi.dev) that powers this app,
// and ends with a classic Star Wars sign-off.

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Powered by{' '}
        {/* Link opens in a new tab. rel="noopener noreferrer" is a security best
            practice when opening external links in a new tab — it prevents the
            external site from being able to access or redirect this tab. */}
        <a
          href="https://swapi.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          SWAPI
        </a>{' '}
        &mdash; The Star Wars API
      </p>
      <p className={styles.tagline}>May the Force be with you.</p>
    </footer>
  );
}
