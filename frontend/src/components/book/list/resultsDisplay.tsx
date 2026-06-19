import { Book } from "@/types/book";
import { BookList } from "./booksList";
import { ListPagination } from "./bookPagination";
import { BookOpen } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";

type ResultsDisplayProps = {
  loading: boolean;
  results: Book[];
  pageCount: number;
  page: number;
  setPage: (value: number) => void;
};
export function ResultsDisplay(props: ResultsDisplayProps) {
  console.log("props", props);
  const { t } = useI18n();
  return props.loading ? (
    <div className="py-20 text-center">{t("Loading books...")}</div>
  ) : props.results.length ? (
    <>
      <BookList data={props.results} />

      <ListPagination
        pageCount={props.pageCount}
        page={props.page}
        setPage={props.setPage}
      />
    </>
  ) : (
    <div className="border-y border-border bg-background py-20 text-center">
      <BookOpen className="mx-auto mb-4 size-9 text-primary" />
      <h2 className="mb-2 text-2xl">{t("We couldn't find that reading")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("Try changing the term or clearing the filters.")}
      </p>
    </div>
  );
}
