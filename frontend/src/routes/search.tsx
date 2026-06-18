import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Download,
  Ellipsis,
  Heart,
  Menu,
  Search,
  SlidersHorizontal,
  Star,
  UserRound,
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

import type { Book, BookListResponse } from "@/types/book";
import { t } from "@/i18n";
import { BookList } from "@/components/book/list/booksList";
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
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [type, setType] = useState("All");
  const [format, setFormat] = useState("All");
  const [author, setAuthor] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        await sleep(3000);

        const response = await api.get<BookListResponse>(
          API_ENDPOINTS.BOOKS_LIST,
          {
            params: {
              page,
              page_size: pageSize,
            },
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
  }, [page]);
  const pageCount = Math.max(1, Math.ceil(totalBooks / pageSize));

  const clearFilters = () => {
    setGenre("All");
    setType("All");
    setFormat("All");
    setAuthor("");
    setPage(1);
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
      <nav
        className="border-b border-border bg-background"
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Ink<span className="text-primary">Byte</span>
          </Link>
          <div className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.15em] md:flex">
            <Link to="/" className="transition-colors hover:text-primary">
              {t("Home")}
            </Link>
            <span className="text-primary">{t("Search")}</span>
            <Link
              to="/"
              hash="comunidad"
              className="transition-colors hover:text-primary"
            >
              {t("Community")}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="My books">
              <Heart />
            </Button>
            <Button variant="ghost" size="icon" aria-label="My account" asChild>
              <Link to="/profile">
                <UserRound />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <header className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" /> {t("Back to home")}
            </Link>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {t("Explore the library")}
            </p>
            <h1 className="mb-8 text-4xl leading-tight sm:text-5xl">
              {t("What do you want to read today?")}
            </h1>
            <form
              className="flex max-w-4xl border-2 border-foreground bg-card p-1.5 shadow-[7px_7px_0_var(--color-secondary)]"
              onSubmit={(event) => event.preventDefault()}
              role="search"
            >
              <Search
                className="mx-3 size-5 shrink-0 self-center text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="library-search" className="sr-only">
                {t("Search books")}
              </label>
              <input
                id="library-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={t("Title, author or ISBN…")}
              />
              <Button
                variant="editorial"
                size="editorial"
                type="submit"
                className="hidden sm:inline-flex"
              >
                {t("Search")}
              </Button>
            </form>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
          <section
            aria-label="Filtros de búsqueda"
            className="mb-12 border-b border-border pb-8"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
              <Select value={genre} onValueChange={setGenre}>
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
              <Select value={type} onValueChange={setType}>
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
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="h-11 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-primary"
                    placeholder={t("Author's name")}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t("Format")}
                  </label>
                  <Select value={format} onValueChange={setFormat}>
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
              {<BookList data={results} />}

              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.max(1, current - 1));
                      }}
                      aria-disabled={page === 1}
                      className={
                        page === 1 ? "pointer-events-none opacity-40" : ""
                      }
                    >
                      {t("Previous")}
                    </PaginationPrevious>
                  </PaginationItem>
                  {getVisiblePages(page, pageCount).map((item, index) => (
                    <PaginationItem key={`${item}-${index}`}>
                      {item === "..." ? (
                        <span className="px-2 text-muted-foreground">...</span>
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={page === item}
                          onClick={(event) => {
                            event.preventDefault();
                            if (typeof item === "number") {
                              setPage(item);
                            }
                          }}
                        >
                          {item}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.min(pageCount, current + 1));
                      }}
                      aria-disabled={page === pageCount}
                      className={
                        page === pageCount
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
