import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { Link } from "@tanstack/react-router";

export function EmptyListDisplay() {
  const { t } = useI18n();
  return (
    <div className="mt-6 border-2 border-dashed border-border bg-card/50 p-10 text-center">
      <p className="font-display text-2xl">{t("This list is still empty")}</p>

      <p className="mt-2 text-sm text-muted-foreground">
        {t("Browse the catalog and add your first titles.")}
      </p>

      <Button asChild variant="editorial" size="editorial" className="mt-5">
        <Link to="/search">{t("Go to search")}</Link>
      </Button>
    </div>
  );
}
