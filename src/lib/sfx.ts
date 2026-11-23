// Small cartoon-style sound effects, synthesized with the Web Audio API.
// No external audio files — avoids licensing concerns and keeps the PWA
// fully offline-capable with nothing extra to cache.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

interface ToneOptions {
  freq: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  glideTo?: number;
}

function tone(c: AudioContext, { freq, start, duration, type = 'triangle', gain = 0.22, glideTo }: ToneOptions) {
  const osc  = c.createOscillator();
  const gainNode = c.createGain();
  const t0 = c.currentTime + start;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);

  gainNode.gain.setValueAtTime(0.0001, t0);
  gainNode.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gainNode).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** Bigger fanfare for finishing the whole board. */
export function playCompleteFanfare() {
  const c = getCtx();
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) =>
    tone(c, { freq, start: i * 0.1, duration: 0.3, gain: 0.24 })
  );
  [1046.5, 1318.5, 1568].forEach(freq =>
    tone(c, { freq, start: 0.55, duration: 0.6, type: 'sine', gain: 0.15 })
  );
}

function noiseBuffer(c: AudioContext, duration: number): AudioBuffer {
  const length = Math.max(1, Math.floor(c.sampleRate * duration));
  const buffer = c.createBuffer(1, length, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function clapHit(c: AudioContext, start: number) {
  const t0 = c.currentTime + start;
  const noise = c.createBufferSource();
  noise.buffer = noiseBuffer(c, 0.12);

  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.5, t0 + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);

  noise.connect(filter).connect(gain).connect(c.destination);
  noise.start(t0);
  noise.stop(t0 + 0.13);
}

/** A short round of applause for a correct puzzle placement. */
export function playClap() {
  const c = getCtx();
  [0, 0.15, 0.3].forEach(start => clapHit(c, start));
}

/** A clear (but not scary) "incorrect" buzzer for a wrong drop. */
export function playFailSound() {
  const c = getCtx();
  tone(c, { freq: 220, start: 0,    duration: 0.22, type: 'sawtooth', gain: 0.22, glideTo: 180 });
  tone(c, { freq: 180, start: 0.18, duration: 0.3,  type: 'sawtooth', gain: 0.22, glideTo: 110 });
}

/** A single piano-ish key press — a fundamental tone plus a soft octave overtone. */
export function playPianoNote(freq: number) {
  const c = getCtx();
  tone(c, { freq,         start: 0, duration: 0.7, type: 'sine',     gain: 0.26 });
  tone(c, { freq: freq * 2, start: 0, duration: 0.4, type: 'triangle', gain: 0.08 });
}

/**
 * A playful cartoon "creature" sound in place of a spoken onomatopoeia —
 * a quick up-down boing/squeak, pitched by the item's existing `pitch` value
 * so e.g. a mouse squeaks high and an elephant honks low.
 */
export function playCreatureSound(pitch = 1) {
  const c = getCtx();
  const base = 200 * pitch;
  tone(c, { freq: base, start: 0,    duration: 0.2,  type: 'sawtooth', gain: 0.2, glideTo: base * 1.7 });
  tone(c, { freq: base * 1.7, start: 0.16, duration: 0.16, type: 'triangle', gain: 0.14, glideTo: base * 1.2 });
}
