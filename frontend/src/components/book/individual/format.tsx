import { BookFormatsSkeleton } from "@/components/skeletons/book/BookFormatSkeleton";
import { useI18n } from "@/i18n/i18nProvider";
import { getExtension } from "@/routes/utils";
import { BookFile } from "@/types/book";

type Props = {
  format: BookFile[];
};
export function BookFormats(props: Props) {
  const { t } = useI18n();

  if (!props.format?.length) {
    return <BookFormatsSkeleton />;
  }

  return (
    <div className="mt-10 border-y border-border py-6">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">
        {t("Available formats")}
      </p>
      <p className="mt-2 text-lg">
        {props.format.map((item) => getExtension(item.file)).join(", ")}
      </p>
    </div>
  );
}
