import { useI18n } from "@/i18n/i18nProvider";
import { Book } from "@/types/book";
import { Cover } from "./cover";
import { Genres } from "./genres";
import { Authors } from "./authors";
import { Title } from "./title";
import { Description } from "./description";
import { BookFormats } from "./format";
import { DownloadButton } from "./downloads";
import BookRating from "../list/bookRating";

type Props = {
  book: Book;
  loading: boolean;
};

export function MainBook(props: Props) {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-16">
      <Cover image={props.book.image} />
      <article className="flex flex-col justify-center gap-2 md:gap-3">
        <Genres genres={props.book.genres} />

        <Title title={props.book.title} />

        <Authors authors={props.book.authors} />

        <BookRating rating={props.book.rating} />

        <Description description={props.book.description} />
        <BookFormats format={props.book.files} loading={props.loading} />

        <DownloadButton />
      </article>
    </div>
  );
}
