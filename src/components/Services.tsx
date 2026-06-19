import { SERVICES } from '../data';
import { CheckIcon } from './Icons';

export default function Services() {
  return (
    <section id="services" className="border-t border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
            Services
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One flight. Multiple sources of truth.
          </p>
          <p className="mt-4 text-lg text-steel-300">
            Every engagement is scoped to your deliverables and accuracy
            requirements — no generic data dumps.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, blurb, points }) => (
            <li
              key={title}
              className="group rounded-2xl border border-white/10 bg-ink-800 p-6 transition-colors hover:border-accent/50 sm:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent-400 transition-colors group-hover:bg-accent group-hover:text-ink-950">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <p className="mt-2 leading-relaxed text-steel-300">{blurb}</p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-steel-200">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <CheckIcon className="h-4 w-4 shrink-0 text-accent-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
