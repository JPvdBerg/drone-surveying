import { useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import { app, db } from '../lib/firebase';

// Mirror of firestore.rules: only these accounts can read the data.
const ALLOWED = ['drunknine323@gmail.com', 'divviej1@gmail.com'];

const auth = getAuth(app);

interface EventDoc {
  id: string;
  type: string;
  path?: string;
  referrer?: string | null;
  service?: string;
  ts?: Timestamp | null;
}
interface LeadDoc {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  ts?: Timestamp | null;
}

const EVENT_TYPES = [
  { key: 'pageview', label: 'Page views' },
  { key: 'quote_click', label: 'Quote clicks' },
  { key: 'whatsapp_click', label: 'WhatsApp clicks' },
  { key: 'call_click', label: 'Call clicks' },
  { key: 'lead_submit', label: 'Lead submits' },
];

function timeAgo(ts?: Timestamp | null): string {
  if (!ts) return 'just now';
  const s = Math.floor((Date.now() - ts.toDate().getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState('');
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [leads, setLeads] = useState<LeadDoc[]>([]);

  const allowed = !!user?.email && ALLOWED.includes(user.email);

  useEffect(() => onAuthStateChanged(auth, (u) => {
    setUser(u);
    setAuthReady(true);
  }), []);

  // Live subscriptions, only once a permitted user is signed in.
  useEffect(() => {
    if (!allowed) return;
    const unsubE = onSnapshot(
      query(collection(db, 'events'), orderBy('ts', 'desc'), limit(2000)),
      (snap) => setEvents(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<EventDoc, 'id'>) }))),
      () => {},
    );
    const unsubL = onSnapshot(
      query(collection(db, 'leads'), orderBy('ts', 'desc'), limit(200)),
      (snap) => setLeads(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LeadDoc, 'id'>) }))),
      () => {},
    );
    return () => {
      unsubE();
      unsubL();
    };
  }, [allowed]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of events) c[e.type] = (c[e.type] ?? 0) + 1;
    return c;
  }, [events]);

  const week = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (6 - i));
      return { t: d.getTime(), label: d.toLocaleDateString(undefined, { weekday: 'short' }), count: 0 };
    });
    for (const e of events) {
      if (e.type !== 'pageview' || !e.ts) continue;
      const d = e.ts.toDate();
      d.setHours(0, 0, 0, 0);
      const day = days.find((x) => x.t === d.getTime());
      if (day) day.count++;
    }
    return days;
  }, [events]);

  async function signIn() {
    setAuthError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Sign-in failed.');
    }
  }

  // --- Gates ---
  if (!authReady) {
    return <Centered>Loading…</Centered>;
  }

  if (!user) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold text-white">Analytics dashboard</h1>
        <p className="mt-2 text-steel-300">Sign in with the owner Google account.</p>
        <button
          type="button"
          onClick={signIn}
          className="mt-6 inline-flex min-h-[48px] items-center rounded-lg bg-accent px-6 font-semibold text-ink-950 hover:bg-accent-600"
        >
          Sign in with Google
        </button>
        {authError && <p className="mt-4 max-w-sm text-sm text-red-400">{authError}</p>}
      </Centered>
    );
  }

  if (!allowed) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold text-white">Not authorised</h1>
        <p className="mt-2 max-w-sm text-steel-300">
          {user.email} doesn't have access to this dashboard.
        </p>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="mt-6 rounded-lg border border-white/20 px-6 py-2 font-semibold text-white hover:bg-white/5"
        >
          Sign out
        </button>
      </Centered>
    );
  }

  const leadEvents = counts['lead_submit'] ?? 0;
  const pageviews = counts['pageview'] ?? 0;
  const conv = pageviews ? ((leadEvents / pageviews) * 100).toFixed(1) : '0.0';
  const maxType = Math.max(1, ...EVENT_TYPES.map((t) => counts[t.key] ?? 0));
  const maxDay = Math.max(1, ...week.map((d) => d.count));

  return (
    <div className="min-h-screen bg-ink-950 text-steel-200">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-green-400/70" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
            </span>
            <h1 className="font-bold text-white">Analytics · Live</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-steel-400 sm:inline">{user.email}</span>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="rounded-md border border-white/15 px-3 py-1.5 text-steel-200 hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Page views" value={pageviews} />
          <Stat label="Quote clicks" value={counts['quote_click'] ?? 0} />
          <Stat label="WhatsApp" value={counts['whatsapp_click'] ?? 0} />
          <Stat label="Calls" value={counts['call_click'] ?? 0} />
          <Stat label="Leads" value={leads.length} accent />
          <Stat label="Conversion" value={`${conv}%`} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left: charts */}
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
              Events by type
            </h2>
            <ul className="mt-4 space-y-3">
              {EVENT_TYPES.map((t) => {
                const n = counts[t.key] ?? 0;
                return (
                  <li key={t.key}>
                    <div className="flex justify-between text-sm">
                      <span>{t.label}</span>
                      <span className="font-semibold text-white">{n}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-white/5">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${(n / maxType) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-10 font-mono text-xs uppercase tracking-widest text-accent-400">
              Page views · last 7 days
            </h2>
            <div className="mt-4 flex h-40 items-end gap-2">
              {week.map((d) => (
                <div key={d.t} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-accent/70"
                      style={{ height: `${(d.count / maxDay) * 100}%` }}
                      title={`${d.count} views`}
                    />
                  </div>
                  <span className="text-xs text-steel-400">{d.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: leads + activity */}
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-400">
              Recent leads ({leads.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {leads.length === 0 && <li className="text-sm text-steel-400">No leads yet.</li>}
              {leads.slice(0, 8).map((l) => (
                <li key={l.id} className="rounded-lg border border-white/10 bg-ink-900 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{l.name || 'Unknown'}</span>
                    <span className="text-xs text-steel-400">{timeAgo(l.ts)}</span>
                  </div>
                  <div className="mt-1 text-steel-300">
                    {l.email}
                    {l.phone ? ` · ${l.phone}` : ''}
                  </div>
                  {l.service && <div className="text-steel-400">{l.service}</div>}
                  {l.message && <p className="mt-1 text-steel-400">{l.message}</p>}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-mono text-xs uppercase tracking-widest text-accent-400">
              Recent activity
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {events.slice(0, 12).map((e) => (
                <li key={e.id} className="flex items-center justify-between">
                  <span className="text-steel-300">{e.type}</span>
                  <span className="text-xs text-steel-500">{timeAgo(e.ts)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center text-steel-200">
      <div>{children}</div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-900 p-4">
      <div className={`text-2xl font-extrabold ${accent ? 'text-accent' : 'text-white'}`}>{value}</div>
      <div className="mt-1 text-xs text-steel-400">{label}</div>
    </div>
  );
}
