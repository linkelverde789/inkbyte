import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { UserListsSkeleton } from "./UserListSkeleton";
import { UserStatsSkeleton } from "./UserStatsSkeleton";

export function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-muted/40">
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 md:py-20">
        <div className="space-y-3">
          <div className="h-3 w-40 animate-pulse bg-muted" />
          <div className="h-10 w-64 animate-pulse bg-muted" />
        </div>

        <ProfileCardSkeleton />

        <UserListsSkeleton />

        <UserStatsSkeleton />
      </div>
    </main>
  );
}
