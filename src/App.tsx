import Header from './components/Header';
import Hero from './components/Hero';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FadeIn from './components/FadeIn';

const BASE = import.meta.env.BASE_URL;

export default function App() {
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

        {/* Before/after comparison sits directly below the hero. */}
        <section className="border-t border-white/5 bg-ink-900 py-16 sm:py-20">
          <FadeIn className="container-content">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
              From flight to deliverable
            </h2>
            <p className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Drag to see raw aerial imagery become survey data.
            </p>
            <div className="mt-8">
              <BeforeAfterSlider
                beforeSrc={`${BASE}demo-site-photo.jpg`}
                afterSrc={`${BASE}demo-site-topo.jpg`}
                beforeAlt="Aerial photograph of a survey site."
                afterAlt="Topographic elevation map generated from the aerial survey."
                beforeLabel="Aerial photo"
                afterLabel="Topo map"
              />
            </div>
          </FadeIn>
        </section>

        <FadeIn>
          <Services />
        </FadeIn>
        <FadeIn>
          <Process />
        </FadeIn>
        <FadeIn>
          <WhyUs />
        </FadeIn>
        <FadeIn>
          <Contact />
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
