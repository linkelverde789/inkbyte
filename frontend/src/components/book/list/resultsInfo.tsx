import { useI18n } from "@/i18n/i18nProvider";

type ResultsInfoProps = {
  loading: boolean;
  totalBooks: number;
};
export function ResultsInfo(props: ResultsInfoProps) {
  const { t } = useI18n();
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {t("Results")}
        </p>
        {!props.loading ? (
          <h2 className="text-2xl sm:text-3xl">
            {props.totalBooks} {t("books found")}
          </h2>
        ) : (
          ""
        )}
      </div>
      <span className="hidden text-xs text-muted-foreground sm:block">
        {t("Sorted by relevance")}
      </span>
    </div>
  );
}
