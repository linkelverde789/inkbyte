import { useI18n } from "@/i18n/i18nProvider";
import { List } from "@/types/list";
import { Check, ListPlus } from "lucide-react";

type ListCardProps = {
  active: boolean;
  hasBook: boolean;
  list: List;
  toggle: (list: List) => void;
};
export function ListCard(props: ListCardProps) {
  const { t } = useI18n();
  return (
    <button
      key={props.list.id}
      type="button"
      disabled={props.hasBook}
      onClick={() => {
        props.toggle(props.list);
      }}
      className={`group flex items-center gap-4 border p-4 text-left transition-all ${
        props.hasBook
          ? "cursor-not-allowed opacity-50"
          : props.active
            ? "border-primary bg-primary/5 shadow-[6px_6px_0_var(--color-primary)]"
            : "border-border hover:border-primary/50"
      }`}
    >
      <div
        className="size-14 shrink-0"
        style={{ background: props.list.cover ?? "var(--color-secondary)" }}
      />
      <div className="flex-1 overflow-hidden">
        <p className="truncate text-base font-bold">{props.list.name}</p>
        <p className="text-xs text-muted-foreground">
          {props.list.books.length} {t("books")}
        </p>
      </div>
      <div
        className={`flex size-9 shrink-0 items-center justify-center border ${props.active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
      >
        {props.active ? (
          <Check className="size-4" />
        ) : (
          <ListPlus className="size-4" />
        )}
      </div>
    </button>
  );
}
