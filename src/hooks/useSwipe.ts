import { useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }: SwipeHandlers) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const dx = startX.current - e.changedTouches[0].clientX;
    const dy = startY.current - e.changedTouches[0].clientY;
    startX.current = null;
    startY.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 50) dx > 0 ? onSwipeLeft?.() : onSwipeRight?.();
    } else {
      if (Math.abs(dy) > 50) dy > 0 ? onSwipeUp?.() : onSwipeDown?.();
    }
  };

  return { onTouchStart, onTouchEnd };
}
