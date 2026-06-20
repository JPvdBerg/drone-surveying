export type EventType =
  | 'pageview'
  | 'whatsapp_click'
  | 'call_click'
  | 'quote_click'
  | 'lead_submit';

/**
 * Privacy-respecting, cookieless event logging to Firestore.
 * Stores only a coarse event type + path/referrer + timestamp - no PII, no
 * cross-site identifiers. Fire-and-forget: the Firestore SDK is loaded lazily
 * via dynamic import (kept out of the main bundle), and any failure (e.g.
 * Firestore not yet enabled) is swallowed so it never breaks the UI.
 */
export function trackEvent(type: EventType, meta: Record<string, unknown> = {}): void {
  void import('./store')
    .then(({ logEvent }) => logEvent(type, meta))
    .catch(() => {});
}
