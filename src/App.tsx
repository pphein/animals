import { useEffect, useState } from 'react';
import { animals } from './data/animals';
import { AnimalCard } from './components/AnimalCard';
import { useSwipe } from './hooks/useSwipe';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const TOTAL = animals.length;

export default function App() {
  const [page, setPage]       = useState(0);
  const [lang, setLang]       = useState<'en' | 'mm'>('en');
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };
  const [slideClass, setSlide] = useState('slide-from-right');
  const [animKey, setAnimKey]  = useState(0);

  const navigate = (next: number, dir: 'left' | 'right') => {
    setSlide(dir === 'left' ? 'slide-from-left' : 'slide-from-right');
    setAnimKey(k => k + 1);
    setPage(next);
  };

  const goNext = () => { if (page < TOTAL - 1) navigate(page + 1, 'left'); };
  const goPrev = () => { if (page > 0)         navigate(page - 1, 'right'); };

  const swipe = useSwipe(goNext, goPrev);

  return (
    <div
      className="h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none"
      {...swipe}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-tight">Animal Game</h1>
          <p className="text-xs text-gray-400">{page + 1} of {TOTAL}</p>
        </div>

        {/* Install button — Android only, shown when prompt is available */}
        {installPrompt && (
          <button
            onClick={handleInstall}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install
          </button>
        )}

        {/* Language toggle */}
        <div className="flex bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('mm')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              lang === 'mm'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            မြန်မာ
          </button>
        </div>
      </header>

      {/* Card */}
      <main className="flex-1 min-h-0 px-5 pb-3">
        <div key={animKey} className={`h-full ${slideClass}`}>
          <AnimalCard animal={animals[page]} lang={lang} />
        </div>
      </main>

      {/* Navigation */}
      {/* <footer className="shrink-0 py-4 flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={page === 0}
          className="w-10 h-10 rounded-full bg-white shadow text-indigo-500 font-bold text-xl disabled:opacity-25 hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          ‹
        </button>

        <div className="flex gap-1.5 items-center">
          {animals.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i, i > page ? 'left' : 'right')}
              className={`rounded-full transition-all duration-200 cursor-pointer ${
                i === page
                  ? 'w-5 h-2.5 bg-indigo-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={page === TOTAL - 1}
          className="w-10 h-10 rounded-full bg-white shadow text-indigo-500 font-bold text-xl disabled:opacity-25 hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          ›
        </button>
      </footer> */}
    </div>
  );
}
