import { useState } from 'react';
import { animals } from '../data/animals';
import { AnimalCard } from './AnimalCard';
import { useSwipe } from '../hooks/useSwipe';

const TOTAL = animals.length;

interface Props {
  lang: 'en' | 'mm';
  onBack: () => void;
}

export function AnimalGame({ lang, onBack }: Props) {
  const [page, setPage]           = useState(0);
  const [slideClass, setSlide]    = useState('slide-from-right');
  const [animKey, setAnimKey]     = useState(0);

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
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">Animals</h1>
            <p className="text-xs text-gray-400">{page + 1} of {TOTAL}</p>
          </div>
        </div>
      </header>

      {/* Card */}
      <main className="flex-1 min-h-0 px-5 pb-3">
        <div key={animKey} className={`h-full ${slideClass}`}>
          <AnimalCard animal={animals[page]} lang={lang} />
        </div>
      </main>
    </div>
  );
}
