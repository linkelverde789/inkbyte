import { Book } from "@/types/book";
import BookCover from "./bookCover";
import BookHeader from "./bookHeader";
import BookRating from "./bookRating";
import BookDescription from "./bookDescription";
import BookFooter from "./bookFooter";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col gap-4 bg-card p-4 shadow-[4px_5px_0_var(--color-secondary)] sm:flex-row sm:items-start sm:gap-6 sm:p-6">
      <BookCover book={book} />
      <div className="flex min-w-0 flex-1 flex-col">
        <BookHeader book={book} />
        <BookRating rating={book.rating} size="size-3.5" />
        <BookDescription description={book.description} />
        <BookFooter book={book} />
      </div>
    </article>
  );
}
