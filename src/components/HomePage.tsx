import { categories, puzzleCategoryIds } from '../data/categories';

interface Props {
  lang: 'en' | 'mm';
  onSelect: (id: string) => void;
  onPlayPuzzle: (id: string) => void;
}

export function HomePage({ lang, onSelect, onPlayPuzzle }: Props) {
  const puzzleCategories = puzzleCategoryIds
    .map(id => categories.find(c => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Learn &amp; Play</h1>
        <p className="text-sm text-gray-400 mt-1">Choose a category</p>
      </header>

      <section className="px-5 pb-2">
        <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wide mb-2">
          🧩 {lang === 'en' ? 'Puzzle Games' : 'ပဟေဠိ ဂိမ်းများ'}
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {puzzleCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onPlayPuzzle(cat.id)}
              aria-label={`${lang === 'en' ? cat.label : cat.labelMm} puzzle`}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-4 px-1 shadow-md active:scale-95 transition-transform cursor-pointer"
              style={{ backgroundColor: cat.bg }}
            >
              <span className="text-4xl leading-none">{cat.emoji}</span>
              <span className="text-[11px] font-bold text-center leading-tight" style={{ color: cat.color }}>
                {lang === 'en' ? cat.label : cat.labelMm}
              </span>
            </button>
          ))}
        </div>
      </section>

      <main className="flex-1 px-5 pt-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              aria-label={lang === 'en' ? cat.label : cat.labelMm}
              className="flex flex-col items-center justify-center gap-3 rounded-3xl py-8 px-4 shadow-md active:scale-95 transition-transform cursor-pointer"
              style={{ backgroundColor: cat.bg }}
            >
              <span className="text-6xl leading-none">{cat.emoji}</span>
              <span className="text-lg font-bold" style={{ color: cat.color }}>
                {lang === 'en' ? cat.label : cat.labelMm}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
