import { api } from "@/api";
import { API_DYNAMIC_ENDPOINTS } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import { List } from "@/types/list";
import { Check, ListPlus } from "lucide-react";
import { useState } from "react";

type AddToListSectionProps = {
  bookId: number;
  lists: List[];
  setLists: (prev: List[]) => void;
};

export function AddToListSection(props: AddToListSectionProps) {
  const { t } = useI18n();

  const [selectedList, setSelectedList] = useState<List>();

  const handleAddBook = async () => {
    if (!selectedList) return;

    if (checkIfListHasBook(selectedList)) return;

    try {
      const updatedList = await api.patch<List>(
        API_DYNAMIC_ENDPOINTS.EDIT_LISTS(selectedList.id),
        {
          book_ids: [props.bookId],
        },
      );

      props.setLists(
        props.lists.map((list: List) => {
          return list.id === updatedList.id ? updatedList : list;
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedList(undefined);
    }
  };

  const checkIfListHasBook = (list: List) => {
    return list?.books.some((book) => {
      return book.id === props.bookId;
    });
  };

  const toggle = (list: List) => {
    setSelectedList((prev) => (prev?.id === list.id ? undefined : list));
  };
  return (
    <section className="mt-20 border-t border-border pt-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("My lists")}
          </p>
          <h2 className="mt-2 text-4xl">{t("Add book to list")}</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t(
              "Add this book to one or more of your lists so you'll always have it on hand.",
            )}
          </p>
        </div>
        {/* TODO: Maybe implement this */}
        {/* <Button variant="outline" size="editorial">
          <Plus /> Nueva lista
        </Button> */}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {props.lists.map((list) => {
          const active = selectedList?.id === list.id;
          const hasBook = checkIfListHasBook(list);
          return (
            <ListCard
              active={active}
              hasBook={hasBook}
              list={list}
              toggle={(list) => {
                toggle(list);
              }}
            />
          );
        })}
      </div>
      {selectedList && (
        <div className="mt-6 flex items-center justify-between border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm">
          <span>
            <strong>1</strong> lista seleccionada
          </span>
          <Button variant="editorial" size="sm" onClick={handleAddBook}>
            Guardar cambios
          </Button>
        </div>
      )}
    </section>
  );
}

type ListCardProps = {
  active: boolean;
  hasBook: boolean;
  list: List;
  toggle: (list: List) => void;
};
function ListCard(props: ListCardProps) {
  const { t } = useI18n();
  return (
    <button
      key={props.list.id}
      type="button"
      disabled={props.hasBook}
      onClick={() => props.toggle(props.list)}
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
