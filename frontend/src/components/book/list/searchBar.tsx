import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";

type SearchBarProps = {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export default function SearchBar({
  title,
  subtitle,
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  const { t } = useI18n();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t(subtitle)}
        </p>

        <h1 className="mb-8 text-4xl leading-tight sm:text-5xl">{t(title)}</h1>

        <form
          className="flex w-full border-2 border-foreground bg-card p-1.5 shadow-[7px_7px_0_var(--color-secondary)]"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
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
  );
}
