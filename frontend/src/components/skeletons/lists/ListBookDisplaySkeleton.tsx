import { BookDisplaySkeleton } from "./BookDisplaySkeleton";

export function ListBookDisplaySkeleton() {
  return (
    <section className="mt-12 space-y-6">
      {/* header */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse bg-muted" />
          <div className="h-7 w-56 animate-pulse bg-muted" />
        </div>

        <div className="h-8 w-28 animate-pulse rounded bg-muted" />
      </div>

      <DisplayBooksSkeleton />
    </section>
  );
}

function DisplayBooksSkeleton() {
  return (
    <ul className="divide-y divide-border border-y border-border bg-card">
      {Array.from({ length: 5 }).map((_, i) => (
        <BookDisplaySkeleton key={i} index={i} />
      ))}
    </ul>
  );
}
