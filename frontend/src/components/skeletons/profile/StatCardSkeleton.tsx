export function StatCardSkeleton() {
  return (
    <article className="bg-card p-6 shadow-[6px_7px_0_var(--color-secondary)] sm:p-8">
      <div className="flex items-baseline justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse bg-muted" />
          <div className="h-6 w-32 animate-pulse bg-muted" />
        </div>
        <div className="h-8 w-8 animate-pulse bg-muted" />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-[180px_1fr]">
        <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-muted" />

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-3 animate-pulse bg-muted" />
              <div className="h-3 w-24 animate-pulse bg-muted" />
              <div className="ml-auto h-3 w-8 animate-pulse bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
