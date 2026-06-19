import { COMPANY } from '../data';
import { ArrowIcon, ShieldIcon } from './Icons';

// Optimized Unsplash placeholder (aerial survey theme). Width-capped + compressed.
const HERO_IMG =
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=70';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background image + gradient scrim for text contrast (AA compliant). */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/80 to-ink-950" />
        <div className="absolute inset-0 blueprint-grid opacity-60" />
      </div>

      <div className="container-content relative pb-20 pt-28 sm:pb-28 sm:pt-36 lg:pb-36 lg:pt-44">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {COMPANY.tagline}
        </p>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Precision drone surveying for teams that build the real world.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
          Topographic mapping, construction monitoring, and volumetric analysis —
          captured by certified pilots and delivered as survey-grade data your
          engineers can trust.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-600"
          >
            Request a free quote
            <ArrowIcon className="h-5 w-5" />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:bg-white/5"
          >
            Explore services
          </a>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-steel-400">
          <ShieldIcon className="h-5 w-5 text-accent-400" />
          {COMPANY.serviceArea}
        </p>
      </div>
    </section>
  );
}
