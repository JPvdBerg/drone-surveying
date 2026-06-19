import { WHATSAPP_LINK } from '../data';
import { WhatsAppIcon } from './Icons';

/**
 * Floating "Chat on WhatsApp" action button.
 * - Fixed bottom-right, respects iOS safe-area insets.
 * - 56px target on mobile / 64px on desktop (well above the 48px minimum).
 * - z-40 keeps it under the header's mobile menu overlay (z-50).
 */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
