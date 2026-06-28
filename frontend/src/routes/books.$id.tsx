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
import { AddToListSkeleton } from "@/components/skeletons/book/AddToListSkeleton";
import { toast } from "sonner";
import { Author } from "@/types/book";
import { useAuth } from "@/auth/AuthContext";
async function fetchBook(id: string): Promise<Book> {
  const res = await api.get<Book>(API_DYNAMIC_ENDPOINTS.BOOKS_DETAIL(id));
  return res;
}

export const Route = createFileRoute("/books/$id")({
  loader: async ({ params }) => {
    try {
      return await fetchBook(params.id);
    } catch (error) {
      console.error(error);
    }
  },

  errorComponent: () => {
    const { t } = useI18n();
    return (
      <div className="p-10 text-center">
        <p>{t("Book not found")}</p>
        <Link to="/search">{t("Go back")}</Link>
      </div>
    );
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
  const { user, loading } = useAuth();

  const book = Route.useLoaderData();

  if (!book) return <BookPageSkeleton />;

  const [bookData, setBookData] = useState(book);

  const [lists, setLists] = useState<List[]>([]);
  const [loadingState, setLoadingState] = useState(false);

  const [ratingLoading, setRatingLoading] = useState(false);

  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    setBookData(book);
  }, [book]);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const res = await api.get<{
          user: {
            id: string | number;
            username: string;
          };
          rate: number | null;
        }>(API_DYNAMIC_ENDPOINTS.BOOKS_RATING(bookData.id));
        console.log(res);
        setUserRating(res.rate ?? 0);
      } catch (error) {
        toast.error("Error");
        console.error(error);
      }
    };
    void fetchUserRating();
  }, [bookData]);

  useEffect(() => {
    const fetchLists = async () => {
      setLoadingState(true);

      try {
        const res = await api.get<ListResponse>(API_ENDPOINTS.MY_LISTS);
        setLists(res.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    };

    void fetchLists();
  }, [bookData]);

  async function handleRate(rating: number) {
    const previousBook = bookData;

    setRatingLoading(true);

    try {
      const res = await api.put<Book>(
        API_DYNAMIC_ENDPOINTS.BOOKS_RATING(bookData.id),
        { rating },
      );

      setBookData((prev) =>
        prev
          ? {
              ...prev,
              rating: res.rating,
            }
          : prev,
      );

      setUserRating(rating);

      toast.success("Valoración guardada");
    } catch (error) {
      setBookData(previousBook);
      toast.error("No se pudo guardar la valoración");
    } finally {
      setRatingLoading(false);
    }
  }

  const firstSeries = bookData.series?.[0] ?? null;

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

        <MainBook
          book={bookData}
          loading={loadingState}
          canRate={!!user}
          ratingLoading={ratingLoading}
          onRate={handleRate}
          userRating={userRating}
        />

        {loadingState ? (
          <AddToListSkeleton />
        ) : (
          lists.length > 0 && (
            <AddToListSection
              bookId={bookData.id}
              lists={lists}
              setLists={setLists}
            />
          )
        )}

        {bookData.authors?.map((author: Author) => (
          <RelatedShelf
            key={author.id}
            title={t("More books from the author")}
            subtitle={author.name}
            icon={<Users className="size-4" />}
            endpoint="author"
            id={author.id}
          />
        ))}

        {firstSeries && (
          <RelatedShelf
            title={t("In the same series")}
            subtitle={firstSeries.name}
            icon={<BookMarked className="size-4" />}
            endpoint="series"
            id={firstSeries.id}
          />
        )}
      </main>
    </div>
  );
}
