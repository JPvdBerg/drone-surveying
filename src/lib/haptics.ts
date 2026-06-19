/**
 * Fire a tiny haptic "click" via the Vibration API.
 * No-ops where unsupported (iOS Safari, desktop) so callers can fire freely.
 */
export function tapHaptic(pattern: number | number[] = 10): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* some browsers throw if called outside a user gesture; ignore */
    }
  }
}
