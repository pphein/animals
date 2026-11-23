export interface PianoNote {
  id: string;
  solfege: string;
  freq: number;
  bg: string;
  color: string;
}

// Classic rainbow-keyed toddler piano: one colour per solfège syllable of
// the C major scale, red used for both the low and high "Do" (one octave apart).
export const pianoNotes: PianoNote[] = [
  { id: 'do1', solfege: 'Do', freq: 261.63, bg: '#FEE2E2', color: '#DC2626' },
  { id: 're',  solfege: 'Re', freq: 293.66, bg: '#FFEDD5', color: '#EA580C' },
  { id: 'mi',  solfege: 'Mi', freq: 329.63, bg: '#FEF9C3', color: '#CA8A04' },
  { id: 'fa',  solfege: 'Fa', freq: 349.23, bg: '#DCFCE7', color: '#16A34A' },
  { id: 'so',  solfege: 'So', freq: 392.00, bg: '#DBEAFE', color: '#2563EB' },
  { id: 'la',  solfege: 'La', freq: 440.00, bg: '#EDE9FE', color: '#7C3AED' },
  { id: 'ti',  solfege: 'Ti', freq: 493.88, bg: '#FCE7F3', color: '#DB2777' },
  { id: 'do2', solfege: 'Do', freq: 523.25, bg: '#FEE2E2', color: '#DC2626' },
];
