import { Book } from "@/types/book";
import { Link } from "@tanstack/react-router";

function BookCover({ book }: { book: Book }) {
  return (
    <Link
      to="/books/$id"
      params={{ id: book.id.toString() }}
      className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-muted sm:w-32 md:w-40"
    >
      <img
        src={book.image}
        loading="lazy"
        alt={`Portada de ${book.title}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
      />
    </Link>
  );
}

export default BookCover;
