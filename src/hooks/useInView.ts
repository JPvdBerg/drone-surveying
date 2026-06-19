import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-once IntersectionObserver hook.
 * Returns a ref to attach and a boolean that flips true the first time the
 * element enters the viewport. Falls back to "visible" when IO is unavailable.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
