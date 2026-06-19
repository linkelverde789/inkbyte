import { Button } from "@/components/ui/button";
import { WeekTopSelection } from "./weekSingularTopSelection";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Book } from "@/types/book";
import { useI18n } from "@/i18n/i18nProvider";

type HeaderProps = {
  book: Book;
};
export function Header(props: HeaderProps) {
  const { t } = useI18n();

  return (
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

      <WeekTopSelection book={props.book} />
    </header>
  );
}
