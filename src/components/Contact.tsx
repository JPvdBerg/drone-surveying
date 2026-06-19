import { useState, type FormEvent } from 'react';
import { COMPANY, SERVICES } from '../data';
import { MailIcon, PhoneIcon, ArrowIcon } from './Icons';

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), 'Other / not sure'];

/**
 * Static-host friendly contact form.
 *
 * GitHub Pages can't run server code, so on submit we build a well-structured
 * `mailto:` link (pre-filled subject + body) and hand off to the visitor's
 * email client. To use a hosted handler instead, swap `handleSubmit` for a
 * `fetch` POST to a Formspree endpoint — the field names already match.
 */
export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `Survey enquiry — ${service || 'General'}${name ? ` (${name})` : ''}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Service of interest: ${service || 'Not specified'}`,
      '',
      'Project details:',
      message || '(none provided)',
    ]
      .filter((line) => line !== null)
      .join('\n');

    const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
            Contact
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tell us about your site.
          </p>
          <p className="mt-4 text-lg text-steel-300">
            Send us the basics and we'll come back with a scoped quote, usually
            within one business day.
          </p>

          <ul className="mt-8 flex flex-col gap-4 text-steel-200">
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-3 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-accent-400">
                  <MailIcon className="h-5 w-5" />
                </span>
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-3 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-accent-400">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                {COMPANY.phone}
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8"
        >
          {sent && (
            <p
              role="status"
              className="mb-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-400"
            >
              Your email client should have opened with the message ready to send.
              If it didn't, email us directly at {COMPANY.email}.
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </Field>
            <Field label="Work email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Company" htmlFor="company" optional>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className={inputClass}
              />
            </Field>
            <Field label="Service of interest" htmlFor="service">
              <select id="service" name="service" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select a service…
                </option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Project details" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Location, approximate acreage, timeline, and deliverables you need…"
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-600 sm:w-auto"
          >
            Send enquiry
            <ArrowIcon className="h-5 w-5" />
          </button>
          <p className="mt-3 text-xs text-steel-400">
            Submitting opens your email app with the details pre-filled — nothing
            is sent until you hit send.
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-lg border border-white/15 bg-ink-950 px-4 py-3 text-steel-200 placeholder:text-steel-400 transition-colors focus:border-accent';

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-steel-200">
        {label}
        {optional && <span className="ml-1 text-steel-400">(optional)</span>}
      </span>
      {children}
    </label>
  );
}
