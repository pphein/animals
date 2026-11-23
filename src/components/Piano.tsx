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
    <div className="force-landscape h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none">
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

      <div className="flex-1 min-h-0 flex flex-col justify-end px-3 pb-6">
        {/* Piano body — a wooden-look base holding the row of keys, like a real toy piano. */}
        <div
          className="rounded-[1.75rem] p-3 shadow-2xl"
          style={{ background: 'linear-gradient(160deg, #8a5a36 0%, #5c3a20 100%)' }}
        >
          <div className="flex gap-1">
            {pianoNotes.map((note, i) => {
              const keyId = `${note.id}-${i}`;
              const pressed = pressedId === keyId;
              return (
                <button
                  key={keyId}
                  onPointerDown={() => press(keyId, note.freq)}
                  aria-label={`${note.solfege} key`}
                  className={`flex-1 flex flex-col items-center justify-end gap-2 pb-4 h-56 rounded-t-md rounded-b-2xl transition-transform cursor-pointer ${
                    pressed ? 'translate-y-1.5' : ''
                  }`}
                  style={{
                    backgroundColor: note.bg,
                    borderBottom: `6px solid ${note.color}`,
                    boxShadow: pressed
                      ? 'inset 0 3px 6px rgba(0,0,0,0.25)'
                      : '0 5px 0 rgba(0,0,0,0.12), inset 0 -10px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  <span className="text-xl font-extrabold" style={{ color: note.color }}>
                    {note.solfege}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
