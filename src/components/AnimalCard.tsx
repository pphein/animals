import { useEffect, useRef, useState } from 'react';
import type { GameItem } from '../data/types';

interface Props {
  item: GameItem;
  lang: 'en' | 'mm';
}

// Known female voice name fragments across platforms
const FEMALE_HINTS = [
  'female', 'woman', 'girl',
  // macOS / iOS
  'samantha', 'karen', 'moira', 'tessa', 'victoria', 'fiona', 'kate', 'serena',
  // Windows
  'zira', 'hazel', 'susan',
  // Google
  'google uk english female',
];

function pickFemaleVoice(langPrefix: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // 1. Female voice matching the requested language
  const match = voices.find(v =>
    v.lang.startsWith(langPrefix) &&
    FEMALE_HINTS.some(h => v.name.toLowerCase().includes(h))
  );
  if (match) return match;

  // 2. Any female English voice
  const enFemale = voices.find(v =>
    v.lang.startsWith('en') &&
    FEMALE_HINTS.some(h => v.name.toLowerCase().includes(h))
  );
  if (enFemale) return enFemale;

  // 3. First voice for the language
  return voices.find(v => v.lang.startsWith(langPrefix)) ?? null;
}

export function AnimalCard({ item, lang }: Props) {
  const [nameTapped,   setNameTapped]  = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pre-load voices as soon as the browser has them
  useEffect(() => {
    const load = () => window.speechSynthesis.getVoices();
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  // Stop all audio when this card unmounts (page swipe)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleNameTap = () => {
    if (nameTapped || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setNameTapped(true);
    const utt = new SpeechSynthesisUtterance(
      lang === 'en' ? item.nameEn : item.nameMm
    );
    utt.lang  = lang === 'en' ? 'en-US' : 'my-MM';
    utt.rate  = 0.75;
    utt.pitch = 1.4;
    const voice = pickFemaleVoice(lang === 'en' ? 'en' : 'my');
    if (voice) utt.voice = voice;
    utt.onend = utt.onerror = () => setNameTapped(false);
    window.speechSynthesis.speak(utt);
  };

  const playTTSFallback = () => {
    if (!window.speechSynthesis) { setSoundPlaying(false); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(item.sound);
    utt.lang  = 'en-US';
    utt.pitch = item.pitch ?? 1.4;
    utt.rate  = 0.85;
    const voice = pickFemaleVoice('en');
    if (voice) utt.voice = voice;
    utt.onend = utt.onerror = () => setSoundPlaying(false);
    window.speechSynthesis.speak(utt);
  };

  const handleEmojiTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (soundPlaying) return;
    setSoundPlaying(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/sounds/${item.id}.mp3`);
    audioRef.current = audio;

    audio.onended = () => setSoundPlaying(false);
    audio.onerror = () => playTTSFallback();

    audio.play().catch(() => playTTSFallback());
  };

  const primary   = lang === 'en' ? item.nameEn : item.nameMm;
  const secondary = lang === 'en' ? item.nameMm : item.nameEn;

  return (
    <div
      className="w-full h-full rounded-3xl flex flex-col items-center justify-between py-10 px-6 shadow-xl cursor-pointer"
      style={{
        backgroundColor: item.bg,
        transform: nameTapped ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s ease',
      }}
      onClick={handleNameTap}
    >
      <p key={`p-${lang}`} className="fade-up text-5xl font-bold text-gray-800 tracking-tight select-none text-center">
        {primary}
      </p>

      <span
        className={`leading-none select-none cursor-pointer text-[12rem] ${soundPlaying ? 'bounce-play' : ''}`}
        onClick={handleEmojiTap}
        onTouchStart={handleEmojiTap}
      >
        {item.emoji}
      </span>

      <p key={`s-${lang}`} className="fade-up text-2xl text-gray-400 select-none text-center">
        {secondary}
      </p>
    </div>
  );
}
