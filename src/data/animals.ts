export interface Animal {
  id: string;
  nameEn: string;
  nameMm: string;
  emoji: string;
  bg: string;
  sound: string;   // onomatopoeia spoken on emoji tap
  pitch?: number;  // TTS pitch override (default 1.2)
}

export const animals: Animal[] = [
  // original 10
  { id: 'lion',      nameEn: 'Lion',      nameMm: 'ခြင်္သေ့',    emoji: '🦁', bg: '#FFF3CD', sound: 'Roarrr!',             pitch: 0.6 },
  { id: 'elephant',  nameEn: 'Elephant',  nameMm: 'ဆင်',         emoji: '🐘', bg: '#DBEAFE', sound: 'Pawww pawww!',         pitch: 0.7 },
  { id: 'tiger',     nameEn: 'Tiger',     nameMm: 'ကျား',        emoji: '🐯', bg: '#FEE2E2', sound: 'Roarr!',              pitch: 0.65 },
  { id: 'dog',       nameEn: 'Dog',       nameMm: 'ခွေး',        emoji: '🐕', bg: '#EDE9FE', sound: 'Woof woof!',           pitch: 1.1 },
  { id: 'cat',       nameEn: 'Cat',       nameMm: 'ကြောင်',     emoji: '🐱', bg: '#FCE7F3', sound: 'Meow!',               pitch: 1.3 },
  { id: 'cow',       nameEn: 'Cow',       nameMm: 'နွား',        emoji: '🐄', bg: '#D1FAE5', sound: 'Mooo!',               pitch: 0.8 },
  { id: 'duck',      nameEn: 'Duck',      nameMm: 'ဘဲ',          emoji: '🦆', bg: '#BFDBFE', sound: 'Quack quack!',         pitch: 1.2 },
  { id: 'monkey',    nameEn: 'Monkey',    nameMm: 'မျောက်',    emoji: '🐒', bg: '#FEF3C7', sound: 'Ooh ooh ahh ahh!',     pitch: 1.2 },
  { id: 'snake',     nameEn: 'Snake',     nameMm: 'မြွေ',        emoji: '🐍', bg: '#DCFCE7', sound: 'Hissss!',             pitch: 1.0 },
  { id: 'bird',      nameEn: 'Bird',      nameMm: 'ငှက်',       emoji: '🐦', bg: '#E0F2FE', sound: 'Tweet tweet!',         pitch: 1.6 },
  { id: 'rabbit',    nameEn: 'Rabbit',    nameMm: 'ယုန်',        emoji: '🐰', bg: '#F3E8FF', sound: 'Squeak squeak!',       pitch: 1.5 },
  { id: 'frog',      nameEn: 'Frog',      nameMm: 'ဖား',         emoji: '🐸', bg: '#BBFBD0', sound: 'Ribbit ribbit!',       pitch: 0.9 },
  { id: 'fish',      nameEn: 'Fish',      nameMm: 'ငါး',         emoji: '🐟', bg: '#CFFAFE', sound: 'Blub blub blub!',      pitch: 1.1 },
  { id: 'bear',      nameEn: 'Bear',      nameMm: 'ဝက်ဝံ',      emoji: '🐻', bg: '#FFEDD5', sound: 'Growwl!',             pitch: 0.6 },
  { id: 'pig',       nameEn: 'Pig',       nameMm: 'ဝက်',         emoji: '🐷', bg: '#FFE4E6', sound: 'Oink oink!',           pitch: 1.1 },
  { id: 'horse',     nameEn: 'Horse',     nameMm: 'မြင်း',       emoji: '🐴', bg: '#FEF9C3', sound: 'Neigh!',              pitch: 0.9 },
  { id: 'sheep',     nameEn: 'Sheep',     nameMm: 'သိုး',        emoji: '🐑', bg: '#F1F5F9', sound: 'Baa baa!',            pitch: 1.1 },
  { id: 'chicken',   nameEn: 'Chicken',   nameMm: 'ကြက်',       emoji: '🐔', bg: '#FFF7ED', sound: 'Cluck cluck!',         pitch: 1.3 },
  { id: 'butterfly', nameEn: 'Butterfly', nameMm: 'လိပ်ပြာ',    emoji: '🦋', bg: '#FDF4FF', sound: 'Flutter flutter!',     pitch: 1.6 },
  { id: 'penguin',   nameEn: 'Penguin',   nameMm: 'ပင်ကွမ်',    emoji: '🐧', bg: '#E0F2FE', sound: 'Squawk squawk!',       pitch: 1.2 },
  { id: 'giraffe',   nameEn: 'Giraffe',   nameMm: 'ကုလားအုပ်',  emoji: '🦒', bg: '#FEFCE8', sound: 'Hmmm!',              pitch: 0.7 },
  { id: 'zebra',     nameEn: 'Zebra',     nameMm: 'မြင်းကျား',  emoji: '🦓', bg: '#F3F4F6', sound: 'Neigh neigh!',         pitch: 1.0 },
  { id: 'crocodile', nameEn: 'Crocodile', nameMm: 'မိကျောင်း',  emoji: '🐊', bg: '#CCFBF1', sound: 'Snap snap!',           pitch: 0.7 },
  { id: 'hippo',     nameEn: 'Hippo',     nameMm: 'ရေမြင်း',    emoji: '🦛', bg: '#EDE9FE', sound: 'Grunt grunt!',         pitch: 0.6 },
  { id: 'turtle',    nameEn: 'Turtle',    nameMm: 'လိပ်',        emoji: '🐢', bg: '#DCFCE7', sound: 'Shhh... plop!',        pitch: 0.8 },
  { id: 'whale',     nameEn: 'Whale',     nameMm: 'ဝေလငါး',    emoji: '🐳', bg: '#BAE6FD', sound: 'Wooooo!',             pitch: 0.5 },
  { id: 'bee',       nameEn: 'Bee',       nameMm: 'ပျား',        emoji: '🐝', bg: '#FEF08A', sound: 'Bzzz bzzz!',          pitch: 1.5 },
  { id: 'owl',       nameEn: 'Owl',       nameMm: 'ဇိုး',        emoji: '🦉', bg: '#FDE68A', sound: 'Hoo hoo!',            pitch: 0.85 },
  { id: 'fox',       nameEn: 'Fox',       nameMm: 'မြေခွေး',    emoji: '🦊', bg: '#FED7AA', sound: 'Yap yap!',            pitch: 1.2 },
  { id: 'dinosaur',  nameEn: 'Dinosaur',  nameMm: 'ဒိုင်နိုဆော', emoji: '🦕', bg: '#BBF7D0', sound: 'Roarrr rahhh!',       pitch: 0.5 },
  { id: 'goat',      nameEn: 'Goat',      nameMm: 'ဆိတ်',        emoji: '🐐', bg: '#FEF9C3', sound: 'Maa maa!',            pitch: 1.1 },
  { id: 'pig2',      nameEn: 'Pig',       nameMm: 'ဝက်',         emoji: '🐖', bg: '#FECACA', sound: 'Oink oink oink!',      pitch: 1.0 },
  { id: 'rooster',   nameEn: 'Rooster',   nameMm: 'ကြက်ဖ',      emoji: '🐓', bg: '#FDE68A', sound: 'Cock a doodle doo!',   pitch: 1.3 },
  { id: 'dolphin',   nameEn: 'Dolphin',   nameMm: 'ဒေါလ်ဖင်',  emoji: '🐬', bg: '#DBEAFE', sound: 'Eee eee eee!',         pitch: 1.6 },
  { id: 'panda',     nameEn: 'Panda',     nameMm: 'ပန်ဒါ',      emoji: '🐼', bg: '#E5E7EB', sound: 'Maa maa!',            pitch: 0.9 },
  { id: 'koala',     nameEn: 'Koala',     nameMm: 'ကိုအာလာ',   emoji: '🐨', bg: '#E0F2FE', sound: 'Grr grr!',            pitch: 0.8 },
  { id: 'kangaroo',  nameEn: 'Kangaroo',  nameMm: 'ကင်ဂါရူး',  emoji: '🦘', bg: '#FED7AA', sound: 'Thump thump thump!',   pitch: 0.9 },
];
