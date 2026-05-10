import { useEffect, useRef, useState } from 'react';
import type { GameItem } from '../data/types';

interface Props {
  item: GameItem;
  lang: 'en' | 'mm';
}

// Priority-ordered list of high-quality British / clear English voices
const GB_VOICE_NAMES = [
  // macOS / iOS — highest quality neural voices
  'daniel', 'kate', 'serena', 'oliver',
  // Chrome / Android
  'google uk english female', 'google uk english male',
  // Windows
  'microsoft hazel', 'microsoft george', 'microsoft susan',
];

const voicesRef: { list: SpeechSynthesisVoice[] } = { list: [] };

function loadVoices() {
  voicesRef.list = window.speechSynthesis.getVoices();
}

function pickBestEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = voicesRef.list;
  if (!voices.length) return null;

  // 1. Preferred high-quality British voices by name
  for (const hint of GB_VOICE_NAMES) {
    const v = voices.find(v => v.name.toLowerCase().includes(hint));
    if (v) return v;
  }

  // 2. Any en-GB voice
  const gb = voices.find(v => v.lang === 'en-GB');
  if (gb) return gb;

  // 3. Any en-US voice
  return voices.find(v => v.lang.startsWith('en')) ?? null;
}

export function AnimalCard({ item, lang }: Props) {
  const [nameTapped,    setNameTapped]   = useState(false);
  const [soundPlaying,  setSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pre-load voices so pickBestEnglishVoice() works on first tap
  useEffect(() => {
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
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

    const text = lang === 'en' ? item.nameEn : item.nameMm;
    const utt  = new SpeechSynthesisUtterance(text);

    if (lang === 'en') {
      const voice = pickBestEnglishVoice();
      if (voice) utt.voice = voice;
      utt.lang  = voice?.lang ?? 'en-GB';
      utt.rate  = 0.82;   // measured, clear
      utt.pitch = 1.0;    // natural — no distortion
    } else {
      utt.lang  = 'my-MM';
      utt.rate  = 0.75;
      utt.pitch = 1.0;
    }

    utt.onend = utt.onerror = () => setNameTapped(false);
    window.speechSynthesis.speak(utt);
  };

  const playTTSFallback = () => {
    if (!window.speechSynthesis) { setSoundPlaying(false); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(item.sound);
    utt.lang  = 'en-US';
    utt.pitch = item.pitch ?? 1.2;
    utt.rate  = 1.0;
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
