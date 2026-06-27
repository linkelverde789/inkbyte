import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, Users } from "lucide-react";

import { useI18n } from "@/i18n/i18nProvider";
import { api } from "@/api";
import { Book } from "@/types/book";
import { API_DYNAMIC_ENDPOINTS, API_ENDPOINTS } from "@/api/endpoints";
import NavBar from "@/components/ui/Navbar";
import { MainBook } from "@/components/book/individual/mainBook";
import { RelatedShelf } from "@/components/book/individual/relatedShelf";
import { AddToListSection } from "@/components/book/individual/AddToList";
import { List, ListResponse } from "@/types/list";
import { useEffect, useState } from "react";
import { BookPageSkeleton } from "@/components/skeletons/book/BookPageSkeleton";
import { MainBookSkeleton } from "@/components/skeletons/book/MainBookSkeleton";
import { AddToListSkeleton } from "@/components/skeletons/book/AddToListSkeleton";

async function fetchBook(id: string): Promise<Book> {
  const res = await api.get<Book>(API_DYNAMIC_ENDPOINTS.BOOKS_DETAIL(id));
  return res;
}

export const Route = createFileRoute("/books/$id")({
  loader: async ({ params }) => {
    return fetchBook(params.id);
  },

  head: ({ loaderData }) => {
    const book = loaderData;

    return {
      meta: [
        {
          title: `${book?.title ?? "Libro"} — InkByte`,
        },
        {
          name: "description",
          content: book?.description ?? "Descubre esta lectura en InkByte.",
        },
      ],
    };
  },

  component: BookPage,
});

function BookPage() {
  const { t } = useI18n();
  const book = Route.useLoaderData();

  const firstSeries = book.series?.[0] ?? null;

  const [loading, setLoading] = useState(false);

  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const res = await api.get<ListResponse>(API_ENDPOINTS.MY_LISTS);
        setLists(res.results);
        console.log(res.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    void fetchLists();
  }, [book.id]);

  if (!book) return <BookPageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-20">
        <Link
          to="/search"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("Go back to results")}
        </Link>
        {book ? <MainBook book={book} /> : <MainBookSkeleton />}
        {loading ? (
          <AddToListSkeleton />
        ) : (
          lists.length > 0 && (
            <AddToListSection
              bookId={book.id}
              lists={lists}
              setLists={setLists}
            />
          )
        )}
        {book.authors?.map((author) => {
          return (
            <RelatedShelf
              title={t(`More books from the author`)}
              subtitle={author.name}
              icon={<Users className="size-4" />}
              endpoint={"author"}
              id={author.id}
            />
          );
        })}
        {firstSeries ? (
          <RelatedShelf
            title={t("In the same series")}
            subtitle={firstSeries?.name}
            icon={<BookMarked className="size-4" />}
            endpoint={"series"}
            id={firstSeries.id}
          />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
