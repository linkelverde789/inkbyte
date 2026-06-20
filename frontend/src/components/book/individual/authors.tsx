import { useI18n } from "@/i18n/i18nProvider";
import { Author } from "@/types/book";

type Props = {
  authors?: Author[];
};
export function Authors(props: Props) {
  const { t } = useI18n();
  return (
    <p className="mt-3 text-lg italic text-muted-foreground">
      {t("by")} {props.authors?.map((author) => author.name).join(", ")}
    </p>
  );
}
