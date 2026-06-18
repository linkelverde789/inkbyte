import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";
import { useState } from "react";
import ApiSelect from "./bookSelect";
import { SelectTrigger } from "@radix-ui/react-select";

export default function SearchFilters() {
  const { t } = useI18n();

  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <section
      aria-label="Filtros de búsqueda"
      className="mb-12 border-b border-border pb-8"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
        <ApiSelect
          endpoint={"GENRES_LIST"}
          placeholder="Genres"
          value={1}
          onChange={() => {}}
        />
        <ApiSelect
          endpoint={"AUTHORS_LIST"}
          placeholder="Authors"
          value={1}
          onChange={() => {}}
        />
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
        <Button
          variant="ghost"
          size="editorial"
          onClick={() => {
            console.log("onclick");
          }}
        >
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
  );
}
