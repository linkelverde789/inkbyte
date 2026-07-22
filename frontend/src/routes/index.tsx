import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import NavBar from "@/components/ui/Navbar";
import { Header } from "@/components/book/index/indexHeader";
import { api, API_ENDPOINTS } from "@/api";
import { BookListResponse, BookStatsItem } from "@/types/api";
import { Book } from "@/types/book";
import { Body } from "@/components/book/index/indexBody";
import { Footer } from "@/components/book/index/indexFooter";
import { toast } from "sonner";
import { useI18n } from "@/i18n/i18nProvider";

function getStartAndEndDate(date = new Date()) {
  const now = date.getDay();
  const day = now === 0 ? 7 : now;
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - (day - 1));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
}

async function getBookStats(
  limit: number,
  startDate?: string,
  endDate?: string,
) {
  const res = await api.get<BookStatsItem[]>(API_ENDPOINTS.BOOKS_STATS, {
    params: {
      limit: 4,
      start_date: startDate,
      end_date: endDate,
      type: "views",
    },
  });

  return res;
}

function Index() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("");
  const [foundGenres, setFoundGenres] = useState<string[]>([]);
  const [results, setResults] = useState<BookStatsItem[]>();

  useEffect(() => {
    const loadBooks = async () => {
      const { startDate, endDate } = getStartAndEndDate();
      const limit = 4;
      try {
        setLoading(true);
        let res = await getBookStats(
          limit,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        );

        if (res.length === 0) {
          res = await getBookStats(limit);
        }

        setResults(res);
      } catch (error: unknown) {
        console.error(error);

        toast.error(t("Error fetching books"));
      } finally {
        setLoading(false);
      }
    };
    void loadBooks();
  }, []);

  useEffect(() => {
    if (results) {
      setFoundGenres(findGenres());
    }
  }, [results]);

  const findGenres = (): string[] => {
    if (!results) return [];

    const genreSet = new Set<string>();

    results.slice(1).forEach((item) => {
      item.book.genres?.forEach((g) => {
        if (g?.name) genreSet.add(g.name);
      });
    });

    return ["All", ...Array.from(genreSet)];
  };

  const getBooksFromGenre = (): Book[] => {
    if (!results) return [];

    const base = results.slice(1);

    if (!activeGenre) {
      return base.map((item) => item.book);
    }

    return base
      .filter((item) =>
        item.book.genres?.some((genre) => genre.name === activeGenre),
      )
      .map((item) => item.book);
  };

  const mainBook = results?.[0].book;
  const weekTop = getBooksFromGenre();
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground bgcolor-white">
      <NavBar />

      <main id="inicio">
        <Header book={mainBook} loading={loading} />
        <Body
          books={weekTop}
          loading={loading}
          genres={foundGenres}
          activeGenre={activeGenre}
          setGenre={(event) => {
            setActiveGenre(event);
          }}
        />
        <Footer />
      </main>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
