/**
 * Lightweight Tailwind animate-pulse placeholders shown inside <Suspense>
 * while a lazy-loaded chunk is fetched. Reserving height avoids layout shift.
 */
export function SectionSkeleton() {
  return (
    <div className="container-content py-20 sm:py-28" aria-hidden="true">
      <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
      <div className="mt-4 h-9 w-2/3 max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-44 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-44 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <div className="border-t border-white/10 py-10" aria-hidden="true">
      <div className="container-content h-8 w-48 animate-pulse rounded bg-white/10" />
    </div>
  );
}
