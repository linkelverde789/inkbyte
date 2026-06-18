import { Button } from "@/components/ui/button";
import { t } from "@/i18n";
import { Book } from "@/types/book";
import { Download } from "lucide-react";

function BookFooter({ book }: { book: Book }) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
        {book.format ?? "PDF"}
      </span>

      <div className="flex items-center gap-2">
        <Button variant="editorial" size="sm" className="rounded-none">
          <Download /> {t("Download")}
        </Button>
      </div>
    </div>
  );
}
export default BookFooter;
