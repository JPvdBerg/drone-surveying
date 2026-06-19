import { PROCESS } from '../data';

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
            How it works
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A documented, repeatable workflow.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(({ step, title, body }) => (
            <li key={step} className="bg-ink-900 p-6 sm:p-7">
              <span className="font-mono text-sm font-medium text-accent">{step}</span>
              <h3 className="mt-3 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
