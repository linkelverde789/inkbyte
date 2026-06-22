import { Heart, Languages, LogOut, Menu, UserRound } from "lucide-react";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/i18nProvider";

type ProfileNavBarProps = {
  logOut: () => void;
};
export function ProfileNavBar(props: ProfileNavBarProps) {
  const { t, locale, setLocale } = useI18n();
  return (
    <nav
      className="border-b border-border bg-background"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          Ink<span className="text-primary">Byte</span>
        </Link>
        <div className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.15em] md:flex">
          <Link to="/" className="transition-colors hover:text-primary">
            {t("Home")}
          </Link>
          <Link to="/search" className="transition-colors hover:text-primary">
            {t("Search")}
          </Link>
          <Link
            to="/"
            hash="comunidad"
            className="transition-colors hover:text-primary"
          >
            {t("Community")}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Language selector"
            onClick={() => {
              setLocale(locale === "es" ? "en" : "es");
            }}
          >
            <Languages className="h-5 w-5 text-foreground" />
          </Button>
          <Button variant="ghost" onClick={props.logOut}>
            <LogOut />
            {t("Logout")}
          </Button>
        </div>
      </div>
    </nav>
  );
}
