import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18nProvider";
import ListCard from "./ListCard";

export default function UserLists() {
  const { t } = useI18n();
  const placeholder_lists = [
    {
      id: "1",
      name: "Para releer en otoño",
      description: "Novelas que merecen una segunda vuelta junto a la ventana.",
      count: 12,
      cover:
        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
      bookSlugs: [
        "circe",
        "la-paciente-silenciosa",
        "yellowface",
        "el-infinito-en-un-junco",
      ],
    },
    {
      id: "2",
      name: "Cómics indie",
      description:
        "Autoediciones y pequeñas imprentas que vale la pena seguir.",
      count: 8,
      cover:
        "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
      bookSlugs: ["persépolis", "yellowface"],
    },
    {
      id: "3",
      name: "Ensayos sobre el oficio",
      description: "Cartas, diarios y reflexiones de escritores en activo.",
      count: 5,
      cover:
        "linear-gradient(135deg, var(--color-accent), var(--color-secondary))",
      bookSlugs: ["el-infinito-en-un-junco", "circe"],
    },
    {
      id: "4",
      name: "Pendientes 2026",
      description: "Lo que quiero terminar antes de fin de año.",
      count: 17,
      cover:
        "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
      bookSlugs: [
        "proyecto-hail-mary",
        "la-paciente-silenciosa",
        "yellowface",
        "circe",
        "persépolis",
      ],
    },
  ];
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Shelves")}
          </p>
          <h2 className="mt-2 text-4xl">{t("My lists")}</h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            {t(
              "Organize your reading lists on your own shelves. Create, edit, and share them whenever you want.",
            )}
          </p>
        </div>
        <Button variant="editorial" size="editorial">
          <Plus className="size-4" /> {t("New list")}
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholder_lists.map((list, i) => (
          <ListCard list={list} i={i} />
        ))}

        <button className="flex min-h-[260px] flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-card/50 p-6 text-center transition-colors hover:border-primary hover:bg-card">
          <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Plus className="size-6" />
          </div>
          <p className="font-display text-xl">{t("Create list")}</p>
          <p className="text-xs text-muted-foreground">
            {t("Organize your books however you like")}
          </p>
        </button>
      </div>
    </section>
  );
}
