// This is the very first file the browser runs when it loads our React app.
// Its job is simple: find the empty <div id="root"> element in index.html
// and tell React to take over that div and render our whole application inside it.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // Apply the global Star Wars dark theme styles
import App from './App';      // The top-level component that contains everything

// Find the HTML element that React will render inside.
// If it's missing (e.g. index.html was edited incorrectly), throw a helpful error
// rather than silently failing with a confusing blank screen.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html has <div id="root">');
}

// Mount the React application.
// StrictMode is a development helper — it deliberately runs certain checks twice
// to catch common mistakes early. It has no effect in the production build.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
