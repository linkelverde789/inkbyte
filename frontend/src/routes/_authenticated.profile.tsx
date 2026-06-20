import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { useI18n } from "@/i18n/i18nProvider";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({
        to: "/login",
        replace: true,
      });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  async function signOut() {
    await logout();
    await navigate({
      to: "/login",
      replace: true,
    });
  }

  const initials =
    `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}` || "IB";

  return (
    <main className="min-h-screen bg-muted/40">
      <nav className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-display text-2xl font-bold">
            Ink<span className="text-primary">Byte</span>
          </Link>

          <Button variant="ghost" onClick={signOut}>
            <LogOut />
            {t("Logout")}
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t("Reader's area")}
        </p>

        <h1 className="mt-2 text-5xl">{t("My profile")}</h1>

        <section className="mt-10 grid gap-10 bg-card p-7 shadow-[9px_10px_0_var(--color-secondary)] sm:p-10 md:grid-cols-[220px_1fr]">
          <div>
            <Avatar className="size-44 rounded-none bg-muted">
              {user.profile_picture && (
                <AvatarImage
                  src={user.profile_picture}
                  className="object-cover"
                />
              )}

              <AvatarFallback className="rounded-none font-display text-4xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid content-start gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("Name")}
              </p>
              <p className="mt-2 text-lg">{user.first_name || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("Last name")}
              </p>
              <p className="mt-2 text-lg">{user.last_name || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("Username")}
              </p>
              <p className="mt-2 text-lg">@{user.username}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("Email")}
              </p>
              <p className="mt-2 break-all text-lg">{user.email}</p>
            </div>

            <div className="border-t border-border pt-6 sm:col-span-2">
              <Button asChild variant="editorial" size="editorial">
                <Link to="/search">{t("Explore the library")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
