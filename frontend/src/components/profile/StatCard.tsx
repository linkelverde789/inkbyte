import { useI18n } from "@/i18n/i18nProvider";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartItem } from "./UserStats";
import { BookX } from "lucide-react";
import { useEffect, useState } from "react";

const CHART_COLORS = [
  "oklch(0.62 0.15 35)",
  "oklch(0.74 0.13 75)",
  "oklch(0.55 0.10 175)",
  "oklch(0.48 0.09 235)",
  "oklch(0.68 0.14 350)",
  "oklch(0.42 0.04 60)",
];

export default function StatCard({
  title,
  subtitle,
  data,
  topLimit,
}: {
  title: string;
  subtitle: string;
  data: ChartItem[];
  topLimit: number;
}) {
  const { t } = useI18n();
  const [dataStats, setDataStats] = useState<ChartItem[]>([]);

  useEffect(() => {
    let result = data;
    if (result.length > 5) {
      result = [
        ...data.slice(0, topLimit),
        {
          name: "Other",
          value: data
            .slice(topLimit)
            .reduce((accumulator, value) => accumulator + value.value, 0),
        },
      ];
    }
    setDataStats(result);
  }, [data]);

  const hasData = data.length > 0 && data.some((item) => item.value > 0);

  if (!hasData) {
    return (
      <article className="bg-card p-6 shadow-[6px_7px_0_var(--color-secondary)] sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              {title}
            </p>
            <h3 className="mt-1 font-display text-2xl">{subtitle}</h3>
          </div>
          <span className="font-display text-3xl text-primary">0</span>
        </div>

        <div className="mt-8 flex h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 text-center">
          <BookX />

          <p className="mt-4 font-display text-lg">{t("No data")}</p>

          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {t("No data description")}
          </p>
        </div>
      </article>
    );
  }

  if (data.length > 5) {
    setDataStats([
      ...data.slice(0, topLimit),
      {
        name: "Other",
        value: data
          .slice(topLimit)
          .reduce((accumulator, value) => accumulator + value.value, 0),
      },
    ]);
  }

  const total = dataStats.reduce((s, d) => s + d.value, 0);
  const topicCount = dataStats.reduce((s) => s + 1, 0);
  return (
    <article className="bg-card p-6 shadow-[6px_7px_0_var(--color-secondary)] sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {title}
          </p>
          <h3 className="mt-1 font-display text-2xl">{subtitle}</h3>
        </div>
        <span className="font-display text-3xl text-primary">{topicCount}</span>
      </div>
      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[180px_1fr]">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataStats}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={2}
                stroke="var(--color-card)"
                strokeWidth={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                formatter={(value, name) => {
                  const v = typeof value === "number" ? value : 0;
                  return [`${v} ${t("books")}`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2 text-sm">
          {dataStats.map((d, i) => {
            const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
            return (
              <li key={d.name} className="flex items-center gap-3">
                <span
                  className="size-3 shrink-0"
                  style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                />
                <span className="flex-1 truncate">{t(d.name)}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
