import { DownloadDropdown } from "@/components/book/downloadDropdown";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { showAuthors } from "@/routes/utils";
import { Book } from "@/types/book";
import { Link } from "@tanstack/react-router";
import { Star, Trash2 } from "lucide-react";

type BookDisplayProps = {
  book: Book;
  index: number;
  removeBookFromList: (bookId: number | string) => void;
};
export function BookDisplay(props: BookDisplayProps) {
  const { t } = useI18n();
  const book = props.book;
  return (
    <li
      key={book.id}
      className="grid grid-cols-[60px_88px_1fr_auto] items-center gap-4 p-4 sm:gap-6 sm:p-5"
    >
      <span className="font-display text-3xl text-muted-foreground sm:text-4xl">
        {String(props.index + 1).padStart(2, "0")}
      </span>

      <Link
        to="/books/$id"
        params={{ id: book.id.toString() }}
        className="relative aspect-[3/4] overflow-hidden bg-muted shadow-[3px_3px_0_var(--color-secondary)]"
      >
        <img
          src={book.image}
          className="h-full w-full max-w-none object-cover"
        />
      </Link>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
          {book.genres.map((genre) => t(genre.name)).join(", ")}
        </p>

        <Link
          to="/books/$id"
          params={{ id: book.id.toString() }}
          className="mt-1 block truncate font-display text-xl hover:text-primary sm:text-2xl"
        >
          {book.title}
        </Link>

        <p className="truncate text-sm italic text-muted-foreground">
          {t("by")} {showAuthors(book.authors)}
        </p>

        <div className="mt-1 flex gap-0.5 text-secondary">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`size-3 ${
                s <= book.rating ? "fill-current" : "text-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <DownloadDropdown files={book.files} className="red" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            props.removeBookFromList(book.id);
          }}
          title={t("Remove from list")}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </li>
  );
}
