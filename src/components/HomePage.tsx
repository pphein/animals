interface Category {
  id: string;
  label: string;
  labelMm: string;
  emoji: string;
  bg: string;
  color: string;
}

const categories: Category[] = [
  { id: 'animalList', label: 'Animals', labelMm: 'တိရစ္ဆာန်များ', emoji: '🐾', bg: '#FFF3CD', color: '#92400E' },
];

interface Props {
  lang: 'en' | 'mm';
  onSelect: (id: string) => void;
}

export function HomePage({ lang, onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Learn &amp; Play</h1>
        <p className="text-sm text-gray-400 mt-1">Choose a category</p>
      </header>

      <main className="flex-1 px-5 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
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
