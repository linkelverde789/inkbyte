import { useI18n } from "@/i18n/i18nProvider";
import { List } from "@/types/list";
import { Link } from "@tanstack/react-router";
import { BookOpen, ListMusic, Pencil, Trash2 } from "lucide-react";

type ListCardProps = {
  list: List;
  isEven: boolean;
  deleteList: (listId: number | string) => {};
  onEdit: (list: List) => void;
};
export default function ListCard(props: ListCardProps) {
  const { t } = useI18n();

  return (
    <article
      className={`group relative flex flex-col bg-card shadow-[6px_7px_0_var(--color-secondary)] transition-transform hover:-translate-y-1 ${props.isEven ? "sm:translate-y-4" : ""}`}
    >
      <div
        className="h-28 w-full"
        style={{
          background: props.list.cover
            ? `linear-gradient(
          135deg,
          var(--color-secondary) 0%,
          ${props.list.cover} 35%,
          ${props.list.cover} 100%
        )`
            : "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
        }}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ListMusic className="size-3.5" /> {props.list.books.length}{" "}
          {t("books")}
        </div>
        <h3 className="font-display text-2xl leading-tight">
          {props.list.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {props.list.description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <Link
            to="/list/$id"
            params={{ id: props.list.id.toString() }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary"
          >
            <BookOpen className="size-3.5" /> {t("Open")}
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                props.onEdit(props.list);
              }}
              className="grid size-8 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Pencil className="size-3.5" />
            </button>
            <button
              onClick={() => {
                props.deleteList(props.list.id);
              }}
              className="grid size-8 place-items-center text-muted-foreground hover:bg-muted hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
