import { useI18n } from "@/i18n/i18nProvider";
import StatCard from "./StatCard";

const GENRE_DATA = [
  { name: "Espionage", value: 24 },
  { name: "Poetry", value: 12 },
  { name: "Sonnet", value: 7 },
  { name: "Comics", value: 9 },
  { name: "Sci-Fi", value: 15 },
  { name: "Memoir", value: 6 },
];

const AUTHOR_DATA = [
  { name: "Ursula K. Le Guin", value: 8 },
  { name: "Italo Calvino", value: 6 },
  { name: "Clarice Lispector", value: 5 },
  { name: "Haruki Murakami", value: 7 },
  { name: "Octavia E. Butler", value: 4 },
  { name: "Other", value: 11 },
];
export default function UserStats() {
  const { t } = useI18n();
  return (
    <section>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t("Your libraries in stats")}
        </p>
        <h2 className="mt-2 text-4xl">{t("Summary of saved readings")}</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {t(
            "A quick look at the genres and authors that dominate your personal collection.",
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <StatCard
          title={t("By genre")}
          subtitle={`37 ${t("Book Saved")}`}
          data={GENRE_DATA}
        />
        <StatCard title={t("By author")} subtitle="Top 5" data={AUTHOR_DATA} />
      </div>
    </section>
  );
}
