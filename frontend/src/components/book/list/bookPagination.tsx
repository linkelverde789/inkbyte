import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useI18n } from "@/i18n/i18nProvider";

type ListPaginationProps = {
  page: number;
  pageCount: number;
  setPage: (value: number) => void;
};

export function ListPagination(props: ListPaginationProps) {
  const { t } = useI18n();

  const getVisiblePages = (current: number, total: number) => {
    const delta = 1;

    const range = [];

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    range.push(1);

    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < total - 1) range.push("...");

    if (total > 1) range.push(total);

    return range;
  };

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              props.setPage(Math.min(props.pageCount, props.page - 1));
            }}
            aria-disabled={props.page === 1}
            className={props.page === 1 ? "pointer-events-none opacity-40" : ""}
          >
            {t("Previous")}
          </PaginationPrevious>
        </PaginationItem>
        {getVisiblePages(props.page, props.pageCount).map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "..." ? (
              <span className="px-2 text-muted-foreground">...</span>
            ) : (
              <PaginationLink
                href="#"
                isActive={props.page === item}
                onClick={(event) => {
                  event.preventDefault();
                  if (typeof item === "number") {
                    props.setPage(item);
                  }
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault();
              props.setPage(Math.max(props.pageCount, props.page + 1));
            }}
            aria-disabled={props.page === props.pageCount}
            className={
              props.page === props.pageCount
                ? "pointer-events-none opacity-40"
                : ""
            }
          >
            {t("Next")}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
