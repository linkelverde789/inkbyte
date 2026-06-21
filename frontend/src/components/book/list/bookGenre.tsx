import { useI18n } from "@/i18n/i18nProvider";
import { BookGenre } from "@/types/book";

type BookGenresProps = {
  genres: BookGenre[];
};
export function BookGenres(props: BookGenresProps) {
  const { t } = useI18n();
  return (
    <div className="mb-1 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
        {props.genres.map((item) => (
          <span key={item.id ?? item.name}>{t(item.name)}</span>
        ))}
      </div>
    </div>
  );
}
