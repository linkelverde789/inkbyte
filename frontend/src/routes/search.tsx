import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

import type { Book } from "@/types/book";
import NavBar from "@/components/ui/Navbar";
import useDebounce from "@/hooks/debounce";

import { useI18n } from "@/i18n/i18nProvider";
import { BookListResponse, BookSearchParams } from "@/types/api";
import { toQueryParams } from "@/api/queryParams";
import SearchBar from "@/components/book/list/searchBar";
import SearchFilters from "@/components/book/list/bookSearchFilters";
import { ResultsInfo } from "@/components/book/list/resultsInfo";
import { ResultsDisplay } from "@/components/book/list/resultsDisplay";
import { MainFooter } from "@/components/book/index/mainFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: `${"Search books"} - InkByte` },
      {
        name: "description",
        content:
          "Search and filter books, novels and comics to download in EPUB and PDF.",
      },
      { property: "og:title", content: `${"Search books"} - InkByte` },
      {
        property: "og:description",
        content: `${"Find your next reading by genre, type, author or format."}`,
      },
    ],
  }),

  component: SearchPage,
});

function SearchPage() {
  const { t } = useI18n();
  const [params, setParams] = useState<BookSearchParams>({
    page: 1,
    page_size: 10,
  });
  const debouncedQuery = useDebounce(params.q ?? "", 500);
  const [results, setResults] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadBooks = async () => {
      try {
        setLoading(true);

        const response = await api.get<BookListResponse>(
          API_ENDPOINTS.BOOKS_LIST,
          {
            params: toQueryParams({
              ...params,
              q: debouncedQuery,
            }),
          },
        );

        setResults(response.results);
        setTotalBooks(response.count);
      } catch (error) {
        console.error(error);
        toast.error(t("Error fetching books"));
      } finally {
        setLoading(false);
      }
    };

    void loadBooks();
    return () => {
      controller.abort();
    };
  }, [
    params.page,
    params.page_size,
    params.genre_id,
    params.author_id,
    params.type,
    debouncedQuery,
  ]);

  const pageCount = Math.max(1, Math.ceil(totalBooks / params.page_size));

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <NavBar />
      <main>
        <SearchBar
          title={t("What do you want to read today?")}
          subtitle={t("Explore the library")}
          value={params.q ?? ""}
          onChange={(value) => {
            setParams({ ...params, q: value, page: 1 });
          }}
        />

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
          <SearchFilters
            genres={params.genre_id}
            authors={params.author_id}
            advancedOpen={advancedOpen}
            setAdvancedOpen={setAdvancedOpen}
            onGenresChange={(value) => {
              setParams((prev) => ({ ...prev, genre_id: value, page: 1 }));
            }}
            onAuthorsChange={(value) => {
              setParams((prev) => ({ ...prev, author_id: value, page: 1 }));
            }}
            onClear={() => {
              setParams((prev) => ({
                ...prev,
                genre_id: undefined,
                author_id: undefined,
                type: undefined,
                format: undefined,
                page: 1,
              }));
              setAdvancedOpen(false);
            }}
          />
          <ResultsInfo loading={loading} totalBooks={totalBooks} />
          <ResultsDisplay
            loading={loading}
            pageCount={pageCount}
            page={params.page}
            results={results}
            setPage={(value) => {
              setParams((prev) => ({
                ...prev,
                page: value,
              }));
            }}
          />
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
