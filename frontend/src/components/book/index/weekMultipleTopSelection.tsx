import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { Book } from "@/types/book";
import { Download } from "lucide-react";

type WeekMultipleTopSelectionProps = {
  books: Book[];
};
export function WeekMultipleTopSelection(props: WeekMultipleTopSelectionProps) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-1 gap-x-9 gap-y-16 md:grid-cols-3">
      {props.books.map((book, index) => (
        <article
          key={book.title}
          className={`group ${index === 1 ? "md:mt-20" : ""}`}
        >
          <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={book.image}
              width={1536}
              height={1024}
              loading="lazy"
              alt={`Portada de ${book.title}`}
              className={`h-full w-[300%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.02] ${book.image === "center" ? "-translate-x-1/3" : book.image === "right" ? "-translate-x-2/3" : ""}`}
            />
          </div>
          <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
            {/* <span>{book.category}</span>
            <span>{book.format}</span> */}
          </div>
          <h3 className="mb-1 text-2xl transition-colors group-hover:text-primary">
            {book.title}
          </h3>
          <p className="mb-5 text-sm italic text-muted-foreground">
            {"JOSEMI"}
          </p>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              {10} {t("Downloads")}
            </span>
            <Button variant="link" size="sm" className="px-0 font-bold">
              <Download />
              {t("Download")}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
