import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Drag-to-reveal before/after comparison slider.
 * - Pointer Events cover mouse + touch + pen with one code path.
 * - The handle is a 48x48 target and is keyboard-operable (role="slider").
 * - The top image is clipped with clip-path so neither image is distorted.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Aerial photo',
  afterLabel = 'Survey data',
}: Props) {
  const [pos, setPos] = useState(50); // reveal position, 0–100 (%)
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  // Track drags anywhere on the page so the cursor can leave the element.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, [setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border border-white/10 sm:aspect-[16/9]"
    >
      {/* Base (after) image fills the frame. */}
      <img
        src={afterSrc}
        alt={afterAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Top (before) image, clipped to the reveal position. */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        loading="lazy"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-ink-950/70 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-steel-200 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-ink-950/70 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-steel-200 backdrop-blur">
        {afterLabel}
      </span>

      {/* Divider line + draggable handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare aerial photo and survey data"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          className="pointer-events-auto absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/30 bg-ink-900/90 text-white shadow-lg backdrop-blur transition-colors hover:bg-ink-800 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
