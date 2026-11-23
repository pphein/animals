import type { GameItem } from './types';

// Each letter's primary spoken sound (not its name — see data/alphabet.ts for
// that), paired with a familiar example word in the classic toddler phonics
// chant format: "A says ah, ah, apple." Long vowels and consonant digraphs
// (sh/ch/th/wh/ph/ck/ng) are deliberately left out — blending letter
// combinations is a kindergarten-level reading skill, not a 2-3 year old one.
export const phonics: GameItem[] = [
  { id: 'a', nameEn: 'A', nameMm: 'A', emoji: '🍎', bg: '#FEE2E2', sound: 'ah',   pitch: 1.3, taste: 'ah, ah, apple',       tasteEmoji: '🍎' },
  { id: 'b', nameEn: 'B', nameMm: 'B', emoji: '⚽', bg: '#DBEAFE', sound: 'buh',  pitch: 1.3, taste: 'buh, buh, ball',      tasteEmoji: '⚽' },
  { id: 'c', nameEn: 'C', nameMm: 'C', emoji: '🐱', bg: '#DCFCE7', sound: 'kuh',  pitch: 1.3, taste: 'kuh, kuh, cat',       tasteEmoji: '🐱' },
  { id: 'd', nameEn: 'D', nameMm: 'D', emoji: '🐶', bg: '#FEF3C7', sound: 'duh',  pitch: 1.3, taste: 'duh, duh, dog',       tasteEmoji: '🐶' },
  { id: 'e', nameEn: 'E', nameMm: 'E', emoji: '🥚', bg: '#FEF9C3', sound: 'eh',   pitch: 1.3, taste: 'eh, eh, egg',         tasteEmoji: '🥚' },
  { id: 'f', nameEn: 'F', nameMm: 'F', emoji: '🐟', bg: '#CFFAFE', sound: 'fuh',  pitch: 1.2, taste: 'fuh, fuh, fish',      tasteEmoji: '🐟' },
  { id: 'g', nameEn: 'G', nameMm: 'G', emoji: '🐐', bg: '#ECFCCB', sound: 'guh',  pitch: 1.2, taste: 'guh, guh, goat',      tasteEmoji: '🐐' },
  { id: 'h', nameEn: 'H', nameMm: 'H', emoji: '🎩', bg: '#FFF7ED', sound: 'huh',  pitch: 1.2, taste: 'huh, huh, hat',       tasteEmoji: '🎩' },
  { id: 'i', nameEn: 'I', nameMm: 'I', emoji: '🐛', bg: '#DCFCE7', sound: 'ih',   pitch: 1.3, taste: 'ih, ih, insect',      tasteEmoji: '🐛' },
  { id: 'j', nameEn: 'J', nameMm: 'J', emoji: '🧃', bg: '#FEF9C3', sound: 'juh',  pitch: 1.2, taste: 'juh, juh, juice',     tasteEmoji: '🧃' },
  { id: 'k', nameEn: 'K', nameMm: 'K', emoji: '🪁', bg: '#DBEAFE', sound: 'kuh',  pitch: 1.2, taste: 'kuh, kuh, kite',      tasteEmoji: '🪁' },
  { id: 'l', nameEn: 'L', nameMm: 'L', emoji: '🦁', bg: '#FFF7ED', sound: 'luh',  pitch: 1.2, taste: 'luh, luh, lion',      tasteEmoji: '🦁' },
  { id: 'm', nameEn: 'M', nameMm: 'M', emoji: '🌙', bg: '#EDE9FE', sound: 'muh',  pitch: 1.2, taste: 'muh, muh, moon',     tasteEmoji: '🌙' },
  { id: 'n', nameEn: 'N', nameMm: 'N', emoji: '👃', bg: '#FDF2F8', sound: 'nuh',  pitch: 1.2, taste: 'nuh, nuh, nose',      tasteEmoji: '👃' },
  { id: 'o', nameEn: 'O', nameMm: 'O', emoji: '🐙', bg: '#DBEAFE', sound: 'ah',   pitch: 1.2, taste: 'ah, ah, octopus',     tasteEmoji: '🐙' },
  { id: 'p', nameEn: 'P', nameMm: 'P', emoji: '🐷', bg: '#FFE4E6', sound: 'puh',  pitch: 1.2, taste: 'puh, puh, pig',      tasteEmoji: '🐷' },
  { id: 'q', nameEn: 'Q', nameMm: 'Q', emoji: '👸', bg: '#FCE7F3', sound: 'kwuh', pitch: 1.2, taste: 'kwuh, kwuh, queen',   tasteEmoji: '👸' },
  { id: 'r', nameEn: 'R', nameMm: 'R', emoji: '🐰', bg: '#F3E8FF', sound: 'ruh',  pitch: 1.2, taste: 'ruh, ruh, rabbit',    tasteEmoji: '🐰' },
  { id: 's', nameEn: 'S', nameMm: 'S', emoji: '☀️', bg: '#FEF9C3', sound: 'sss',  pitch: 1.2, taste: 'sss, sss, sun',       tasteEmoji: '☀️' },
  { id: 't', nameEn: 'T', nameMm: 'T', emoji: '🐯', bg: '#FEE2E2', sound: 'tuh',  pitch: 1.2, taste: 'tuh, tuh, tiger',     tasteEmoji: '🐯' },
  { id: 'u', nameEn: 'U', nameMm: 'U', emoji: '☂️', bg: '#DBEAFE', sound: 'uh',   pitch: 1.2, taste: 'uh, uh, umbrella',   tasteEmoji: '☂️' },
  { id: 'v', nameEn: 'V', nameMm: 'V', emoji: '🚐', bg: '#EDE9FE', sound: 'vuh',  pitch: 1.2, taste: 'vuh, vuh, van',      tasteEmoji: '🚐' },
  { id: 'w', nameEn: 'W', nameMm: 'W', emoji: '🍉', bg: '#DCFCE7', sound: 'wuh',  pitch: 1.2, taste: 'wuh, wuh, watermelon', tasteEmoji: '🍉' },
  { id: 'x', nameEn: 'X', nameMm: 'X', emoji: '📦', bg: '#F1F5F9', sound: 'ks',   pitch: 1.2, taste: 'ks, ks, box',        tasteEmoji: '📦' },
  { id: 'y', nameEn: 'Y', nameMm: 'Y', emoji: '🪀', bg: '#FEF9C3', sound: 'yuh',  pitch: 1.2, taste: 'yuh, yuh, yo-yo',    tasteEmoji: '🪀' },
  { id: 'z', nameEn: 'Z', nameMm: 'Z', emoji: '🦓', bg: '#ECFCCB', sound: 'zzz',  pitch: 1.2, taste: 'zzz, zzz, zebra',    tasteEmoji: '🦓' },
];
