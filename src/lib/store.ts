import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { EventType } from './analytics';

// This module pulls in the (heavy) Firestore SDK, so it is only ever loaded via
// dynamic import() — keeping Firebase out of the critical-path bundle.

export async function logEvent(
  type: EventType,
  meta: Record<string, unknown> = {},
): Promise<void> {
  await addDoc(collection(db, 'events'), {
    type,
    path: typeof location !== 'undefined' ? location.pathname : '/',
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    ts: serverTimestamp(),
    ...meta,
  });
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export async function saveLead(lead: Lead): Promise<void> {
  await addDoc(collection(db, 'leads'), {
    ...lead,
    source: 'website',
    ts: serverTimestamp(),
  });
}
