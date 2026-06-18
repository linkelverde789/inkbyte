import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BookOpen,
  Download,
  Heart,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

import heroImage from "@/assets/inkbyte-hero.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";

function Index() {
  const { t } = useI18n();

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [saved, setSaved] = useState<string[]>([]);

  const visibleBooks = useMemo(
    () =>
      books.filter(
        (book) =>
          activeCategory === "Todos" || book.category === activeCategory,
      ),
    [activeCategory],
  );

  const toggleSaved = (title: string) => {
    setSaved((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground bgcolor-white">
      <nav
        className="border-b border-border bg-background"
        aria-label="Navegación principal"
      >
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8">
          <a
            href="#inicio"
            className="min-w-0 font-display text-2xl font-bold tracking-tight"
          >
            Ink<span className="text-primary">Byte</span>
          </a>

          <div className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.15em] md:flex">
            <Link to="/search" className="transition-colors hover:text-primary">
              {t("Search")}
            </Link>

            <a
              href="#categorias"
              className="transition-colors hover:text-primary"
            >
              {t("Categories")}
            </a>

            <a
              href="#comunidad"
              className="transition-colors hover:text-primary"
            >
              {t("Community")}
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button variant="ghost" size="icon" aria-label={t("My books")}>
              <Heart />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label={t("My account")}
              asChild
            >
              <Link to="/profile">
                <UserRound />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={t("Open menu")}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </nav>

      <main id="inicio">
        <header className="page-in relative mx-auto grid max-w-7xl grid-cols-12 gap-8 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
          <div className="z-10 col-span-12 md:col-span-7">
            <h1 className="mb-7 text-5xl leading-[0.94] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-8xl">
              {t("Your next story is here")}
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t(
                "A digital library built for unhurried discovery. Explore thousands of titles and download your next read in seconds.",
              )}
            </p>

            <Button variant="editorial" size="editorial" asChild>
              <Link to="/search">
                <Search /> {t("Search the library")}
              </Link>
            </Button>
          </div>

          <div className="relative col-span-12 mt-4 md:col-span-5 md:mt-0">
            <img
              src={heroImage}
              alt="Hero"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </header>

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
