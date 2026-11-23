// Priority-ordered list of high-quality British / clear English voices
const GB_VOICE_NAMES = [
  'daniel', 'kate', 'serena', 'oliver',
  'google uk english female', 'google uk english male',
  'microsoft hazel', 'microsoft george', 'microsoft susan',
];

const voicesRef: { list: SpeechSynthesisVoice[] } = { list: [] };

function loadVoices() {
  voicesRef.list = window.speechSynthesis.getVoices();
}

export function initVoices() {
  loadVoices();
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
}

function pickBestEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = voicesRef.list;
  if (!voices.length) return null;
  for (const hint of GB_VOICE_NAMES) {
    const v = voices.find(v => v.name.toLowerCase().includes(hint));
    if (v) return v;
  }
  return voices.find(v => v.lang === 'en-GB') ?? voices.find(v => v.lang.startsWith('en')) ?? null;
}

interface SpeakOptions {
  rate?: number;
  pitch?: number;
}

export function speak(text: string, lang: 'en' | 'mm', opts: SpeakOptions = {}): SpeechSynthesisUtterance | null {
  if (!window.speechSynthesis) return null;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  if (lang === 'en') {
    const voice = pickBestEnglishVoice();
    if (voice) utt.voice = voice;
    utt.lang = voice?.lang ?? 'en-GB';
    utt.rate = opts.rate ?? 0.82;
  } else {
    utt.lang = 'my-MM';
    utt.rate = opts.rate ?? 0.75;
  }
  utt.pitch = opts.pitch ?? 1.0;
  window.speechSynthesis.speak(utt);
  return utt;
}
