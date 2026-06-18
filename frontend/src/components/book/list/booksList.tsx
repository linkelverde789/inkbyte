import { Book } from "@/types/book";
import { BookCard } from "./bookCard";

export function BookList({ data }: { data: Book[] }) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
