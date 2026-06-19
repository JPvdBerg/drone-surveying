import { COMPANY } from '../data';
import { DroneIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 py-10">
      <div className="container-content flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950">
            <DroneIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
          </span>
          <span className="font-bold text-white">{COMPANY.name}</span>
        </div>
        <p className="text-sm text-steel-400">
          © {new Date().getFullYear()} {COMPANY.name}. {COMPANY.serviceArea}.
        </p>
      </div>
    </footer>
  );
}
