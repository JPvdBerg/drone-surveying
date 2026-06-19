import { COMPANY } from '../data';
import { ArrowIcon, ShieldIcon } from './Icons';
import { useGyroParallax } from '../hooks/useGyroParallax';
import { tapHaptic } from '../lib/haptics';

// Local hero asset served from /public (resolves to the GitHub Pages sub-path).
// File lives at public/hero-drone.jpg.
const HERO_IMG = `${import.meta.env.BASE_URL}hero-drone.jpg`;

export default function Hero() {
  const tilt = useGyroParallax(12);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background image + gradient scrim for text contrast (AA compliant). */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          width={2000}
          height={2000}
          loading="eager"
          fetchPriority="high"
          // Drone shifts opposite to the tilt; slight scale hides the edges.
          style={{
            transform: `translate3d(${-tilt.x}px, ${-tilt.y}px, 0) scale(1.08)`,
          }}
          className="h-full w-full object-cover transition-transform duration-100 ease-out will-change-transform"
        />
        {/* Left-weighted scrim keeps headline legible while the drone stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        {/* Grid drifts with the tilt at a shallower depth for a layered effect. */}
        <div
          style={{
            transform: `translate3d(${tilt.x * 0.5}px, ${tilt.y * 0.5}px, 0)`,
          }}
          className="absolute inset-0 blueprint-grid opacity-40 transition-transform duration-100 ease-out will-change-transform"
        />
      </div>

      <div className="container-content relative pb-20 pt-28 sm:pb-28 sm:pt-36 lg:pb-36 lg:pt-44">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {COMPANY.tagline}
        </p>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Precision drone surveys and inspections across Gauteng.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
          From rooftops to remote sites, JDHoffman Aerial Solutions delivers field
          surveys, building and tower inspections, and aerial mapping, captured by
          SACAA-certified pilots and delivered as data you can trust. Fast, safe,
          and BVLOS-compliant.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contact"
            onClick={() => tapHaptic()}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-semibold text-ink-950 transition-all duration-200 hover:bg-accent-600 active:scale-95"
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
