import type { GameItem } from '../data/types';

interface Props {
  items: GameItem[];
  title: string;
  lang: 'en' | 'mm';
  onSelect: (index: number) => void;
  onBack: () => void;
}

export function AnimalList({ items, title, lang, onSelect, onBack }: Props) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-tight">{title}</h1>
          <p className="text-xs text-gray-400">{items.length} items</p>
        </div>
      </header>

      {/* Grid */}
      <main className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onSelect(index)}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-4 px-2 shadow-sm active:scale-95 transition-transform cursor-pointer"
              style={{ backgroundColor: item.bg }}
            >
              <span className="text-4xl leading-none">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {lang === 'en' ? item.nameEn : item.nameMm}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
