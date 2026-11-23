import { useEffect, useRef, useState } from 'react';
import type { GameItem } from '../data/types';
import { initVoices, speak } from '../lib/speech';
import { playCreatureSound } from '../lib/sfx';

interface Props {
  item: GameItem;
  lang: 'en' | 'mm';
}

export function AnimalCard({ item, lang }: Props) {
  const [nameTapped,    setNameTapped]   = useState(false);
  const [soundPlaying,  setSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => initVoices(), []);

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
    setNameTapped(true);
    const text = lang === 'en' ? item.nameEn : item.nameMm;
    const utt = speak(text, lang);
    if (!utt) { setNameTapped(false); return; }
    utt.onend = utt.onerror = () => setNameTapped(false);
  };

  // Speak "[Name] is [taste]!" for fruits
  const speakTaste = () => {
    const utt = speak(`${item.nameEn} is ${item.taste}!`, 'en');
    if (!utt) { setSoundPlaying(false); return; }
    utt.onend = utt.onerror = () => setSoundPlaying(false);
  };

  // Cartoon sound effect fallback when there's no recorded mp3 for this item —
  // a synthesized boing/squeak pitched by item.pitch, not a voice reading the word.
  const playCartoonFallback = () => {
    playCreatureSound(item.pitch ?? 1.2);
    setTimeout(() => setSoundPlaying(false), 400);
  };

  const handleEmojiTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (soundPlaying) return;
    setSoundPlaying(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Fruits: speak taste description instead of playing a sound file
    if (item.taste) {
      speakTaste();
      return;
    }

    // Animals: try MP3 → cartoon sound effect fallback
    const audio = new Audio(`/sounds/${item.id}.mp3`);
    audioRef.current = audio;
    audio.onended = () => setSoundPlaying(false);
    audio.onerror = () => playCartoonFallback();
    audio.play().catch(() => playCartoonFallback());
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

      <div className="flex flex-col items-center gap-4">
        <span
          className={`leading-none select-none cursor-pointer text-[12rem] ${soundPlaying ? 'bounce-play' : ''}`}
          onClick={handleEmojiTap}
          onTouchStart={handleEmojiTap}
        >
          {item.emoji}
        </span>

        {/* Taste badge — visible only for fruits while sound plays */}
        {item.taste && (
          <div
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md transition-all duration-300"
            style={{
              opacity: soundPlaying ? 1 : 0,
              transform: soundPlaying ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(8px)',
            }}
          >
            <span className="text-2xl">{item.tasteEmoji}</span>
            <span className="text-base font-bold text-gray-700 select-none">
              {item.nameEn} is {item.taste}!
            </span>
          </div>
        )}
      </div>

      <p key={`s-${lang}`} className="fade-up text-2xl text-gray-400 select-none text-center">
        {secondary}
      </p>
    </div>
  );
}
