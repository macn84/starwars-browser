import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Powered by{' '}
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
