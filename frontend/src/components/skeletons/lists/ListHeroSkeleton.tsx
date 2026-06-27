export function ListHeroSkeleton() {
  return (
    <header className="grid gap-8 bg-card p-7 shadow-[9px_10px_0_var(--color-secondary)] sm:p-10 md:grid-cols-[260px_1fr]">
      {/* cover */}
      <div className="aspect-square w-full animate-pulse bg-muted" />

      {/* content */}
      <div className="flex flex-col justify-center space-y-4">
        <div className="h-3 w-40 animate-pulse bg-muted" />

        <div className="h-10 w-72 animate-pulse bg-muted" />

        <div className="h-4 w-full max-w-md animate-pulse bg-muted" />
        <div className="h-4 w-5/6 animate-pulse bg-muted" />

        <div className="flex gap-3 pt-4">
          <div className="h-9 w-24 animate-pulse rounded bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </header>
  );
}
