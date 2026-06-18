import { t } from "@/i18n";
import { Book } from "@/types/book";
import { Link } from "@tanstack/react-router";
import { BookGenres } from "./bookGenre";

function BookHeader({ book }: { book: Book }) {
  return (
    <>
      {BookGenres(book.genres!)}

      <h3 className="mb-1 text-lg leading-tight sm:text-xl">
        <Link
          to="/books/$id"
          params={{ id: book.id.toString() }}
          className="hover:text-primary"
        >
          {book.title}
        </Link>
      </h3>

      <p className="mb-2 text-sm italic text-muted-foreground">
        {t("by")} {book.authors.map((author) => author.name).join(", ")}
      </p>
    </>
  );
}
export default BookHeader;
