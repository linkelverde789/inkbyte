import { useI18n } from "@/i18n/i18nProvider";
import { BookGenre } from "@/types/book";

type Props = {
  genres?: BookGenre[];
};
export function Genres(props: Props) {
  const { t } = useI18n();
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
      {props.genres?.map((genre) => t(genre.name)).join(", ")}
    </p>
  );
}
