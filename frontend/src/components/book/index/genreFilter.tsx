import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";

type GenreFilterProps = {
  genres: string[];
  activeGenre: string;
  setGenre: (value: string) => void;
};
export function GenreFilter(props: GenreFilterProps) {
  const { t } = useI18n();
  return (
    <div id="categorias" className="mb-12 flex gap-2 overflow-x-auto pb-2">
      {props.genres.map((category) => (
        <Button
          key={category}
          variant={props.activeGenre === category ? "default" : "outline"}
          size="sm"
          onClick={() => props.setGenre(category !== "All" ? category : "")}
          className="shrink-0 rounded-full shadow-none"
        >
          {t(category)}
        </Button>
      ))}
    </div>
  );
}
