import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

import type { Book } from "@/types/book";
import { BookList } from "@/components/book/list/booksList";
import NavBar from "@/components/ui/navbar";
import useDebounce from "@/hooks/debounce";

import { useI18n } from "@/i18n/i18nProvider";
import { BookListResponse, BookSearchParams } from "@/types/api";
import { toQueryParams } from "@/api/queryParams";
import SearchBar from "@/components/book/list/searchBar";
import SearchFilters from "@/components/book/list/bookSearchFilters";
import sleep from "./utils";
import { ListPagination } from "@/components/book/list/bookPagination";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: `${t("Search books")} - InkByte` },
      {
        name: "description",
        content:
          "Search and filter books, novels and comics to download in EPUB and PDF.",
      },
      { property: "og:title", content: `${t("Search books")} - InkByte` },
      {
        property: "og:description",
        content: `${t("Find your next reading by genre, type, author or format.")}`,
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
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [
    params.page,
    params.page_size,
    params.genre,
    params.type,
    debouncedQuery,
  ]);

  const pageCount = Math.max(1, Math.ceil(totalBooks / params.page_size));

  const getVisiblePages = (current: number, total: number) => {
    const delta = 1;

    const range = [];

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    range.push(1);

    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < total - 1) range.push("...");

    if (total > 1) range.push(total);

    return range;
  };

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
            genres={params.genre ?? -1}
            authors={params.author ?? -1}
            advancedOpen={advancedOpen}
            setAdvancedOpen={setAdvancedOpen}
            onGenresChange={(value) =>
              setParams((prev) => ({ ...prev, genres: value, page: 1 }))
            }
            onAuthorsChange={(value) =>
              setParams((prev) => ({ ...prev, authors: value, page: 1 }))
            }
            onClear={() => {
              setParams((prev) => ({
                ...prev,
                genres: undefined,
                authors: undefined,
                type: undefined,
                format: undefined,
                page: 1,
              }));
              setAdvancedOpen(false);
            }}
          />
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {t("Results")}
              </p>
              {!loading ? (
                <h2 className="text-2xl sm:text-3xl">
                  {totalBooks} {t("books found")}
                </h2>
              ) : (
                ""
              )}
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {t("Sorted by relevance")}
            </span>
          </div>
          {loading ? (
            <div className="py-20 text-center">{t("Loading books...")}</div>
          ) : results.length ? (
            <>
              <BookList data={results} />

              <ListPagination
                pageCount={pageCount}
                page={params.page}
                setPage={(value: number) => {
                  setParams((prev) => ({
                    ...prev,
                    page: value,
                  }));
                }}
              />
            </>
          ) : (
            <div className="border-y border-border bg-background py-20 text-center">
              <BookOpen className="mx-auto mb-4 size-9 text-primary" />
              <h2 className="mb-2 text-2xl">
                {t("We couldn't find that reading")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("Try changing the term or clearing the filters.")}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
