import { ProfileNavBar } from "@/components/ui/ProfileNavbar";
import { ListHeroSkeleton } from "./ListHeroSkeleton";
import { ListBookDisplaySkeleton } from "./ListBookDisplaySkeleton";

export function ListPageSkeleton() {
  return (
    <main className="min-h-screen bg-muted/40">
      <ProfileNavBar />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-16">
        {/* back link */}
        <div className="mb-8 h-4 w-40 animate-pulse rounded bg-muted" />

        <ListHeroSkeleton />

        <ListBookDisplaySkeleton />
      </div>
    </main>
  );
}
