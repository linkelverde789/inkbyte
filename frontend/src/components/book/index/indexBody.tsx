import { Book } from "@/types/book";
import { WeekMultipleTopSelection } from "./weekMultipleTopSelection";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/i18nProvider";
import { GenreFilter } from "./genreFilter";

type BodyProps = {
  books: Book[] | undefined;
  loading: boolean;
  activeGenre: string;
  genres: string[];
  setGenre: (value: string) => void;
};
export function Body(props: BodyProps) {
  console.log("body, ", props);
  const { t } = useI18n();
  return (
    <section
      id="biblioteca"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {t("Discover")}
          </p>
          <h2 className="text-3xl sm:text-4xl">{t("Most read this week")}</h2>
        </div>
        <Link
          to="/search"
          className="shrink-0 text-xs font-bold uppercase tracking-wider underline decoration-primary underline-offset-4"
        >
          {t("Search the library")}
        </Link>
      </div>

      <GenreFilter
        activeGenre={props.activeGenre}
        setGenre={props.setGenre}
        genres={props.genres}
      />

      {props.loading ? (
        "Loading"
      ) : (
        <WeekMultipleTopSelection books={props.books!} />
      )}
    </section>
  );
}
