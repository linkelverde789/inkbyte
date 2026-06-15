import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Download,
  Heart,
  Menu,
  Search,
  SlidersHorizontal,
  Star,
  UserRound,
  X,
} from "lucide-react";

import bookCovers from "@/assets/book-covers.jpg";
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
export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Buscar libros — InkByte" },
      {
        name: "description",
        content:
          "Busca y filtra libros, novelas y cómics para descargar en EPUB y PDF.",
      },
      { property: "og:title", content: "Buscar libros — InkByte" },
      {
        property: "og:description",
        content:
          "Encuentra tu próxima lectura por género, tipo, autor o formato.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [type, setType] = useState("Todos");
  const [format, setFormat] = useState("Todos");
  const [author, setAuthor] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 12;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

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
    setGenre("Todos");
    setType("Todos");
    setFormat("Todos");
    setAuthor("");
    setPage(1);
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
              Inicio
            </Link>
            <span className="text-primary">Buscar</span>
            <Link
              to="/"
              hash="comunidad"
              className="transition-colors hover:text-primary"
            >
              Comunidad
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Mis libros">
              <Heart />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Mi cuenta" asChild>
              <Link to="/profile">
                <UserRound />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menú"
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
              <ArrowLeft className="size-4" /> Volver a inicio
            </Link>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Explora la biblioteca
            </p>
            <h1 className="mb-8 text-4xl leading-tight sm:text-5xl">
              ¿Qué quieres leer hoy?
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
                Buscar libros
              </label>
              <input
                id="library-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Título, autor o ISBN…"
              />
              <Button
                variant="editorial"
                size="editorial"
                type="submit"
                className="hidden sm:inline-flex"
              >
                Buscar
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
                  <SelectValue placeholder="Género" />
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
                  <SelectValue placeholder="Tipo" />
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
                <SlidersHorizontal /> Búsqueda avanzada{" "}
                <ChevronDown
                  className={
                    advancedOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </Button>
              <Button variant="ghost" size="editorial" onClick={clearFilters}>
                <X /> Limpiar
              </Button>
            </div>

            {advancedOpen && (
              <div className="page-in mt-4 grid gap-3 border-l-4 border-secondary bg-background p-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="author-filter"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Autor
                  </label>
                  <input
                    id="author-filter"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="h-11 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-primary"
                    placeholder="Nombre del autor"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Formato
                  </label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="h-11 rounded-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Todos", "EPUB", "PDF"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item === "Todos" ? "Cualquier formato" : item}
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
                Resultados
              </p>
              <h2 className="text-2xl sm:text-3xl">
                {totalBooks} libros encontrados
              </h2>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Ordenados por relevancia
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">Cargando libros...</div>
          ) : results.length ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-2">
                {results.map((book) => (
                  <article
                    key={book.title}
                    className="group relative flex min-w-0 flex-col bg-card shadow-[4px_5px_0_var(--color-secondary)] sm:shadow-[6px_7px_0_var(--color-secondary)]"
                  >
                    <Link
                      to="/book/$slug"
                      params={{ slug: book.slug }}
                      className="relative aspect-[3/4] overflow-hidden bg-muted"
                    >
                      <img
                        src={bookCovers}
                        width={1536}
                        height={1024}
                        loading="lazy"
                        alt={`Portada de ${book.title}`}
                        className={`h-full w-[300%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.015] ${book.cover === "center" ? "-translate-x-1/3" : book.cover === "right" ? "-translate-x-2/3" : ""}`}
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                            <span>{book.genre}</span>
                            <span>·</span>
                            <span>{book.type}</span>
                            <span>·</span>
                            <span>{book.year}</span>
                          </div>
                          <h3 className="text-lg leading-tight sm:text-2xl">
                            <Link
                              to="/book/$slug"
                              params={{ slug: book.slug }}
                              className="hover:text-primary"
                            >
                              {book.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm italic text-muted-foreground">
                            por {book.author}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setSaved((current) =>
                              current.includes(book.title)
                                ? current.filter(
                                    (title) => title !== book.title,
                                  )
                                : [...current, book.title],
                            )
                          }
                          aria-label={`${saved.includes(book.title) ? "Quitar" : "Guardar"} ${book.title}`}
                        >
                          <Heart
                            className={
                              saved.includes(book.title)
                                ? "fill-current text-primary"
                                : ""
                            }
                          />
                        </Button>
                      </div>
                      <div
                        className="mb-5 flex gap-1 text-secondary"
                        aria-label={`${book.rating} de 5 estrellas`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${star <= book.rating ? "fill-current" : "text-border"}`}
                          />
                        ))}
                      </div>
                      <p className="mb-5 hidden text-sm leading-6 text-muted-foreground sm:line-clamp-3 sm:block">
                        {book.description}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                          {book.format}
                        </span>
                        <Button
                          variant="editorial"
                          size="sm"
                          className="rounded-none"
                        >
                          <Download />{" "}
                          <span className="hidden sm:inline">Descargar</span>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
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
                      Anterior
                    </PaginationPrevious>
                  </PaginationItem>
                  {Array.from(
                    { length: pageCount },
                    (_, index) => index + 1,
                  ).map((number) => (
                    <PaginationItem key={number}>
                      <PaginationLink
                        href="#"
                        isActive={page === number}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(number);
                        }}
                      >
                        {number}
                      </PaginationLink>
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
                      Siguiente
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <div className="border-y border-border bg-background py-20 text-center">
              <BookOpen className="mx-auto mb-4 size-9 text-primary" />
              <h2 className="mb-2 text-2xl">No encontramos esa lectura</h2>
              <p className="text-sm text-muted-foreground">
                Prueba a cambiar el término o limpiar los filtros.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
