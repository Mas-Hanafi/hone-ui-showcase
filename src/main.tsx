import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

type Demo = { title: string; note: string };

// Judul dan catatan singkat tiap komponen; kuncinya nama file di src/components.
const DEMOS: Record<string, Demo> = {
  'glass-dashboard': { title: 'Glass dashboard', note: 'Dashboard kaca dengan kartu, grafik, dan tabel.' },
  'glass-sidebar': { title: 'Glass sidebar', note: 'Sidebar kaca dengan menu bersarang.' },
  'sign-in-animation': { title: 'Sign-in animation', note: 'Halaman masuk beranimasi.' },
  'dish-orbit-carousel': { title: 'Dish orbit carousel', note: 'Carousel hidangan yang berputar mengorbit.' },
};

const loaders = import.meta.glob<{ default: ComponentType }>('./components/*.tsx');
const pages = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => [path.replace('./components/', '').replace('.tsx', ''), lazy(load)]),
);

function Index() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px', fontFamily: 'system-ui, sans-serif', color: '#1c1917' }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>H One UI Showcase</h1>
      <p style={{ color: '#57534e' }}>Komponen UI eksperimen untuk resort fiktif. Pilih satu untuk melihatnya berjalan.</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {Object.entries(DEMOS).map(([key, d]) => (
          <li key={key}>
            <a href={`#/${key}`} style={{ display: 'block', padding: 16, border: '1px solid #d6d3d1', borderRadius: 12, textDecoration: 'none', color: 'inherit' }}>
              <strong>{d.title}</strong>
              <div style={{ color: '#57534e', marginTop: 4 }}>{d.note}</div>
            </a>
          </li>
        ))}
      </ul>
    </main>
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
      <Suspense fallback={<p style={{ padding: 24, fontFamily: 'system-ui' }}>Memuat…</p>}>
        <Page />
      </Suspense>
      <a
        href="#/"
        style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 2147483647, padding: '8px 12px', borderRadius: 999, background: '#1c1917', color: '#fff', font: '600 13px system-ui', textDecoration: 'none' }}
      >
        ← Semua komponen
      </a>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
