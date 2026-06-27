export function BookCardSkeleton() {
  return (
    <article className="flex flex-col gap-4 bg-card p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
      <div className="aspect-[3/4] w-full shrink-0 animate-pulse bg-muted sm:w-32 md:w-40" />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded bg-muted" />
          <div className="h-5 w-20 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 animate-pulse rounded bg-muted" />
          ))}
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </article>
  );
}
