import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ApiSelect from "./bookSelect";
import { useI18n } from "@/i18n/i18nProvider";

type SearchFiltersProps = {
  genres: number | undefined;
  authors: number | undefined;
  advancedOpen: boolean;
  setAdvancedOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onGenresChange: (value: number) => void;
  onAuthorsChange: (value: number) => void;
  onClear: () => void;
};

export default function SearchFilters({
  genres,
  authors,
  advancedOpen,
  setAdvancedOpen,
  onGenresChange,
  onAuthorsChange,
  onClear,
}: SearchFiltersProps) {
  const { t } = useI18n();
  return (
    <section
      aria-label="Filtros de búsqueda"
      className="mb-12 border-b border-border pb-8"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
        <ApiSelect
          endpoint={"genres"}
          placeholder="Genres"
          value={genres}
          onChange={onGenresChange}
        />

        <ApiSelect
          endpoint={"authors"}
          placeholder="Authors"
          value={authors}
          onChange={onAuthorsChange}
        />

        {/* <Button
          variant="outline"
          size="editorial"
          className="rounded-none bg-background shadow-none"
          onClick={() => {
            setAdvancedOpen((open) => !open);
          }}
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
        </Button> */}

        <Button variant="ghost" size="editorial" onClick={onClear}>
          <X /> {t("Clear")}
        </Button>
      </div>

      {/* {advancedOpen && <AdvancedFilters author={authors} />} */}
    </section>
  );
}
