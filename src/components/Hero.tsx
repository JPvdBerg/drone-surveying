import { COMPANY } from '../data';
import { ArrowIcon, ShieldIcon } from './Icons';

// Local hero asset served from /public (resolves to the GitHub Pages sub-path).
// File lives at public/hero-drone.jpg.
const HERO_IMG = `${import.meta.env.BASE_URL}hero-drone.jpg`;

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
        {/* Left-weighted scrim keeps headline legible while the drone stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        <div className="absolute inset-0 blueprint-grid opacity-40" />
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
          Topographic mapping, construction monitoring, and volumetric analysis,
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
