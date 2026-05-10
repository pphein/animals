export interface GameItem {
  id: string;
  nameEn: string;
  nameMm: string;
  emoji: string;
  bg: string;
  sound: string;
  pitch?: number;
  taste?: string;       // e.g. "sweet", "sour" — shown/spoken on emoji tap for fruits
  tasteEmoji?: string;  // e.g. "🍯"
}
