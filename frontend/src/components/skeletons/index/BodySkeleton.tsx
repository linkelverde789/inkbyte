export function BodySkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      {/* Header skeleton */}
      <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      </div>

      {/* Genre filter skeleton */}
      <div className="mb-12 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-x-9 gap-y-16 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[3/4] animate-pulse bg-muted shadow-[16px_18px_0_var(--color-secondary)]" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-6 w-full animate-pulse border-t border-border pt-4" />
          </div>
        ))}
      </div>
    </section>
  );
}
