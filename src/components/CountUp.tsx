import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  /** e.g. "48 hr", "100%", "1 cm", "4K" — the numeric part animates. */
  value: string;
  /** Start counting when this becomes true. */
  active: boolean;
  durationMs?: number;
}

/**
 * Counts the numeric part of `value` up from 0 with a requestAnimationFrame
 * loop (easeOutCubic), preserving any prefix/suffix text. Jumps straight to the
 * target for users who prefer reduced motion.
 */
export default function CountUp({ value, active, durationMs = 1200 }: Props) {
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

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(parsed.target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, parsed, durationMs]);

  if (!parsed) return <>{value}</>;
  return (
    <>
      {parsed.prefix}
      {n.toFixed(parsed.decimals)}
      {parsed.suffix}
    </>
  );
}
