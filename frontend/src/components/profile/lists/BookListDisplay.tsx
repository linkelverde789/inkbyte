import { Book } from "@/types/book";
import { BookDisplay } from "./BookDisplay";

type DisplayBooksProps = {
  books: Book[];
  removeBookFromList: (bookId: number | string) => void;
};

export function DisplayBooks(props: DisplayBooksProps) {
  return (
    <ul className="mt-6 divide-y divide-border border-y border-border bg-card">
      {props.books.map((book, i) => (
        <BookDisplay
          index={i}
          book={book}
          removeBookFromList={props.removeBookFromList}
        />
      ))}
    </ul>
  );
}
