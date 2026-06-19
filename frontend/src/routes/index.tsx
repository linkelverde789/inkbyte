import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import NavBar from "@/components/ui/navbar";
import { Header } from "@/components/book/index/indexHeader";
import { api, API_ENDPOINTS } from "@/api";
import { BookListResponse } from "@/types/api";
import { Book } from "@/types/book";

type IndexResult = {
  singular: Book;
  multiple: Book[];
};
function Index() {
  const { t } = useI18n();
  const [loading, setLoading] = useState<Boolean>(false);
  const [result, setResults] = useState<IndexResult>();
  const [activeGenre, setActiveGenre] = useState<String>("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get<BookListResponse>(API_ENDPOINTS.BOOKS_LIST, {
          params: {
            page_size: 4,
          },
        });

        setResults({
          singular: res.results[0],
          multiple: res.results.slice(0),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const getBooksfromGenre = (): Book[] => {
    return result!.multiple.filter((item) =>
      item.genres?.some((genre) => genre.name === activeGenre),
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground bgcolor-white">
      <NavBar />

      <main id="inicio">
        <Header book={result!.singular} />

        <section
          id="biblioteca"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
        >
          <div
            id="categorias"
            className="mb-12 flex gap-2 overflow-x-auto pb-2"
          >
            {["Todos", "Ficción", "Misterio", "Fantasía"].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {visibleBooks.map((book) => (
              <article key={book.title}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
