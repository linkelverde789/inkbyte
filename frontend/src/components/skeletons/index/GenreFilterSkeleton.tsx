export function GenreFilterSkeleton() {
  return (
    <div className="mb-12 flex gap-2 overflow-x-auto pb-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-muted" />
      ))}
    </div>
  );
}
