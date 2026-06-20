import { COMPANY } from '../data';
import { PhoneIcon } from './Icons';
import { tapHaptic } from '../lib/haptics';
import { trackEvent } from '../lib/analytics';

/**
 * Mobile-only click-to-call FAB, stacked just above the WhatsApp button.
 * Many local clients phone first; this makes it a single tap.
 */
export default function CallButton() {
  return (
    <a
      href={COMPANY.phoneHref}
      onClick={() => {
        tapHaptic();
        trackEvent('call_click');
      }}
      aria-label={`Call ${COMPANY.name}`}
      className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-950 shadow-lg shadow-black/40 ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <span className="sr-only">Call now</span>
      <PhoneIcon className="h-6 w-6" strokeWidth={1.8} />
    </a>
  );
}
