import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Heart, Star } from "lucide-react";

import bookCovers from "@/assets/book-covers.jpg";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/books";
import { t } from "@/i18n";

export const Route = createFileRoute("/book/$slug")({
  beforeLoad: ({ params }) => {
    if (!books.some((book) => book.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const book = books.find((item) => item.slug === params.slug);
    return {
      meta: [
        { title: `${book?.title ?? "Libro"} — InkByte` },
        {
          name: "description",
          content: book?.description ?? "Descubre esta lectura en InkByte.",
        },
      ],
    };
  },
  component: BookPage,
});

function BookPage() {
  const { slug } = Route.useParams();
  const book = books.find((item) => item.slug === slug);
  if (!book) return null;
  return (
    <div className="min-h-screen bg-background">
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
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-20">
        <Link
          to="/search"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("Go back to results")}
        </Link>
        <div className="grid gap-12 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted shadow-[14px_16px_0_var(--color-secondary)]">
            <img
              src={bookCovers}
              alt={`Portada de ${book.title}`}
              className={`h-full w-[300%] max-w-none object-cover ${book.cover === "center" ? "-translate-x-1/3" : book.cover === "right" ? "-translate-x-2/3" : ""}`}
            />
          </div>
          <article className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {book.genre} · {book.type} · {book.year}
            </p>
            <h1 className="text-5xl leading-tight sm:text-6xl">{book.title}</h1>
            <p className="mt-3 text-lg italic text-muted-foreground">
              {t("by")} {book.author}
            </p>
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
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              {book.description}
            </p>
            <div className="mt-10 border-y border-border py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("Available formats")}
              </p>
              <p className="mt-2 text-lg">{book.format}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="editorial" size="editorial">
                <Download /> {t("Download book")}
              </Button>
              <Button variant="outline" size="editorial">
                <Heart /> {t("Save")}
              </Button>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
