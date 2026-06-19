import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FadeIn from './components/FadeIn';

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
