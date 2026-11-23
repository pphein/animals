import { useEffect, useMemo, useRef, useState } from 'react';
import type { GameItem } from '../data/types';
import { initVoices, speak } from '../lib/speech';
import { playClap, playCompleteFanfare, playFailSound } from '../lib/sfx';
import { useSwipe } from '../hooks/useSwipe';

interface Props {
  categoryId: string;
  items: GameItem[];
  title: string;
  lang: 'en' | 'mm';
  onBack: () => void;
}

interface Target {
  item: GameItem;
  filled: boolean;
}

interface Board {
  targets: Target[];
  tray: GameItem[];
  caseVariant?: 'upper' | 'lower';
}

interface Theme {
  board: string;   // the puzzle board surface (wood / foam / card look)
  frame: string;   // board border colour
  hole: string;    // empty socket fill
  holeBorder: string;
  knobA: string;   // peg knob highlight
  knobB: string;   // peg knob shadow
  tray: string;    // loose-pieces tray background
}

// Visual styling modeled on real peg/foam puzzle toys — a wood board for
// numbers/alphabet, a green foam board for animals, a plain card for shapes.
const THEMES: Record<string, Theme> = {
  animal: {
    board: 'radial-gradient(circle at 28% 18%, rgba(255,255,255,.22), transparent 55%), linear-gradient(160deg, #2bb37e 0%, #0f8a5f 100%)',
    frame: '#0b6b47',
    hole: 'rgba(4,38,24,0.35)',
    holeBorder: 'rgba(255,255,255,0.5)',
    knobA: '#fff7e0',
    knobB: '#b45309',
    tray: 'rgba(255,255,255,0.55)',
  },
  number: {
    board: 'repeating-linear-gradient(100deg, rgba(255,255,255,.4) 0px, rgba(255,255,255,.4) 2px, transparent 2px, transparent 7px), linear-gradient(160deg, #f8edd2 0%, #e7d2a0 100%)',
    frame: '#c9a868',
    hole: 'rgba(120,90,40,0.22)',
    holeBorder: 'rgba(120,90,40,0.4)',
    knobA: '#ffffff',
    knobB: '#c9a868',
    tray: 'rgba(255,255,255,0.65)',
  },
  alphabet: {
    board: 'repeating-linear-gradient(100deg, rgba(255,255,255,.4) 0px, rgba(255,255,255,.4) 2px, transparent 2px, transparent 7px), linear-gradient(160deg, #f8edd2 0%, #e7d2a0 100%)',
    frame: '#c9a868',
    hole: 'rgba(120,90,40,0.22)',
    holeBorder: 'rgba(120,90,40,0.4)',
    knobA: '#ffffff',
    knobB: '#c9a868',
    tray: 'rgba(255,255,255,0.65)',
  },
  shape: {
    board: 'linear-gradient(160deg, #ffffff 0%, #e9edf2 100%)',
    frame: '#cbd2d9',
    hole: 'rgba(30,41,59,0.14)',
    holeBorder: 'rgba(100,116,139,0.4)',
    knobA: '#ffffff',
    knobB: '#94a3b8',
    tray: 'rgba(255,255,255,0.75)',
  },
};
// Colors has no entry here — it falls back to THEMES.shape (see THEMES[categoryId] ?? THEMES.shape
// below), the same plain card used for shapes, since each socket already shows the item's own swatch colour.

const DRAG_THRESHOLD = 6;
const DROP_PADDING = 24;
const MAX_PER_PAGE = 9; // keep each board small enough to fit one screen without scrolling

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Knob({ theme }: { theme: Theme }) {
  return (
    <span
      className="pointer-events-none absolute top-1.5 right-1.5 w-4 h-4 rounded-full"
      style={{
        background: `radial-gradient(circle at 35% 30%, ${theme.knobA}, ${theme.knobB})`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.6)',
      }}
    />
  );
}

// Numbers and the alphabet have one correct sequence — keep them in that
// order (both the board layout and the tray) instead of shuffling, so a
// toddler learns 1-2-3 and A-B-C in the right order rather than scrambled.
const ORDERED_CATEGORIES = new Set(['number', 'alphabet']);

export function PuzzleBoard({ categoryId, items, title, lang, onBack }: Props) {
  const theme = THEMES[categoryId] ?? THEMES.shape;
  const keepOrder = ORDERED_CATEGORIES.has(categoryId);
  // Colors puzzle is a colour-matching game — the empty socket shows the
  // target's own colour (instead of a plain grey hole) so a toddler can
  // match pieces by colour alone, without needing to read the label.
  const isColor = categoryId === 'color';
  // Alphabet and number boards show the plain bold glyph (letter or digit,
  // like the real wooden peg puzzles) instead of an unrelated object picture —
  // each glyph gets its own bold rainbow colour (stable per item, not per
  // page) instead of plain grey.
  const isAlphabet = categoryId === 'alphabet';
  const isNumber   = categoryId === 'number';
  const useGlyphIcons = isAlphabet || isNumber;
  const glyphColors = useMemo(() => {
    const palette = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899'];
    const map: Record<string, string> = {};
    items.forEach((it, i) => { map[it.id] = palette[i % palette.length]; });
    return map;
  }, [items]);
  // Numbers' nameEn is the spelled word ("One") — the board glyph needs the
  // digit itself, derived from each item's position (numbers.ts is 1..N in order).
  const glyphText = useMemo(() => {
    const map: Record<string, string> = {};
    items.forEach((it, i) => { map[it.id] = isNumber ? String(i + 1) : it.nameEn; });
    return map;
  }, [items, isNumber]);
  // Alphabet glyphs are case-specific per board (see buildPages): the same
  // letter id ('a') renders as "A" on capital-letter boards, "a" on lowercase ones.
  const alphabetGlyph = (item: GameItem, caseVariant?: 'upper' | 'lower') =>
    caseVariant === 'lower' ? item.id : item.id.toUpperCase();
  // Alphabet glyphs are two characters ("Aa") — a touch smaller than a lone digit
  // so wide pairs like "Mm"/"Ww" still fit comfortably in the piece/socket.
  const glyphSizeClass = isAlphabet ? 'text-4xl' : 'text-5xl';

  // Split a large category into several screen-sized boards — balanced evenly
  // rather than one giant board, since e.g. animals (38 items) or the
  // alphabet (26) can't all fit on one screen. Swipe left/right between them.
  const buildBoard = (group: GameItem[], caseVariant?: 'upper' | 'lower'): Board => ({
    targets: (keepOrder ? group.slice() : shuffle(group)).map(item => ({ item, filled: false })),
    tray: keepOrder ? group.slice() : shuffle(group),
    caseVariant,
  });

  const buildPages = (): Board[] => {
    const pool = keepOrder ? items.slice() : shuffle(items);
    const pageCount = Math.max(1, Math.ceil(items.length / MAX_PER_PAGE));
    const perPage = Math.ceil(items.length / pageCount);
    const groups: GameItem[][] = [];
    for (let i = 0; i < pool.length; i += perPage) groups.push(pool.slice(i, i + perPage));

    // Alphabet gets two full passes through A-Z — all capital-letter boards,
    // then all lowercase-letter boards — so toddlers practice one case at a
    // time instead of mixed "Aa" pairs.
    if (isAlphabet) {
      return [
        ...groups.map(group => buildBoard(group, 'upper')),
        ...groups.map(group => buildBoard(group, 'lower')),
      ];
    }

    return groups.map(group => buildBoard(group));
  };

  const [pages, setPages]     = useState<Board[]>(() => buildPages());
  const [pageIndex, setPageIndex] = useState(0);
  const [slideClass, setSlide]    = useState('slide-from-right');
  const [animKey, setAnimKey]     = useState(0);
  const [dragId, setDragId]   = useState<string | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [missIndex, setMissIndex] = useState<number | null>(null);

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startPos    = useRef({ x: 0, y: 0 });
  const grabOffset  = useRef({ x: 0, y: 0 });
  const moved       = useRef(false);

  useEffect(() => initVoices(), []);

  const board = pages[pageIndex];
  const placedCount   = board.targets.filter(t => t.filled).length;
  const boardComplete = placedCount === board.targets.length;
  const allComplete   = pages.every(p => p.targets.every(t => t.filled));
  const totalPlaced   = pages.reduce((sum, p) => sum + p.targets.filter(t => t.filled).length, 0);
  const totalTargets  = pages.reduce((sum, p) => sum + p.targets.length, 0);

  useEffect(() => {
    if (boardComplete) playCompleteFanfare();
  }, [boardComplete]);

  const label = (item: GameItem) => (lang === 'en' ? item.nameEn : item.nameMm);

  const navigate = (next: number, slideFrom: string) => {
    setSlide(slideFrom);
    setAnimKey(k => k + 1);
    setPageIndex(next);
  };
  const goNextPage = () => { if (pageIndex < pages.length - 1) navigate(pageIndex + 1, 'slide-from-left'); };
  const goPrevPage = () => { if (pageIndex > 0) navigate(pageIndex - 1, 'slide-from-right'); };
  const swipe = useSwipe({ onSwipeLeft: goNextPage, onSwipeRight: goPrevPage });

  const handlePlayAgain = () => {
    setPages(buildPages());
    navigate(0, 'slide-from-right');
  };

  const handleNextOrReplay = () => {
    if (allComplete) handlePlayAgain();
    else navigate((pageIndex + 1) % pages.length, 'slide-from-left');
  };

  const handlePointerDown = (e: React.PointerEvent, item: GameItem) => {
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    grabOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    startPos.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    setDragId(item.id);
    setPointerPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent, item: GameItem) => {
    if (dragId !== item.id) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) moved.current = true;
    setPointerPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent, item: GameItem) => {
    if (dragId !== item.id) return;

    if (!moved.current) {
      // Tap (no real drag) — just speak the name as a hint.
      speak(label(item), lang);
      setDragId(null);
      return;
    }

    const point = { x: e.clientX, y: e.clientY };
    let hitIndex = -1;
    targetRefs.current.forEach((el, i) => {
      if (!el || i >= board.targets.length || board.targets[i].filled) return;
      const r = el.getBoundingClientRect();
      if (
        point.x >= r.left - DROP_PADDING && point.x <= r.right + DROP_PADDING &&
        point.y >= r.top - DROP_PADDING && point.y <= r.bottom + DROP_PADDING
      ) {
        hitIndex = i;
      }
    });

    if (hitIndex >= 0 && board.targets[hitIndex].item.id === item.id) {
      setPages(prev => prev.map((p, pi) => pi !== pageIndex ? p : {
        targets: p.targets.map((t, i) => (i === hitIndex ? { ...t, filled: true } : t)),
        tray: p.tray.filter(it => it.id !== item.id),
      }));
      playClap();
      setTimeout(() => {
        const utt = speak('You are correct!', 'en');
        if (utt) utt.onend = utt.onerror = () => speak(label(item), lang);
      }, 500);
    } else if (hitIndex >= 0) {
      playFailSound();
      setTimeout(() => speak('Oops, try again!', 'en'), 500);
      setMissIndex(hitIndex);
      setTimeout(() => setMissIndex(null), 400);
    }

    setDragId(null);
  };

  const gridCols = useMemo(() => {
    const n = board.targets.length;
    return Math.min(5, Math.max(3, Math.ceil(Math.sqrt(n))));
  }, [board.targets.length]);

  const draggedItem = dragId ? board.tray.find(p => p.id === dragId) ?? null : null;
  const swipeHandlers = dragId ? undefined : swipe;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col select-none" {...swipeHandlers}>
      <header className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back to home"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow text-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">{title} Puzzle</h1>
            <p className="text-xs text-gray-400">
              Board {pageIndex + 1} of {pages.length}
              {board.caseVariant ? ` · ${board.caseVariant === 'upper' ? 'Capital Letters' : 'lowercase letters'}` : ''}
              {' '}· {totalPlaced} of {totalTargets} placed
            </p>
          </div>
        </div>
        {pages.length > 1 && (
          <div className="flex gap-1">
            {pages.map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: i === pageIndex ? '#6366f1' : '#c7d2fe' }}
              />
            ))}
          </div>
        )}
      </header>

      <div key={animKey} className={`flex-1 min-h-0 flex flex-col ${slideClass}`}>
        <div className="relative flex-1 min-h-0 overflow-y-auto px-4 pb-4 flex flex-col gap-3" style={{ zIndex: 0 }}>
          {/* Board — die-cut sockets for this page's items, styled after the real puzzle board. Stays the lowest layer. */}
          <div
            className="relative rounded-[2rem] p-4 shrink-0 shadow-xl"
            style={{ background: theme.board, border: `6px solid ${theme.frame}`, zIndex: 0 }}
          >
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
              {board.targets.map((target, i) => (
                <div
                  key={`${target.item.id}-${target.filled}`}
                  ref={el => { targetRefs.current[i] = el; }}
                  onClick={() => !target.filled && speak(label(target.item), lang)}
                  aria-label={`${label(target.item)} socket`}
                  className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl w-24 h-24 mx-auto cursor-pointer transition-colors ${missIndex === i ? 'shake-no' : ''}`}
                  style={
                    target.filled
                      ? {
                          backgroundColor: useGlyphIcons ? '#fffdf7' : target.item.bg,
                          boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.4)',
                        }
                      : isColor
                      ? {
                          backgroundColor: missIndex === i ? 'rgba(244,63,94,0.35)' : target.item.bg,
                          boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.18), inset 0 0 0 2px rgba(100,116,139,0.3)',
                        }
                      : {
                          backgroundColor: missIndex === i ? 'rgba(244,63,94,0.35)' : theme.hole,
                          boxShadow: `inset 0 4px 10px rgba(0,0,0,0.35), inset 0 0 0 2px ${theme.holeBorder}`,
                        }
                  }
                >
                  {!target.filled && <Knob theme={theme} />}
                  {useGlyphIcons ? (
                    <span
                      className={`font-extrabold leading-none ${glyphSizeClass} ${target.filled ? 'pop-in' : ''}`}
                      style={{ color: target.filled ? glyphColors[target.item.id] : 'rgba(255,255,255,0.85)' }}
                    >
                      {isAlphabet ? alphabetGlyph(target.item, board.caseVariant) : glyphText[target.item.id]}
                    </span>
                  ) : (
                    <span className={`text-4xl leading-none ${target.filled || isColor ? 'pop-in' : 'opacity-40 grayscale'}`}>
                      {target.item.emoji}
                    </span>
                  )}
                  {!isAlphabet && (
                    <span className={`text-[10px] font-semibold text-center ${target.filled || isColor ? 'text-gray-700' : 'text-white/80'}`}>
                      {label(target.item)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tray — this page's loose pieces waiting to be placed */}
          <div
            className="relative rounded-[2rem] p-4 shrink-0 flex flex-col"
            style={{ backgroundColor: theme.tray, zIndex: 0 }}
          >
            <p className="text-xs text-gray-500 mb-2 shrink-0 font-medium">Drag each piece onto its matching spot</p>
            <div className="flex flex-wrap items-start justify-center gap-3">
              {board.tray.map(item => (
                <div
                  key={item.id}
                  onPointerDown={(e) => handlePointerDown(e, item)}
                  onPointerMove={(e) => handlePointerMove(e, item)}
                  onPointerUp={(e) => handlePointerUp(e, item)}
                  onPointerCancel={() => setDragId(null)}
                  aria-label={`${label(item)} piece`}
                  style={{
                    backgroundColor: useGlyphIcons ? '#fffdf7' : item.bg,
                    touchAction: 'none',
                    opacity: dragId === item.id ? 0 : 1,
                    boxShadow: '0 4px 0 rgba(0,0,0,0.18), 0 8px 14px rgba(0,0,0,0.22), inset 0 2px 3px rgba(255,255,255,0.5)',
                  }}
                  className="relative flex flex-col items-center justify-center gap-1 rounded-2xl w-20 h-20 cursor-grab active:cursor-grabbing"
                >
                  <Knob theme={theme} />
                  {useGlyphIcons ? (
                    <span className={`font-extrabold leading-none ${glyphSizeClass} pointer-events-none`} style={{ color: glyphColors[item.id] }}>{isAlphabet ? alphabetGlyph(item, board.caseVariant) : glyphText[item.id]}</span>
                  ) : (
                    <span className="text-4xl leading-none pointer-events-none">{item.emoji}</span>
                  )}
                  {!isAlphabet && (
                    <span className="text-[10px] font-semibold text-gray-700 pointer-events-none">{label(item)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drag ghost — a fixed-position layer so the piece can never be clipped by,
          or stack beneath, the board/tray panels while being dragged over them. */}
      {draggedItem && (
        <div
          style={{
            position: 'fixed',
            left: pointerPos.x - grabOffset.current.x,
            top: pointerPos.y - grabOffset.current.y,
            width: 80,
            height: 80,
            zIndex: 1000,
            pointerEvents: 'none',
            backgroundColor: useGlyphIcons ? '#fffdf7' : draggedItem.bg,
            boxShadow: '0 16px 28px rgba(0,0,0,0.35)',
            transform: 'scale(1.15)',
          }}
          className="relative rounded-2xl flex flex-col items-center justify-center gap-1"
        >
          <Knob theme={theme} />
          {useGlyphIcons ? (
            <span className={`font-extrabold leading-none ${glyphSizeClass}`} style={{ color: glyphColors[draggedItem.id] }}>{isAlphabet ? alphabetGlyph(draggedItem, board.caseVariant) : glyphText[draggedItem.id]}</span>
          ) : (
            <span className="text-4xl leading-none">{draggedItem.emoji}</span>
          )}
          {!isAlphabet && (
            <span className="text-[10px] font-semibold text-gray-700">{label(draggedItem)}</span>
          )}
        </div>
      )}

      {boardComplete && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="pop-in bg-white rounded-3xl shadow-2xl px-10 py-10 flex flex-col items-center gap-4">
            <p className="text-6xl">🎉</p>
            <p className="text-2xl font-bold text-gray-800">Great job!</p>
            <button
              onClick={handleNextOrReplay}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-6 py-2.5 rounded-full shadow transition-colors cursor-pointer"
            >
              {allComplete ? 'Play Again 🔄' : 'Next Board ➡️'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
