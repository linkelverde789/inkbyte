export function BookDisplaySkeleton({ index }: { index: number }) {
  return (
    <li className="grid grid-cols-[60px_88px_1fr_auto] items-center gap-4 p-4 sm:gap-6 sm:p-5">
      {/* index */}
      <div className="h-6 w-8 animate-pulse bg-muted" />

      {/* image */}
      <div className="aspect-[3/4] w-[88px] animate-pulse bg-muted" />

      {/* text */}
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse bg-muted" />
        <div className="h-5 w-48 animate-pulse bg-muted" />
        <div className="h-3 w-40 animate-pulse bg-muted" />

        <div className="flex gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-3 animate-pulse bg-muted" />
          ))}
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <div className="h-8 w-20 animate-pulse bg-muted" />
        <div className="h-8 w-8 animate-pulse bg-muted" />
      </div>
    </li>
  );
}
