import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
    params.genres,
    params.type,
    debouncedQuery,
  ]);

  const pageCount = Math.max(1, Math.ceil(totalBooks / params.page_size));

  const clearFilters = () => {
    setParams({
      ...params,
      genres: undefined,
      type: undefined,
      format: undefined,
      authors: undefined,
      page: 1,
    });
  };

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

        <SearchFilters />

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {t("Results")}
              </p>
              <h2 className="text-2xl sm:text-3xl">
                {totalBooks} {t("books found")}
              </h2>
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

              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setParams({
                          ...params,
                          page: Math.max(1, params.page - 1),
                        });
                      }}
                      aria-disabled={params.page === 1}
                      className={
                        params.page === 1
                          ? "pointer-events-none opacity-40"
                          : ""
                      }
                    >
                      {t("Previous")}
                    </PaginationPrevious>
                  </PaginationItem>
                  {getVisiblePages(params.page, pageCount).map(
                    (item, index) => (
                      <PaginationItem key={`${item}-${index}`}>
                        {item === "..." ? (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        ) : (
                          <PaginationLink
                            href="#"
                            isActive={params.page === item}
                            onClick={(event) => {
                              event.preventDefault();
                              if (typeof item === "number") {
                                setParams({ ...params, page: item });
                              }
                            }}
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setParams({
                          ...params,
                          page: Math.min(pageCount, params.page + 1),
                        });
                      }}
                      aria-disabled={params.page === pageCount}
                      className={
                        params.page === pageCount
                          ? "pointer-events-none opacity-40"
                          : ""
                      }
                    >
                      {t("Next")}
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
