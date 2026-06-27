export function WeekMultipleTopSelectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-9 gap-y-16 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[3/4] animate-pulse bg-muted" />

          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

          <div className="flex justify-between border-t border-border pt-4">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
