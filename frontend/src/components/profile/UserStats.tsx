import { useI18n } from "@/i18n/i18nProvider";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import { api, API_ENDPOINTS } from "@/api";

export type ChartItem = {
  name: string;
  value: number;
};

type ListStats = {
  genres: ChartItem[];
  authors: ChartItem[];
  books_count: number;
};
export default function UserStats() {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<ListStats>();

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const res = await api.get<ListStats>(API_ENDPOINTS.MY_LISTS_STATS);
        setStats(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchLists();
  }, []);

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
          subtitle={`${stats?.books_count} ${t("Book Saved")}`}
          data={stats?.genres ?? []}
          topLimit={5}
        />
        <StatCard
          title={t("By author")}
          subtitle="Top 5"
          topLimit={5}
          data={stats?.authors ?? []}
        />
      </div>
    </section>
  );
}
