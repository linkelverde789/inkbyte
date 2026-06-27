import { StatCardSkeleton } from "./StatCardSkeleton";

export function UserStatsSkeleton() {
  return (
    <section>
      <div className="space-y-2">
        <div className="h-3 w-48 animate-pulse bg-muted" />
        <div className="h-8 w-72 animate-pulse bg-muted" />
        <div className="h-4 w-full max-w-md animate-pulse bg-muted" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
