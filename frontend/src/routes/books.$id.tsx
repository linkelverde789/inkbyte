import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { t } from "@/i18n";
import { api, API_ENDPOINTS } from "@/api";
import { Book } from "@/types/book";

/* =========================
   TYPES
========================= */

/* =========================
   API FETCH
========================= */
async function fetchBook(id: string): Promise<Book> {
  const res = await api.get<Book>(API_ENDPOINTS.BOOKS_DETAIL(id));
  return res;
}

/* =========================
   ROUTE
========================= */
export const Route = createFileRoute("/books/$id")({
  loader: async ({ params }) => {
    return fetchBook(params.id);
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

/* =========================
   COMPONENT
========================= */

console.log("pasa por aqui");
function BookPage() {
  const book = Route.useLoaderData();
  console.log(book);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-display text-2xl font-bold">
            Ink<span className="text-primary">Byte</span>
          </Link>

          <Button asChild variant="ghost">
            <Link to="/profile">{t("My profile")}</Link>
          </Button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-20">
        {/* BACK */}
        <Link
          to="/search"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("Go back to results")}
        </Link>

        <div className="grid gap-12 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-16">
          {/* COVER */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted shadow-[14px_16px_0_var(--color-secondary)]">
            <img
              src={book.image}
              alt={`Portada de ${book.title}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <article className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {book.genre} · {book.type}
            </p>

            <h1 className="text-5xl leading-tight sm:text-6xl">{book.title}</h1>

            <p className="mt-3 text-lg italic text-muted-foreground">
              {t("by")} {book.author}
            </p>

            {/* RATING */}
            <div className="my-7 flex gap-1 text-secondary">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={
                    star <= book.rating ? "fill-current" : "text-border"
                  }
                />
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              {book.description}
            </p>

            {/* FORMAT */}
            <div className="mt-10 border-y border-border py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("Available formats")}
              </p>
              <p className="mt-2 text-lg">{book.format}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="editorial" size="editorial">
                <Download />
                {t("Download book")}
              </Button>

              <Button variant="outline" size="editorial">
                <Heart />
                {t("Save")}
              </Button>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
