import { STATS, SERVICE_AREA } from '../data';
import { CheckIcon } from './Icons';
import CountUp from './CountUp';
import { useInView } from '../hooks/useInView';

const REASONS = [
  'Licensed SACAA remote pilots (RPL) on every flight',
  'RTK/PPK workflows for verifiable, survey-grade accuracy',
  'Fully insured operations with documented safety procedures',
  'Deliverables in the CAD & GIS formats your stack expects',
];

export default function WhyUs() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDListElement>();

  return (
    <section
      id="why"
      className="border-y border-white/5 bg-ink-900 py-20 sm:py-28"
    >
      <div className="container-content grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
            Why teams choose us
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built on precision, accountability, and speed.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {REASONS.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-400">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-steel-200">{reason}</span>
              </li>
            ))}
          </ul>

          {/* Local service area: plain text aids local SEO and sets expectations. */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-ink-800 p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent-400">
              Service area
            </h3>
            <p className="mt-3 text-steel-200">
              Based in {SERVICE_AREA.hub}, we cover a {SERVICE_AREA.radius} that
              includes:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SERVICE_AREA.regions.map((region) => (
                <li
                  key={region}
                  className="rounded-full border border-white/10 bg-ink-900 px-3 py-1 text-sm text-steel-300"
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl ref={statsRef} className="grid grid-cols-2 gap-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-ink-800 p-6"
            >
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-4xl font-extrabold tracking-tight text-white">
                  <CountUp value={value} active={statsInView} />
                </span>
                <span className="mt-2 block text-sm text-steel-300">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
