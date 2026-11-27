import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import wordmark from './hone-wordmark-white.svg';

type Demo = { title: string; note: string; wide?: boolean };

// Title and short note per component, in gallery order; the key is the file name in src/components.
// Preview images live in public/previews (1440 px and 720 px WebP, captured from the running components).
const DEMOS: Record<string, Demo> = {
  'glass-dashboard': { title: 'Glass dashboard', note: 'Revenue, automations and a live activity table for a resort operations team, on frosted glass panels.', wide: true },
  'glass-sidebar': { title: 'Glass sidebar', note: 'An expandable navigation rail with nested menus, search and approval badges.' },
  'sign-in-animation': { title: 'Sign-in animation', note: 'An animated sign-in and sign-up page with demo credentials.' },
  'dish-orbit-carousel': { title: 'Dish orbit carousel', note: 'Ten signature dishes rotating in an orbit, with a guest order cart.', wide: true },
};

const loaders = import.meta.glob<{ default: ComponentType }>('./components/*.tsx');
const pages = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => [path.replace('./components/', '').replace('.tsx', ''), lazy(load)]),
);

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Index() {
  return (
    <div className="gallery">
      <main className="gallery-inner">
        <header className="gallery-head">
          <h1 className="lockup">
            <img src={wordmark} alt="H'ONE" />
            <span>UI Showcase</span>
          </h1>
          <p className="gallery-lede">
            <strong>Four interface experiments for a fictional resort.</strong> Each one is a single React file running on its own page.
            The data is made up and nothing talks to a backend.
          </p>
        </header>
        <ul className="gallery-grid">
          {Object.entries(DEMOS).map(([key, d], i) => (
            <li key={key} className={d.wide ? 'wide' : undefined}>
              <a className="shot" href={`#/${key}`}>
                <div className="shot-frame">
                  <img
                    src={`/previews/${key}.webp`}
                    srcSet={`/previews/${key}-720.webp 720w, /previews/${key}.webp 1440w`}
                    sizes={d.wide ? '(min-width: 1240px) 1144px, 100vw' : '(min-width: 900px) 50vw, 100vw'}
                    width="1440"
                    height="900"
                    alt={`Preview of the ${d.title.toLowerCase()}`}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="shot-cap">
                  <h2>{d.title}</h2>
                  <span className="shot-open">Open <Arrow /></span>
                  <p>{d.note}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <footer className="gallery-foot">
          <span>Code MIT. The H'ONE name and logo are not part of the licence.</span>
          <a href="https://github.com/Mas-Hanafi/hone-ui-showcase">Source on GitHub</a>
        </footer>
      </main>
    </div>
  );
}

function App() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const on = () => setHash(location.hash);
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  const Page = pages[hash.replace(/^#\//, '')];
  if (!Page) return <Index />;
  return (
    <>
      <Suspense fallback={<p style={{ padding: 24, font: '500 15px Outfit, system-ui' }}>Loading…</p>}>
        <Page />
      </Suspense>
      <a
        href="#/"
        style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 2147483647, padding: '8px 12px', borderRadius: 999, background: '#0f0e0d', color: '#f4f1ec', font: '600 13px Outfit, system-ui', boxShadow: '0 8px 20px -8px rgb(0 0 0 / 0.6)', textDecoration: 'none' }}
      >
        ← All components
      </a>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
