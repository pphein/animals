import type { GameItem } from './types';
import { animals } from './animals';
import { birds } from './birds';
import { insects } from './insects';
import { seaAnimals } from './seaAnimals';
import { dinosaurs } from './dinosaurs';
import { farmAnimals } from './farmAnimals';
import { sports } from './sports';
import { instruments } from './instruments';
import { planets } from './planets';
import { fruits } from './fruits';
import { vegetables } from './vegetables';
import { colors } from './colors';
import { shapes } from './shapes';
import { numbers } from './numbers';
import { bodyParts } from './bodyparts';
import { vehicles } from './vehicles';
import { clothes } from './clothes';
import { food } from './food';
import { weather } from './weather';
import { emotions } from './emotions';
import { occupations } from './occupations';
import { alphabet } from './alphabet';
import { phonics } from './phonics';

export interface CategoryDef {
  id: string;
  label: string;
  labelMm: string;
  emoji: string;
  bg: string;
  color: string;
  items: GameItem[];
}

export const categories: CategoryDef[] = [
  { id: 'animal',     label: 'Animals',     labelMm: 'တိရစ္ဆာန်များ',            emoji: '🐾',     bg: '#FFF3CD', color: '#92400E', items: animals },
  { id: 'bird',       label: 'Birds',       labelMm: 'ငှက်များ',                 emoji: '🐦',     bg: '#F0F9FF', color: '#0369A1', items: birds },
  { id: 'insect',     label: 'Insects',     labelMm: 'ပိုးမွှားများ',             emoji: '🐛',     bg: '#ECFCCB', color: '#3F6212', items: insects },
  { id: 'seaAnimal',  label: 'Sea Animals', labelMm: 'ပင်လယ်သတ္တဝါများ',        emoji: '🐠',     bg: '#E0F2FE', color: '#0369A1', items: seaAnimals },
  { id: 'dinosaur',   label: 'Dinosaurs',   labelMm: 'ဒိုင်နိုဆောများ',          emoji: '🦕',     bg: '#FEF3C7', color: '#92400E', items: dinosaurs },
  { id: 'farmAnimal', label: 'Farm Animals', labelMm: 'စိုက်ပျိုးရေးသတ္တဝါများ', emoji: '🐄',     bg: '#F0FDF4', color: '#166534', items: farmAnimals },
  { id: 'sports',     label: 'Sports',      labelMm: 'အားကစားများ',              emoji: '⚽',     bg: '#DCFCE7', color: '#166534', items: sports },
  { id: 'instrument', label: 'Instruments', labelMm: 'တူရိယာများ',               emoji: '🎸',     bg: '#FEF3C7', color: '#92400E', items: instruments },
  { id: 'planet',     label: 'Planets',     labelMm: 'ဂြိုဟ်များ',               emoji: '🪐',     bg: '#EDE9FE', color: '#4C1D95', items: planets },
  { id: 'fruit',      label: 'Fruits',      labelMm: 'သစ်သီးများ',               emoji: '🍓',     bg: '#FCE7F3', color: '#9D174D', items: fruits },
  { id: 'vegetable',  label: 'Vegetables',  labelMm: 'ဟင်းသီးဟင်းရွက်',          emoji: '🥦',     bg: '#DCFCE7', color: '#166534', items: vegetables },
  { id: 'color',      label: 'Colors',      labelMm: 'အရောင်များ',               emoji: '🎨',     bg: '#FDF4FF', color: '#7E22CE', items: colors },
  { id: 'shape',      label: 'Shapes',      labelMm: 'ပုံသဏ္ဍာန်များ',           emoji: '🔷',     bg: '#EEF2FF', color: '#3730A3', items: shapes },
  { id: 'number',     label: 'Numbers',     labelMm: 'နံပါတ်များ',               emoji: '🔢',     bg: '#FFF7ED', color: '#C2410C', items: numbers },
  { id: 'bodyPart',   label: 'Body Parts',  labelMm: 'ခန္ဓာကိုယ်အစိတ်အပိုင်း',   emoji: '🧠',     bg: '#FDF2F8', color: '#9D174D', items: bodyParts },
  { id: 'vehicle',    label: 'Vehicles',    labelMm: 'ယာဉ်များ',                 emoji: '🚗',     bg: '#FEF9C3', color: '#92400E', items: vehicles },
  { id: 'clothes',    label: 'Clothes',     labelMm: 'အဝတ်အစားများ',             emoji: '👕',     bg: '#EEF2FF', color: '#4338CA', items: clothes },
  { id: 'food',       label: 'Food',        labelMm: 'အစားအစာများ',              emoji: '🍚',     bg: '#FFF7ED', color: '#9A3412', items: food },
  { id: 'weather',    label: 'Weather',     labelMm: 'ရာသီဥတု',                  emoji: '🌈',     bg: '#F0F9FF', color: '#0369A1', items: weather },
  { id: 'emotion',    label: 'Emotions',    labelMm: 'စိတ်ခံစားချက်များ',        emoji: '😊',     bg: '#FEF9C3', color: '#92400E', items: emotions },
  { id: 'occupation', label: 'Occupations', labelMm: 'အလုပ်အကိုင်များ',          emoji: '👨‍🍳', bg: '#ECFCCB', color: '#166534', items: occupations },
  { id: 'alphabet',   label: 'Alphabet',    labelMm: 'အက္ခရာများ',               emoji: '🔤',     bg: '#FFF1F2', color: '#9F1239', items: alphabet },
  { id: 'phonics',    label: 'Phonics',     labelMm: 'အသံများ',                  emoji: '🔊',     bg: '#F0FDF4', color: '#166534', items: phonics },
];

// Categories with a drag-and-drop matching puzzle mode (see PuzzleBoard),
// modeled after the toddler peg-puzzle toys (animals, numbers, alphabet, shapes, colors).
export const puzzleCategoryIds = ['animal', 'number', 'alphabet', 'shape', 'color'];
