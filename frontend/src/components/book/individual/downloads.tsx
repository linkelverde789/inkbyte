import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { Download } from "lucide-react";

export function DownloadButton() {
  const { t } = useI18n();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button variant="editorial" size="editorial">
        <Download />
        {t("Download book")}
      </Button>
    </div>
  );
}
