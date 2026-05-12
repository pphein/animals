interface Category {
  id: string;
  label: string;
  labelMm: string;
  emoji: string;
  bg: string;
  color: string;
}

const categories: Category[] = [
  { id: 'animalList',     label: 'Animals',     labelMm: 'တိရစ္ဆာန်များ', emoji: '🐾', bg: '#FFF3CD', color: '#92400E' },
  { id: 'fruitList',     label: 'Fruits',      labelMm: 'သစ်သီးများ',    emoji: '🍓', bg: '#FCE7F3', color: '#9D174D' },
  { id: 'vegetableList', label: 'Vegetables',  labelMm: 'ဟင်းသီးဟင်းရွက်', emoji: '🥦', bg: '#DCFCE7', color: '#166534' },
  { id: 'colorList',     label: 'Colors',      labelMm: 'အရောင်များ',       emoji: '🎨', bg: '#FDF4FF', color: '#7E22CE' },
  { id: 'shapeList',    label: 'Shapes',      labelMm: 'ပုံသဏ္ဍာန်များ',   emoji: '🔷', bg: '#EEF2FF', color: '#3730A3' },
  { id: 'numberList',   label: 'Numbers',     labelMm: 'နံပါတ်များ',      emoji: '🔢', bg: '#FFF7ED', color: '#C2410C' },
  { id: 'bodyPartList', label: 'Body Parts',  labelMm: 'ခန္ဓာကိုယ်အစိတ်အပိုင်း', emoji: '🧠', bg: '#FDF2F8', color: '#9D174D' },
  { id: 'vehicleList',  label: 'Vehicles',    labelMm: 'ယာဉ်များ',              emoji: '🚗', bg: '#FEF9C3', color: '#92400E' },
  { id: 'clothesList',  label: 'Clothes',     labelMm: 'အဝတ်အစားများ',         emoji: '👕', bg: '#EEF2FF', color: '#4338CA' },
  { id: 'foodList',     label: 'Food',        labelMm: 'အစားအစာများ',          emoji: '🍚', bg: '#FFF7ED', color: '#9A3412' },
  { id: 'weatherList',  label: 'Weather',     labelMm: 'ရာသီဥတု',              emoji: '🌈', bg: '#F0F9FF', color: '#0369A1' },
  { id: 'emotionList',    label: 'Emotions',     labelMm: 'စိတ်ခံစားချက်များ',  emoji: '😊', bg: '#FEF9C3', color: '#92400E' },
  { id: 'occupationList', label: 'Occupations',  labelMm: 'အလုပ်အကိုင်များ',   emoji: '👨‍🍳', bg: '#ECFCCB', color: '#166534' },
  { id: 'alphabetList',   label: 'Alphabet',     labelMm: 'အက္ခရာများ',         emoji: '🔤', bg: '#FFF1F2', color: '#9F1239' },
  { id: 'phonicsList',   label: 'Phonics',      labelMm: 'အသံများ',            emoji: '🔊', bg: '#F0FDF4', color: '#166534' },
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
