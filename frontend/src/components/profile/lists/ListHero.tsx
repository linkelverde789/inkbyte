import { api } from "@/api";
import { API_DYNAMIC_ENDPOINTS } from "@/api/endpoints";
import { ListDialog } from "@/components/dialogs/ListDialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { timeAgo } from "@/routes/utils";
import { List, ListForm } from "@/types/list";
import { Library, ListMusic, Pencil, Share2, Trash2 } from "lucide-react";
import { useState } from "react";

type ListHeroProps = {
  list: List;
  onUpdated: () => void;
  deleteList: () => void;
};
export function ListHero(props: ListHeroProps) {
  const { t } = useI18n();

  const [edit, setEdit] = useState(false);

  async function updateList(data: ListForm) {
    if (!data.id) return;

    await api.patch<List>(API_DYNAMIC_ENDPOINTS.EDIT_LISTS(data.id), data);

    props.onUpdated();
  }

  async function handleSubmit(data: ListForm) {
    try {
      await updateList(data);
    } finally {
      setEdit(false);
    }
  }

  return (
    <header className="grid gap-8 bg-card p-7 shadow-[9px_10px_0_var(--color-secondary)] sm:p-10 md:grid-cols-[260px_1fr]">
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{
          background: props.list.cover
            ? props.list.cover
            : "var(--color-secondary)",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-2 gap-1 p-3">
          {props.list.books.slice(0, 4).map((book, i) => (
            <div
              key={book.id}
              className="overflow-hidden bg-background/20 shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
            >
              <img
                src={book.image}
                className="h-full w-full max-w-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t("Personal bookshelf")}
        </p>

        <h1 className="mt-2 text-5xl leading-tight">{props.list.name}</h1>

        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          {props.list.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <Library className="size-5.5 text-primary" />
            {props.list.books.length} {t("books")}
          </span>

          <span className="text-muted-foreground">
            {` - ${t("Updated")} ${timeAgo(props.list.updated_at, t)}`}
          </span>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            variant="editorial"
            size="editorial"
            onClick={() => {
              setEdit(true);
            }}
          >
            <Pencil className="size-4" /> {t("Edit list")}
          </Button>

          <Button variant="outline" size="editorial">
            <Share2 className="size-4" /> {t("Share")}
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              props.deleteList();
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" /> {t("Delete")}
          </Button>
        </div>
      </div>
      <ListDialog
        open={edit}
        setOpen={setEdit}
        mode={"edit"}
        initialValue={props.list}
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      />
    </header>
  );
}
