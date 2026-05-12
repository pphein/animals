import type { GameItem } from './types';

export const phonics: GameItem[] = [
  // Short vowels
  { id: 'short_a', nameEn: 'Short A', nameMm: 'Short A', emoji: '🍎', bg: '#FEE2E2', sound: 'short A, as in apple',    pitch: 1.3, taste: 'short a says "ah" — apple, ant, axe',       tasteEmoji: '🍎' },
  { id: 'short_e', nameEn: 'Short E', nameMm: 'Short E', emoji: '🥚', bg: '#FEF9C3', sound: 'short E, as in egg',      pitch: 1.3, taste: 'short e says "eh" — egg, elephant, end',     tasteEmoji: '🥚' },
  { id: 'short_i', nameEn: 'Short I', nameMm: 'Short I', emoji: '🐛', bg: '#DCFCE7', sound: 'short I, as in insect',   pitch: 1.3, taste: 'short i says "ih" — insect, igloo, itch',    tasteEmoji: '🐛' },
  { id: 'short_o', nameEn: 'Short O', nameMm: 'Short O', emoji: '🐙', bg: '#DBEAFE', sound: 'short O, as in octopus',  pitch: 1.3, taste: 'short o says "oh" — octopus, otter, odd',    tasteEmoji: '🐙' },
  { id: 'short_u', nameEn: 'Short U', nameMm: 'Short U', emoji: '☂️', bg: '#EDE9FE', sound: 'short U, as in umbrella', pitch: 1.3, taste: 'short u says "uh" — umbrella, up, uncle',    tasteEmoji: '☂️' },

  // Long vowels
  { id: 'long_a', nameEn: 'Long A', nameMm: 'Long A', emoji: '🎂', bg: '#FEF3C7', sound: 'long A, as in cake',     pitch: 1.2, taste: 'long a says "ay" — cake, rain, play',      tasteEmoji: '🎂' },
  { id: 'long_e', nameEn: 'Long E', nameMm: 'Long E', emoji: '🦅', bg: '#D1FAE5', sound: 'long E, as in eagle',    pitch: 1.2, taste: 'long e says "ee" — eagle, feet, bee',       tasteEmoji: '🦅' },
  { id: 'long_i', nameEn: 'Long I', nameMm: 'Long I', emoji: '🧊', bg: '#FDF2F8', sound: 'long I, as in ice',      pitch: 1.2, taste: 'long i says "eye" — ice, kite, pie',        tasteEmoji: '🧊' },
  { id: 'long_o', nameEn: 'Long O', nameMm: 'Long O', emoji: '🌊', bg: '#F0F9FF', sound: 'long O, as in ocean',    pitch: 1.2, taste: 'long o says "oh" — ocean, bone, snow',      tasteEmoji: '🌊' },
  { id: 'long_u', nameEn: 'Long U', nameMm: 'Long U', emoji: '🦄', bg: '#FDF4FF', sound: 'long U, as in unicorn',  pitch: 1.2, taste: 'long u says "you" — unicorn, cube, tune',   tasteEmoji: '🦄' },

  // Digraphs
  { id: 'sh', nameEn: 'SH', nameMm: 'SH', emoji: '🐚', bg: '#ECFCCB', sound: 'sh, as in shell',   pitch: 1.2, taste: 'sh makes a shushing sound — shell, ship, shoe',      tasteEmoji: '🐚' },
  { id: 'ch', nameEn: 'CH', nameMm: 'CH', emoji: '🪑', bg: '#FFF7ED', sound: 'ch, as in chair',   pitch: 1.2, taste: 'ch makes a ch sound — chair, cheese, chin',           tasteEmoji: '🪑' },
  { id: 'th', nameEn: 'TH', nameMm: 'TH', emoji: '👍', bg: '#EEF2FF', sound: 'th, as in thumb',   pitch: 1.2, taste: 'th makes a th sound — thumb, think, three',           tasteEmoji: '👍' },
  { id: 'wh', nameEn: 'WH', nameMm: 'WH', emoji: '🐳', bg: '#F0F9FF', sound: 'wh, as in whale',   pitch: 1.2, taste: 'wh makes a wh sound — whale, whistle, white',         tasteEmoji: '🐳' },
  { id: 'ph', nameEn: 'PH', nameMm: 'PH', emoji: '📱', bg: '#FDF4FF', sound: 'ph, as in phone',   pitch: 1.2, taste: 'ph makes an f sound — phone, photo, dolphin',         tasteEmoji: '📱' },
  { id: 'ck', nameEn: 'CK', nameMm: 'CK', emoji: '🦆', bg: '#FEF9C3', sound: 'ck, as in duck',    pitch: 1.2, taste: 'ck makes a k sound — duck, clock, brick',             tasteEmoji: '🦆' },
  { id: 'ng', nameEn: 'NG', nameMm: 'NG', emoji: '💍', bg: '#FCE7F3', sound: 'ng, as in ring',    pitch: 1.2, taste: 'ng makes an ng sound — ring, sing, king',             tasteEmoji: '💍' },
];
