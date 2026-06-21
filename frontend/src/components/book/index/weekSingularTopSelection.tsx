import { useI18n } from "@/i18n/i18nProvider";
import heroImage from "@/assets/inkbyte-hero.jpg";
import { Book } from "@/types/book";
import { Link } from "@tanstack/react-router";

export type WeekTopSelectionProps = {
  book: Book | undefined;
};

export function WeekTopSelection(props: WeekTopSelectionProps) {
  const { t } = useI18n();

  return (
    <div className="relative col-span-12 mt-4 md:col-span-5 md:mt-0">
      {props.book && (
        <>
          <div className="absolute -left-7 -top-8 z-10 hidden size-28 rotate-[-7deg] items-center justify-center rounded-full bg-secondary p-4 text-center text-[10px] font-bold uppercase leading-tight tracking-wider md:flex">
            {t("Week's selection")}
          </div>

          <Link
            to="/books/$id"
            params={{ id: props.book.id.toString() }}
            className="hover:text-primary"
          >
            <img
              src={props.book.image ?? heroImage}
              width={960}
              height={1280}
              alt="Libros y lector electrónico junto a una taza de café"
              className="aspect-[4/5] w-full rotate-[1.5deg] object-cover shadow-[16px_18px_0_var(--color-secondary)]"
            />

            <div className="absolute -bottom-5 right-3 bg-card px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">
              EPUB · PDF · MOBI
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
