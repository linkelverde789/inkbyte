export function AddToListSkeleton() {
  return (
    <section className="mt-20 border-t border-border pt-12">
      <div className="mb-8 space-y-2">
        <div className="h-3 w-32 animate-pulse bg-muted" />
        <div className="h-8 w-64 animate-pulse bg-muted" />
        <div className="h-4 w-96 animate-pulse bg-muted" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse border border-border bg-muted"
          />
        ))}
      </div>
    </section>
  );
}
