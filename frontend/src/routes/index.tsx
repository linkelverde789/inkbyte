import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import NavBar from "@/components/ui/Navbar";
import { Header } from "@/components/book/index/indexHeader";
import { api, API_ENDPOINTS } from "@/api";
import { BookListResponse } from "@/types/api";
import { Book } from "@/types/book";
import { Body } from "@/components/book/index/indexBody";
import { Footer } from "@/components/book/index/indexFooter";

function Index() {
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("");
  const [foundGenres, setFoundGenres] = useState<string[]>([]);
  const [results, setResults] = useState<Book[]>();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get<BookListResponse>(API_ENDPOINTS.BOOKS_LIST, {
          params: {
            page_size: 4,
          },
        });

        setResults(res.results);
      } catch (error) {
        console.error(error);
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

    results.slice(1).forEach((book) => {
      book.genres?.forEach((g) => {
        if (g?.name) genreSet.add(g.name);
      });
    });

    return ["All", ...Array.from(genreSet)];
  };

  const getBooksFromGenre = (): Book[] => {
    if (!results) return [];

    const base = results.slice(1);

    if (!activeGenre) return base;

    return base.filter((item) =>
      item.genres?.some((genre) => genre.name === activeGenre),
    );
  };

  const mainBook = results?.[0];
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
