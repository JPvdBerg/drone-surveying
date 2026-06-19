import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  children: ReactNode;
  /** Optional stagger, in ms. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper: fades and translates its children up
 * (translate-y-8 -> translate-y-0) the first time it enters the viewport.
 * Honours prefers-reduced-motion via Tailwind's motion-reduce variant.
 */
export default function FadeIn({ children, delay = 0, className = '' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}
