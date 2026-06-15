  import { createFileRoute, Link } from "@tanstack/react-router";
  import { useMemo, useState } from "react";
  import { BookOpen, Download, Heart, Menu, Search, UserRound } from "lucide-react";

  import bookCovers from "@/assets/book-covers.jpg";
  import heroImage from "@/assets/inkbyte-hero.jpg";
  import readingNook from "@/assets/reading-nook.jpg";
  import { Button } from "@/components/ui/button";
  import { t } from "@/i18n";

  export const Route = createFileRoute("/")({
    head: () => ({
      meta: [
        { title: `${t("Search books")} - InkByte` },
        { name: "description", content: "Search and filter books, novels and comics to download in EPUB and PDF." },
        { property: "og:title", content: `${t("Search books")} - InkByte` },
        { property: "og:description", content: "Search and filter books, novels and comics to download in EPUB and PDF." },
      ],
    }),
    component: Index,
  });

  //TODO: Replace with API call
  const books = [
    { title: "La paciente silenciosa", author: "Alex Michaelides", category: "Misterio", format: "EPUB · PDF", downloads: "18,4 mil", cover: "left" },
    { title: "Circe", author: "Madeline Miller", category: "Fantasía", format: "EPUB", downloads: "12,8 mil", cover: "center" },
    { title: "Yellowface", author: "R. F. Kuang", category: "Ficción", format: "EPUB · PDF", downloads: "9,6 mil", cover: "right" },
  ];

  function Index() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [saved, setSaved] = useState<string[]>([]);

    const visibleBooks = useMemo(() => books.filter((book) => activeCategory === "Todos" || book.category === activeCategory), [activeCategory]);

    const toggleSaved = (title: string) => {
      setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
    };

    return (
      <div className="min-h-screen overflow-hidden bg-background text-foreground bgcolor-white">

        <nav className="border-b border-border bg-background" aria-label="Navegación principal">
          <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8">
            <a href="#inicio" className="min-w-0 font-display text-2xl font-bold tracking-tight">Ink<span className="text-primary">Byte</span></a>
            <div className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.15em] md:flex">
              <Link to="/search" className="transition-colors hover:text-primary">{t("Search")}</Link>
              <a href="#categorias" className="transition-colors hover:text-primary">{t("Categories")}</a>
              <a href="#comunidad" className="transition-colors hover:text-primary">{t("Community")}</a>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" size="icon" aria-label={t("My books")}><Heart /></Button>
              <Button variant="ghost" size="icon" aria-label={t("My account")} asChild><Link to="/profile"><UserRound /></Link></Button>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label={t("Open menu")}><Menu /></Button>
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
                {t("A digital library built for unhurried discovery. Explore thousands of titles and download your next read in seconds.")}
              </p>
              <Button variant="editorial" size="editorial" asChild><Link to="/search"><Search /> {t("Search the library")}</Link></Button>
              {/* <p className="mt-4 text-xs text-muted-foreground">{t("HOME_POPULAR_GENRES")}</p> */}
            </div>

            <div className="relative col-span-12 mt-4 md:col-span-5 md:mt-0">
              <div className="absolute -left-7 -top-8 z-10 hidden size-28 rotate-[-7deg] items-center justify-center rounded-full bg-secondary p-4 text-center text-[10px] font-bold uppercase leading-tight tracking-wider md:flex">{t("Week's selection")}</div>
              <img src={heroImage} width={960} height={1280} alt="Libros y lector electrónico junto a una taza de café" className="aspect-[4/5] w-full rotate-[1.5deg] object-cover shadow-[16px_18px_0_var(--color-secondary)]" />
              <div className="absolute -bottom-5 right-3 bg-card px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">EPUB · PDF · MOBI</div>
            </div>
          </header>

          <section id="biblioteca" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{t("Discover")}</p>
                <h2 className="text-3xl sm:text-4xl">{t("Most read this week")}</h2>
              </div>
              <Link to="/search" className="shrink-0 text-xs font-bold uppercase tracking-wider underline decoration-primary underline-offset-4">{t("View catalog")}</Link>
            </div>

            <div id="categorias" className="mb-12 flex gap-2 overflow-x-auto pb-2">
              {["Todos", "Ficción", "Misterio", "Fantasía"].map((category: string) => (
                <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(category)} className="shrink-0 rounded-full shadow-none">{category}</Button>
              ))}
            </div>

            {visibleBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-9 gap-y-16 md:grid-cols-3">
                {visibleBooks.map((book, index) => (
                  <article key={book.title} className={`group ${index === 1 ? "md:mt-20" : ""}`}>
                    <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted">
                      <img src={bookCovers} width={1536} height={1024} loading="lazy" alt={`Portada de ${book.title}`} className={`h-full w-[300%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.02] ${book.cover === "center" ? "-translate-x-1/3" : book.cover === "right" ? "-translate-x-2/3" : ""}`} />
                      <Button variant="secondary" size="icon" onClick={() => toggleSaved(book.title)} aria-label={`${saved.includes(book.title) ? t("Remove") : t("Save")} ${book.title}`} className="absolute right-3 top-3 rounded-full shadow-md">
                        <Heart className={saved.includes(book.title) ? "fill-current" : ""} />
                      </Button>
                    </div>
                    <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                      <span>{book.category}</span><span>{book.format}</span>
                    </div>
                    <h3 className="mb-1 text-2xl transition-colors group-hover:text-primary">{book.title}</h3>
                    <p className="mb-5 text-sm italic text-muted-foreground">{book.author}</p>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs text-muted-foreground">{book.downloads} {t("Downloads")}</span>
                      <Button variant="link" size="sm" className="px-0 font-bold"><Download />{t("Download")}</Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border-y border-border py-20 text-center">
                <BookOpen className="mx-auto mb-4 size-9 text-primary" />
                <h3 className="mb-2 text-2xl">{t("We couldn't find that book yet")}</h3>
                <p className="text-sm text-muted-foreground">{t("Try another title, author or category.")}</p>
              </div>
            )}
          </section>

          <section id="comunidad" className="bg-primary text-primary-foreground">
            <div className="mx-auto grid max-w-7xl grid-cols-12">
              <div className="col-span-12 flex flex-col justify-center p-8 sm:p-12 md:col-span-6 md:p-20">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary">{t("A library that feels more yours")}</p>
                <h2 className="mb-7 text-4xl leading-tight sm:text-5xl">{t("Save, organize and return to your readings.")}</h2>
                <p className="mb-9 max-w-lg text-base leading-relaxed text-primary-foreground/80">{t("Create shelves, keep your download history and receive recommendations based on what you truly enjoy reading.")}</p>
                <div className="flex flex-wrap items-center gap-5">
                  <Button variant="editorialLight" size="editorial" asChild><Link to="/signup">{t("Create free account")}</Link></Button>
                  <span className="text-xs font-bold uppercase tracking-widest">{t("No subscription")}</span>
                </div>
              </div>
              <img src={readingNook} width={1024} height={1024} loading="lazy" alt="Rincón de lectura cálido con libro y lector electrónico" className="col-span-12 h-full min-h-80 w-full object-cover md:col-span-6" />
            </div>
          </section>
        </main>

        <footer className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-24 sm:px-8 md:grid-cols-3">
          <div>
            <p className="mb-4 font-display text-2xl font-bold">Ink<span className="text-primary">Byte</span></p>
            <p className="max-w-xs text-sm text-muted-foreground">{t("A calm digital library for curious readers.")}</p>
          </div>
          <div>
            <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-primary">{t("Explore")}</h2>
            <div className="flex flex-col gap-2 text-sm"><a href="#biblioteca">{t("Most downloaded")}</a><Link to="/search">{t("Search books")}</Link><a href="#comunidad">{t("Your library")}</a></div>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest">© 2026 InkByte</p>
            <p className="mt-3 text-xs text-muted-foreground">{t("Read more. Search less.")}</p>
          </div>
        </footer>
      </div>
    );
  }
