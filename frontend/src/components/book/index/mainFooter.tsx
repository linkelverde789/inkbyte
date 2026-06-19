import { useI18n } from "@/i18n/i18nProvider";
import { Link } from "@tanstack/react-router";

export function MainFooter() {
  const { t } = useI18n();
  return (
    <footer className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-24 sm:px-8 md:grid-cols-3">
      <div>
        <p className="mb-4 font-display text-2xl font-bold">
          Ink<span className="text-primary">Byte</span>
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          {t("A calm digital library for curious readers.")}
        </p>
      </div>
      <div>
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-primary">
          {t("Explore")}
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/search">{t("Search books")}</Link>
          <Link to="/profile">{t("Your library")}</Link>
        </div>
      </div>
      <div className="md:text-right">
        <p className="text-xs font-bold uppercase tracking-widest">
          © 2026 InkByte
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {t("Read more. Search less.")}
        </p>
      </div>
    </footer>
  );
}
