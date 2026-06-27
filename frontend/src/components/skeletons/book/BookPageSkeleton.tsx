import { AddToListSkeleton } from "./AddToListSkeleton";
import { MainBookSkeleton } from "./MainBookSkeleton";
import { RelatedShelfSkeleton } from "./RelatedShelfSkeleton";

export function BookPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 animate-pulse bg-muted" /> {/* NavBar */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-20">
        {/* back link */}
        <div className="mb-10 h-4 w-48 animate-pulse bg-muted" />

        <MainBookSkeleton />

        <AddToListSkeleton />
        <div className="mt-20 space-y-10">
          <RelatedShelfSkeleton />
          <RelatedShelfSkeleton />
        </div>
      </main>
    </div>
  );
}
