import { Component, type ErrorInfo, type ReactNode } from 'react';
import { COMPANY } from '../data';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * App-level error boundary. Catches render-time crashes (e.g. on an old mobile
 * browser out in the field) so the visitor sees a recovery screen with our
 * contact details instead of a blank page, and we never silently lose a lead.
 *
 * To wire up Sentry later: `npm i @sentry/react`, init it in main.tsx, and
 * forward the error from componentDidCatch (see the marked line below).
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep a trace in the console for now.
    console.error('App crash captured by ErrorBoundary:', error, info);
    // Sentry hook point:  Sentry.captureException(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white">Something went wrong.</h1>
          <p className="mt-3 text-steel-300">
            Sorry, the page hit an unexpected error. Please reload, or reach us
            directly and we'll help straight away.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent px-7 font-semibold text-ink-950 transition-colors hover:bg-accent-600"
            >
              Reload page
            </button>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/20 px-7 font-semibold text-white transition-colors hover:bg-white/5"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    );
  }
}
