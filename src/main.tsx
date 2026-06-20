import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Self-hosted fonts, Latin subset only (no external CDN -> no SRI needed,
// tighter CSP; Latin-only avoids shipping Cyrillic/Greek/Vietnamese we don't
// use). @fontsource ships font-display: swap by default.
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';

import './index.css';

// PWA: register the service worker (precache + offline). Imported (not inlined)
// so it stays within the strict 'self' CSP.
registerSW({ immediate: true });

// Suppress the browser's automatic "Add JDHoffman to Home screen" install
// banner on mobile (it's intrusive). The app remains installable via the
// browser's own menu for anyone who wants it.
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
