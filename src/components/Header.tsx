import { useEffect, useState } from 'react';
import { COMPANY } from '../data';
import { DroneIcon, MenuIcon, CloseIcon } from './Icons';
import { tapHaptic } from '../lib/haptics';

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#why', label: 'Why us' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 print:hidden ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-steel-200"
          aria-label={`${COMPANY.name}, home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-ink-950">
            <DroneIcon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white">
            {COMPANY.name}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-steel-300">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => tapHaptic()}
                className="inline-flex items-center rounded-md bg-accent px-4 py-2 font-semibold text-ink-950 transition-colors hover:bg-accent-600"
              >
                Request a quote
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu toggle (44px touch target) */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => {
            tapHaptic();
            setOpen((v) => !v);
          }}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="container-content pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1 text-base font-medium">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  className="flex min-h-[48px] items-center rounded-lg px-3 text-steel-200 hover:bg-white/5 hover:text-white"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => {
                  tapHaptic();
                  setOpen(false);
                }}
                className="flex min-h-[48px] items-center justify-center rounded-lg bg-accent px-4 font-semibold text-ink-950"
              >
                Request a quote
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
