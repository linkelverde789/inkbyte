export function MainBookSkeleton() {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-16">
      {/* Cover */}
      <div className="aspect-[3/4] animate-pulse bg-muted shadow-[14px_16px_0_var(--color-secondary)]" />

      {/* Content */}
      <article className="flex flex-col justify-center gap-5">
        <div className="h-3 w-32 animate-pulse bg-muted" /> {/* genres */}
        <div className="h-12 w-3/4 animate-pulse bg-muted" /> {/* title */}
        <div className="h-5 w-1/2 animate-pulse bg-muted" /> {/* authors */}
        <div className="h-5 w-40 animate-pulse bg-muted" /> {/* rating */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse bg-muted" />
          <div className="h-4 w-5/6 animate-pulse bg-muted" />
          <div className="h-4 w-2/3 animate-pulse bg-muted" />
        </div>
        <div className="h-10 w-full animate-pulse bg-muted" /> {/* formats */}
        <div className="mt-8 h-10 w-40 animate-pulse bg-muted" /> {/* button */}
      </article>
    </div>
  );
}
