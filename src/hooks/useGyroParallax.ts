import { useEffect, useState } from 'react';

interface Offset {
  x: number;
  y: number;
}

/**
 * Mobile-only gyroscope parallax. Listens to DeviceOrientation and returns a
 * small {x, y} offset (in px, clamped to ±max) derived from device tilt.
 *
 * - Disabled on desktop (no coarse pointer) and for prefers-reduced-motion.
 * - On iOS 13+ DeviceOrientation needs permission granted from a user gesture,
 *   so we request it on the first touch and enable only if granted.
 */
export function useGyroParallax(max = 12): Offset {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia;
    const reduce = mq?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = mq?.('(pointer: coarse)').matches;
    if (reduce || !coarse) return;

    let raf = 0;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const handle = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right tilt, ~[-90, 90]
      const beta = e.beta ?? 0; // front/back tilt, ~[-180, 180]
      const x = clamp(gamma / 45) * max;
      const y = clamp((beta - 45) / 45) * max; // 45deg ~ natural hold angle
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset({ x, y }));
    };

    let removeOrientation = () => {};
    const enable = () => {
      window.addEventListener('deviceorientation', handle, true);
      removeOrientation = () =>
        window.removeEventListener('deviceorientation', handle, true);
    };

    // iOS 13+: gated behind a permission prompt that must follow a user gesture.
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    let removeGesture = () => {};
    if (DOE && typeof DOE.requestPermission === 'function') {
      const onFirstTouch = () => {
        DOE.requestPermission?.()
          .then((res) => {
            if (res === 'granted') enable();
          })
          .catch(() => {});
      };
      window.addEventListener('touchend', onFirstTouch, { once: true });
      removeGesture = () => window.removeEventListener('touchend', onFirstTouch);
    } else {
      enable();
    }

    return () => {
      cancelAnimationFrame(raf);
      removeOrientation();
      removeGesture();
    };
  }, [max]);

  return offset;
}
