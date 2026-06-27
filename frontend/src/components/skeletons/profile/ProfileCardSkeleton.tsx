export function ProfileCardSkeleton() {
  return (
    <section className="grid gap-10 bg-card p-7 shadow-[9px_10px_0_var(--color-secondary)] sm:p-10 md:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-start gap-4">
        <div className="size-44 animate-pulse rounded-xl bg-muted" />
        <div className="h-10 w-44 animate-pulse bg-muted" />
      </div>

      <div className="grid content-start gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-20 animate-pulse bg-muted" />
            <div className="h-6 w-40 animate-pulse bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
