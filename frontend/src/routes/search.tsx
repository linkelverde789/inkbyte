import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [advancedOpen, setAdvancedOpen] = useState(false);
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

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
          <section
            aria-label="Filtros de búsqueda"
            className="mb-12 border-b border-border pb-8"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
              <Select
                value={""}
                onValueChange={() => {
                  console.log("change");
                }}
              >
                <SelectTrigger className="h-12 rounded-none bg-background px-4 shadow-none">
                  <SelectValue placeholder={t("Genre")} />
                </SelectTrigger>
                <SelectContent>
                  {["Todos", "Ficción", "Misterio", "Fantasía"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item === "Todos" ? "Todos los géneros" : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={""}
                onValueChange={() => {
                  console.log("change");
                }}
              >
                <SelectTrigger className="h-12 rounded-none bg-background px-4 shadow-none">
                  <SelectValue placeholder={t("Type")} />
                </SelectTrigger>
                <SelectContent>
                  {["Todos", "Libro", "Novela", "Cómic", "Ensayo"].map(
                    (item) => (
                      <SelectItem key={item} value={item}>
                        {item === "Todos" ? "Todos los tipos" : item}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="editorial"
                className="rounded-none bg-background shadow-none"
                onClick={() => setAdvancedOpen((open) => !open)}
                aria-expanded={advancedOpen}
              >
                <SlidersHorizontal /> {t("Advanced search")}
                <ChevronDown
                  className={
                    advancedOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </Button>
              <Button variant="ghost" size="editorial" onClick={clearFilters}>
                <X /> {t("Clear")}
              </Button>
            </div>

            {advancedOpen && (
              <div className="page-in mt-4 grid gap-3 border-l-4 border-secondary bg-background p-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="author-filter"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    {t("Author")}
                  </label>
                  <input
                    id="author-filter"
                    value={""}
                    onChange={() => {
                      console.log("change");
                    }}
                    className="h-11 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-primary"
                    placeholder={t("Author's name")}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t("Format")}
                  </label>
                  <Select
                    value={""}
                    onValueChange={() => {
                      console.log("change");
                    }}
                  >
                    <SelectTrigger className="h-11 rounded-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Todos", "EPUB", "PDF"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item === "Todos" ? t("Any format") : item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </section>

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
