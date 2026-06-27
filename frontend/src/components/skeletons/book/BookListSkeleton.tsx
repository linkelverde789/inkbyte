import { BookCardSkeleton } from "../search/BookCardSkeleton";

export function BookListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
