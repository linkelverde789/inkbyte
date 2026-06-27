import { api } from "@/api";
import { API_DYNAMIC_ENDPOINTS } from "@/api/endpoints";
import { List } from "@/types/list";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";
import { ProfileNavBar } from "@/components/ui/ProfileNavbar";
import { ListHero } from "@/components/profile/lists/ListHero";
import { ListBookDisplay } from "@/components/profile/lists/ListBookDisplay";
import { useRouter } from "@tanstack/react-router";
import { ListPageSkeleton } from "@/components/skeletons/lists/ListPageSkeleton";
import { toast } from "sonner";
async function fetchList(listId: string): Promise<List> {
  return await api.get<List>(API_DYNAMIC_ENDPOINTS.EDIT_LISTS(listId));
}

export const Route = createFileRoute("/_authenticated/list/$id")({
  loader: async ({ params }) => {
    return fetchList(params.id);
  },

  head: ({ loaderData }) => {
    const list = loaderData;

    return {
      meta: [
        {
          title: `${list?.name ?? "List"} — InkByte`,
        },
        {
          name: "description",
          content: list?.description ?? "Discover this list on InkByte.",
        },
      ],
    };
  },
  pendingComponent: ListPageSkeleton,
  component: ListPage,
});

function ListPage() {
  const { t } = useI18n();
  const list = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();

  async function refreshList() {
    await router.invalidate();
  }

  async function deleteList() {
    const promise = api.delete(API_DYNAMIC_ENDPOINTS.EDIT_LISTS(list.id));

    await toast.promise(promise, {
      loading: t("Deleting list..."),
      success: t("List deleted"),
      error: t("Error deleting list. Please try again later."),
    });

    navigate({
      to: "/profile",
      replace: true,
    });
  }
  async function removeBookFromList(bookId: string | number) {
    const bookIds = list.books
      .filter((item) => item.id !== bookId)
      .map((item) => item.id);

    try {
      await api.patch<List>(API_DYNAMIC_ENDPOINTS.EDIT_LISTS(list.id), {
        book_ids: bookIds,
      });
    } catch (error) {
      console.error(error);
      toast.error(t("Error removing book from list. Please try again later."));
      return;
    }
    toast.success(t("Book removed from list"));
    await router.invalidate();
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <ProfileNavBar />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-16">
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> {t("Back to my profile")}
        </Link>

        <ListHero list={list} deleteList={deleteList} onUpdated={refreshList} />

        <ListBookDisplay list={list} removeBookFromList={removeBookFromList} />
      </div>
    </main>
  );
}
