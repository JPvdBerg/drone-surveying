import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import WhatsAppButton from './components/WhatsAppButton';
import CallButton from './components/CallButton';
import FadeIn from './components/FadeIn';
import { SectionSkeleton, FooterSkeleton } from './components/Skeleton';
import { trackEvent } from './lib/analytics';

// Below-the-fold: code-split so they don't block first paint.
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  useEffect(() => {
    // Defer the pageview ping (which lazy-loads Firestore) to browser idle so it
    // never competes with first paint / LCP.
    const fire = () => trackEvent('pageview');
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(fire);
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(fire, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Keyboard/screen-reader skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <FadeIn>
          <Services />
        </FadeIn>
        <FadeIn>
          <Process />
        </FadeIn>
        <FadeIn>
          <WhyUs />
        </FadeIn>
        <Suspense fallback={<SectionSkeleton />}>
          <FadeIn>
            <Contact />
          </FadeIn>
        </Suspense>
      </main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
      <CallButton />
      <WhatsAppButton />
    </>
  );
}
