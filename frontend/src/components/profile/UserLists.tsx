import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import ListCard from "./ListCard";
import { useEffect, useState } from "react";
import { api, API_ENDPOINTS } from "@/api";
import { API_DYNAMIC_ENDPOINTS } from "@/api/endpoints";
import { ListDialog } from "../dialogs/ListDialog";
import { List, ListForm, ListResponse } from "@/types/list";
import { UserListsSkeleton } from "../skeletons/profile/UserListSkeleton";
import { toast } from "sonner";

type ListDialogMode = "create" | "edit";
export default function UserLists() {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState<List[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<ListDialogMode>("create");
  const [selectedList, setSelectedList] = useState<List | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const res = await api.get<ListResponse>(API_ENDPOINTS.MY_LISTS);
        setLists(res.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchLists();
  }, []);

  async function createList(data: ListForm) {
    let res: List;
    try {
      res = await api.post<List>(API_ENDPOINTS.LISTS, data);
    } catch (error) {
      console.error(error);
      toast.error(t("Error creating list"));
      return;
    }
    setLists((prev) => [...prev, res]);
    toast.success(t("List created"));
  }

  async function updateList(data: ListForm) {
    if (!data.id) return;
    let res: List;
    try {
      res = await api.patch<List>(
        API_DYNAMIC_ENDPOINTS.EDIT_LISTS(data.id),
        data,
      );
    } catch (error) {
      console.error(error);
      toast.error(t("Error updating list"));
      return;
    }

    setLists((prev) => prev.map((item) => (item.id === res.id ? res : item)));
    toast.success(t("List updated"));
  }

  async function deleteList(listId: number | string) {
    try {
      await api.delete(API_DYNAMIC_ENDPOINTS.EDIT_LISTS(listId));
    } catch (error) {
      console.error(error);
      toast.error(t("Error deleting list"));
      return;
    }
    setLists((prev) => prev.filter((item) => item.id !== listId));
    toast.success(t("List deleted"));
  }

  function openCreateDialog() {
    setSelectedList(null);
    setDialogMode("create");
    setDialogOpen(true);
  }

  function openEditDialog(list: List) {
    setSelectedList(list);
    setDialogMode("edit");
    setDialogOpen(true);
  }

  async function handleSubmit(data: ListForm) {
    try {
      if (dialogMode === "create") {
        await createList(data);
      } else {
        await updateList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDialogOpen(false);
    }
  }

  if (loading) {
    return <UserListsSkeleton />;
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Shelves")}
          </p>
          <h2 className="mt-2 text-4xl">{t("My lists")}</h2>
        </div>

        <Button variant="editorial" size="editorial" onClick={openCreateDialog}>
          <Plus className="size-4" /> {t("New list")}
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          lists.map((list, i) => (
            <ListCard
              key={list.id}
              list={list}
              isEven={i % 2 === 0}
              deleteList={deleteList}
              onEdit={() => {
                openEditDialog(list);
              }}
            />
          ))}

        <button
          onClick={openCreateDialog}
          className="flex min-h-[260px] flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-card/50 p-6 text-center transition-colors hover:border-primary hover:bg-card"
        >
          <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Plus className="size-6" />
          </div>
          <p className="font-display text-xl">{t("Create list")}</p>
        </button>
      </div>

      <ListDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        mode={dialogMode}
        initialValue={selectedList ?? undefined}
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      />
    </section>
  );
}
