import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  /** e.g. "48 hr", "100%", "1 cm", "4K"; the numeric part animates. */
  value: string;
  /** Start counting when this becomes true. */
  active: boolean;
  durationMs?: number;
  /** Stagger the start, in ms. */
  delayMs?: number;
}

/**
 * Counts the numeric part of `value` up from 0 with a requestAnimationFrame
 * loop (easeOutCubic), preserving any prefix/suffix text. Jumps straight to the
 * target for users who prefer reduced motion.
 */
export default function CountUp({ value, active, durationMs = 1600, delayMs = 0 }: Props) {
  const parsed = useMemo(() => {
    const m = value.match(/^(\D*?)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    const [, prefix, num, suffix] = m;
    return {
      prefix,
      suffix,
      target: parseFloat(num),
      decimals: num.includes('.') ? num.split('.')[1].length : 0,
    };
  }, [value]);

  const [n, setN] = useState(0);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!parsed || !active) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(parsed.target);
      return;
    }

    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(parsed.target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, parsed, durationMs, delayMs]);

  if (!parsed) return <>{value}</>;
  return (
    <>
      {parsed.prefix}
      {n.toFixed(parsed.decimals)}
      {parsed.suffix}
    </>
  );
}
