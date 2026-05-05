import { useState } from 'react';
import type { Animal } from '../data/animals';

interface Props {
  animal: Animal;
  lang: 'en' | 'mm';
}

export function AnimalCard({ animal, lang }: Props) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const text = lang === 'en' ? animal.nameEn : animal.nameMm;
    const locale = lang === 'en' ? 'en-US' : 'my-MM';
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = locale;
    utt.rate = 0.75;
    setTapped(true);
    utt.onend = () => setTapped(false);
    utt.onerror = () => setTapped(false);
    window.speechSynthesis.speak(utt);
  };

  const primary   = lang === 'en' ? animal.nameEn : animal.nameMm;
  const secondary = lang === 'en' ? animal.nameMm : animal.nameEn;

  return (
    <div
      className="w-full h-full rounded-3xl flex flex-col items-center justify-between py-10 px-6 cursor-pointer shadow-xl"
      style={{
        backgroundColor: animal.bg,
        transform: tapped ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s ease',
      }}
      onClick={handleTap}
    >
      {/* Primary name */}
      <p
        key={`primary-${lang}`}
        className="fade-up text-5xl font-bold text-gray-800 tracking-tight select-none text-center"
      >
        {primary}
      </p>

      {/* Emoji */}
      <span className="text-[12rem] leading-none select-none">{animal.emoji}</span>

      {/* Secondary name */}
      <p
        key={`secondary-${lang}`}
        className="fade-up text-2xl text-gray-400 select-none text-center"
      >
        {secondary}
      </p>
    </div>
  );
}
