import type { GameItem } from './types';

export const planets: GameItem[] = [
  { id: 'mercury', nameEn: 'Mercury', nameMm: 'ဗုဒ္ဓဟူးဂြိုဟ်',  emoji: '🪨', bg: '#E7E5E4', sound: 'Mercury', pitch: 1.2, taste: 'the smallest and fastest planet, closest to the Sun',  tasteEmoji: '☀️' },
  { id: 'venus',   nameEn: 'Venus',   nameMm: 'သောကြာဂြိုဟ်',   emoji: '🌕', bg: '#FEF9C3', sound: 'Venus',   pitch: 1.2, taste: 'the hottest planet, covered in thick yellow clouds',     tasteEmoji: '☁️' },
  { id: 'earth',   nameEn: 'Earth',   nameMm: 'မြေကြီး',         emoji: '🌍', bg: '#DBEAFE', sound: 'Earth',   pitch: 1.1, taste: 'our home — the only planet with life and liquid water', tasteEmoji: '💧' },
  { id: 'mars',    nameEn: 'Mars',    nameMm: 'အင်္ဂါဂြိုဟ်',   emoji: '🔴', bg: '#FEE2E2', sound: 'Mars',    pitch: 1.1, taste: 'the red planet with the tallest volcano in the solar system', tasteEmoji: '🌋' },
  { id: 'jupiter', nameEn: 'Jupiter', nameMm: 'ကြာသပတေးဂြိုဟ်', emoji: '🪐', bg: '#FEF3C7', sound: 'Jupiter', pitch: 1.0, taste: 'the biggest planet with a giant storm called the Great Red Spot', tasteEmoji: '🌀' },
  { id: 'saturn',  nameEn: 'Saturn',  nameMm: 'စနေဂြိုဟ်',      emoji: '🪐', bg: '#FFF7ED', sound: 'Saturn',  pitch: 1.0, taste: 'the ringed planet — its rings are made of ice and rock', tasteEmoji: '💍' },
  { id: 'uranus',  nameEn: 'Uranus',  nameMm: 'ယူရေးနပ်ဂြိုဟ်', emoji: '🔵', bg: '#DBEAFE', sound: 'Uranus',  pitch: 1.0, taste: 'a blue-green ice giant that spins on its side',          tasteEmoji: '🧊' },
  { id: 'neptune', nameEn: 'Neptune', nameMm: 'နက်ပျုန်ဂြိုဟ်', emoji: '🫧', bg: '#EDE9FE', sound: 'Neptune', pitch: 1.0, taste: 'the windiest planet — storms faster than a rocket ship', tasteEmoji: '💨' },
  { id: 'sun',     nameEn: 'Sun',     nameMm: 'နေ',              emoji: '☀️', bg: '#FEF9C3', sound: 'Sun',     pitch: 1.1, taste: 'our star — it gives us light and warmth every day',      tasteEmoji: '🌟' },
  { id: 'moon',    nameEn: 'Moon',    nameMm: 'လ',               emoji: '🌕', bg: '#F1F5F9', sound: 'Moon',    pitch: 1.1, taste: "Earth's only natural satellite — it controls our tides", tasteEmoji: '🌊' },
];
