import type { GameItem } from './types';

export const instruments: GameItem[] = [
  { id: 'piano',      nameEn: 'Piano',      nameMm: 'စန္ဒရား',          emoji: '🎹', bg: '#F1F5F9', sound: 'Piano',      pitch: 1.1, taste: 'press the black and white keys to make music', tasteEmoji: '🎹' },
  { id: 'guitar',     nameEn: 'Guitar',     nameMm: 'ဂစ်တာ',            emoji: '🎸', bg: '#FEF3C7', sound: 'Guitar',     pitch: 1.1, taste: 'strum the six strings with your fingers',       tasteEmoji: '🎸' },
  { id: 'violin',     nameEn: 'Violin',     nameMm: 'တယောင်',           emoji: '🎻', bg: '#FCE7F3', sound: 'Violin',     pitch: 1.2, taste: 'draw a bow across the strings to sing',         tasteEmoji: '🎻' },
  { id: 'drums',      nameEn: 'Drums',      nameMm: 'တောင်းဆိုး',       emoji: '🥁', bg: '#FEE2E2', sound: 'Drums',      pitch: 1.0, taste: 'hit the drumhead with sticks to keep the beat',  tasteEmoji: '🥁' },
  { id: 'trumpet',    nameEn: 'Trumpet',    nameMm: 'တံပိုး',            emoji: '🎺', bg: '#FFF7ED', sound: 'Trumpet',    pitch: 1.1, taste: 'blow into the mouthpiece and press the valves',  tasteEmoji: '🎺' },
  { id: 'saxophone',  nameEn: 'Saxophone',  nameMm: 'ဆက်ဆိုဖုန်း',      emoji: '🎷', bg: '#FFEDD5', sound: 'Saxophone',  pitch: 1.0, taste: 'blow and press keys for a smooth jazzy sound',   tasteEmoji: '🎷' },
  { id: 'flute',      nameEn: 'Flute',      nameMm: 'တော်ပူ',            emoji: '🪈', bg: '#DBEAFE', sound: 'Flute',      pitch: 1.3, taste: 'blow across the hole and cover the keys',        tasteEmoji: '🪈' },
  { id: 'harp',       nameEn: 'Harp',       nameMm: 'တောင်းဆိုးကြီး',   emoji: '🎵', bg: '#EDE9FE', sound: 'Harp',       pitch: 1.2, taste: 'pluck the tall strings with both hands',         tasteEmoji: '🎵' },
  { id: 'accordion',  nameEn: 'Accordion',  nameMm: 'အကောဒီယံ',         emoji: '🪗', bg: '#DCFCE7', sound: 'Accordion',  pitch: 1.1, taste: 'squeeze and stretch to push air through the reeds', tasteEmoji: '🪗' },
  { id: 'microphone', nameEn: 'Microphone', nameMm: 'မိုက်ခရိုဖုန်း',   emoji: '🎤', bg: '#FDF4FF', sound: 'Microphone', pitch: 1.2, taste: 'sing into the mic and let your voice soar',      tasteEmoji: '🎤' },
  { id: 'banjo',      nameEn: 'Banjo',      nameMm: 'ဘန်ဂျို',           emoji: '🪕', bg: '#FEF9C3', sound: 'Banjo',      pitch: 1.2, taste: 'pluck the strings for a twangy country sound',   tasteEmoji: '🪕' },
  { id: 'maracas',    nameEn: 'Maracas',    nameMm: 'မာရာကာ',            emoji: '🎶', bg: '#ECFCCB', sound: 'Maracas',    pitch: 1.3, taste: 'shake them to the rhythm of the music',          tasteEmoji: '🎶' },
];
