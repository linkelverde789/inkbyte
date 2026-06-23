import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/auth/AuthContext";
import { useI18n } from "@/i18n/i18nProvider";
import { useEffect } from "react";
import { ProfileNavBar } from "@/components/ui/ProfileNavbar";
import sleep from "./utils";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import ProfileInfo from "@/components/profile/Info";
import UserLists from "@/components/profile/UserLists";
import ProfileCard from "@/components/profile/ProfileCard";
import UserStats from "@/components/profile/UserStats";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useI18n();
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate({
        to: "/login",
        replace: true,
      });
    }
  }, [loading, user, navigate]);

  async function signOut() {
    await logout();
    await navigate({
      to: "/login",
      replace: true,
    });
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-muted/40">
      <ProfileNavBar logOut={signOut} />

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 md:py-20">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Reader's area")}
          </p>

          <h1 className="mt-2 text-5xl">{t("My profile")}</h1>
        </header>

        <ProfileCard user={user} />

        <UserLists />
        <UserStats />
      </div>
    </main>
  );
}
