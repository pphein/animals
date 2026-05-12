import type { GameItem } from './types';

export const weather: GameItem[] = [
  { id: 'sunny',     nameEn: 'Sunny',     nameMm: 'နေရောင်ချောင်း',  emoji: '☀️',  bg: '#FEF9C3', sound: 'Sunny',     pitch: 1.3, taste: 'bright and warm outside',     tasteEmoji: '😎' },
  { id: 'cloudy',    nameEn: 'Cloudy',    nameMm: 'တိမ်ကြပ်',        emoji: '☁️',  bg: '#F1F5F9', sound: 'Cloudy',    pitch: 1.2, taste: 'clouds cover the sky',        tasteEmoji: '🌥️' },
  { id: 'rainy',     nameEn: 'Rainy',     nameMm: 'မိုးရွာ',          emoji: '🌧️',  bg: '#DBEAFE', sound: 'Rainy',     pitch: 1.2, taste: 'water falls from the sky',    tasteEmoji: '☔' },
  { id: 'stormy',    nameEn: 'Stormy',    nameMm: 'မုန်တိုင်း',       emoji: '⛈️',  bg: '#E0E7FF', sound: 'Stormy',    pitch: 1.0, taste: 'thunder and lightning',       tasteEmoji: '⚡' },
  { id: 'snowy',     nameEn: 'Snowy',     nameMm: 'နှင်းကျ',          emoji: '❄️',  bg: '#F0F9FF', sound: 'Snowy',     pitch: 1.2, taste: 'cold white flakes fall down', tasteEmoji: '⛄' },
  { id: 'windy',     nameEn: 'Windy',     nameMm: 'လေပြင်း',          emoji: '💨',  bg: '#ECFCCB', sound: 'Windy',     pitch: 1.2, taste: 'strong air blowing around',   tasteEmoji: '🍃' },
  { id: 'foggy',     nameEn: 'Foggy',     nameMm: 'မြူဆိုင်း',        emoji: '🌫️',  bg: '#E2E8F0', sound: 'Foggy',     pitch: 1.1, taste: 'hard to see far away',        tasteEmoji: '👀' },
  { id: 'rainbow',   nameEn: 'Rainbow',   nameMm: 'သက်တံဆိပ်',       emoji: '🌈',  bg: '#FDF4FF', sound: 'Rainbow',   pitch: 1.3, taste: 'seven colours in the sky',    tasteEmoji: '🎨' },
  { id: 'lightning', nameEn: 'Lightning', nameMm: 'မိုးကြိုး',        emoji: '⚡',  bg: '#FEF9C3', sound: 'Lightning', pitch: 1.2, taste: 'a bright flash in the sky',   tasteEmoji: '🌩️' },
  { id: 'hail',      nameEn: 'Hail',      nameMm: 'မိုးသီး',          emoji: '🌨️',  bg: '#E0F2FE', sound: 'Hail',      pitch: 1.1, taste: 'ice balls fall from the sky', tasteEmoji: '🧊' },
  { id: 'hot',       nameEn: 'Hot',       nameMm: 'ပူ',               emoji: '🌡️',  bg: '#FEE2E2', sound: 'Hot',       pitch: 1.3, taste: 'very warm and sweaty',        tasteEmoji: '🥵' },
  { id: 'cold',      nameEn: 'Cold',      nameMm: 'အေး',              emoji: '🥶',  bg: '#DBEAFE', sound: 'Cold',      pitch: 1.2, taste: 'makes you shiver and shake',  tasteEmoji: '🧣' },
];
