import { BookCardSkeleton } from "./BookCardSkeleton";

export function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
