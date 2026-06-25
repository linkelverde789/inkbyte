import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { List } from "@/types/list";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { DisplayBooks } from "./BookListDisplay";
import { EmptyListDisplay } from "./EmptyListDisplay";

type ListBookDisplayProps = {
  list: List;
  removeBookFromList: (bookId: number | string) => void;
};
export function ListBookDisplay(props: ListBookDisplayProps) {
  const { t } = useI18n();
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Content")}
          </p>

          <h2 className="mt-2 text-3xl">{t("Books in this list")}</h2>
        </div>

        <Button asChild variant="ghost">
          <Link to="/search">
            <BookOpen className="size-4" /> {t("Add books")}
          </Link>
        </Button>
      </div>

      <DisplayBooks
        books={props.list.books}
        removeBookFromList={props.removeBookFromList}
      />

      {props.list.books.length === 0 && <EmptyListDisplay />}
    </section>
  );
}
