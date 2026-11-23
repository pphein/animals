import { useState } from 'react';
import { pianoNotes } from '../data/pianoNotes';
import { playPianoNote } from '../lib/sfx';

interface Props {
  lang: 'en' | 'mm';
  onBack: () => void;
}

export function Piano({ lang, onBack }: Props) {
  const [pressedId, setPressedId] = useState<string | null>(null);

  const press = (id: string, freq: number) => {
    playPianoNote(freq);
    setPressedId(id);
    setTimeout(() => setPressedId(curr => (curr === id ? null : curr)), 180);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
      <header className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
        <button
          onClick={onBack}
          aria-label="Back to home"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-tight">
            {lang === 'en' ? 'Color Piano' : 'အရောင်စန္ဒရား'}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'en' ? 'Tap the colors to play a tune' : 'သီချင်းတစ်ပုဒ်တီးရန် အရောင်များကို တို့ပါ'}
          </p>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex items-center px-4 pb-6">
        <div className="grid grid-cols-4 gap-3 w-full">
          {pianoNotes.map((note, i) => (
            <button
              key={`${note.id}-${i}`}
              onPointerDown={() => press(`${note.id}-${i}`, note.freq)}
              aria-label={`${note.solfege} key`}
              className={`flex flex-col items-center justify-center gap-1 rounded-3xl aspect-square shadow-md transition-transform cursor-pointer ${
                pressedId === `${note.id}-${i}` ? 'scale-90' : 'active:scale-90'
              }`}
              style={{ backgroundColor: note.bg }}
            >
              <span className="text-3xl font-extrabold" style={{ color: note.color }}>
                {note.solfege}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
