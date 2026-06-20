import { COMPANY, WHATSAPP_LINK } from '../data';
import { DroneIcon, FacebookIcon, WhatsAppIcon } from './Icons';

const SOCIAL_LINK =
  'grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-steel-300 transition-colors hover:border-white/30 hover:text-white';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 py-10 pb-28 sm:pb-10">
      <div className="container-content flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950">
            <DroneIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
          </span>
          <span className="font-bold text-white">{COMPANY.name}</span>
        </div>

        {/* Social links */}
        <ul className="flex items-center gap-3">
          <li>
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${COMPANY.name} on Facebook`}
              className={SOCIAL_LINK}
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className={`${SOCIAL_LINK} hover:border-[#25D366]/60 hover:text-[#25D366]`}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>

      <div className="container-content mt-8 flex flex-col gap-3 text-sm text-steel-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY.name}. {COMPANY.serviceArea}.
        </p>
        <nav aria-label="Legal" className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-steel-200">
            Privacy
          </a>
          <a href="/terms" className="hover:text-steel-200">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
