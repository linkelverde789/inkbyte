export function RelatedShelfSkeleton() {
  return (
    <section className="mt-20 border-t border-border pt-12">
      <div className="mb-8 space-y-2">
        <div className="h-3 w-40 animate-pulse bg-muted" />
        <div className="h-8 w-64 animate-pulse bg-muted" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[3/4] animate-pulse bg-muted shadow-[6px_6px_0_var(--color-secondary)]" />
            <div className="h-3 w-24 animate-pulse bg-muted" />
            <div className="h-5 w-40 animate-pulse bg-muted" />
            <div className="h-4 w-32 animate-pulse bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
