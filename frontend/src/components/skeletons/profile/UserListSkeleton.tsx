export function UserListsSkeleton() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-28 animate-pulse bg-muted" />
          <div className="h-8 w-48 animate-pulse bg-muted" />
        </div>

        <div className="h-10 w-32 animate-pulse bg-muted" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[260px] animate-pulse border border-border bg-card"
          />
        ))}

        <div className="min-h-[260px] animate-pulse border-2 border-dashed border-border bg-card/50" />
      </div>
    </section>
  );
}
