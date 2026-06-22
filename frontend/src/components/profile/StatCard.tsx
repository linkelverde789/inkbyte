import { useI18n } from "@/i18n/i18nProvider";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const CHART_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "color-mix(in oklab, var(--color-primary) 65%, white)",
  "color-mix(in oklab, var(--color-secondary) 70%, var(--color-primary))",
  "color-mix(in oklab, var(--color-accent) 60%, var(--color-foreground))",
];
export default function StatCard({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: { name: string; value: number }[];
}) {
  const { t } = useI18n();
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <article className="bg-card p-6 shadow-[6px_7px_0_var(--color-secondary)] sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {title}
          </p>
          <h3 className="mt-1 font-display text-2xl">{subtitle}</h3>
        </div>
        <span className="font-display text-3xl text-primary">{total}</span>
      </div>
      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[180px_1fr]">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
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
          {data.map((d, i) => {
            const pct = Math.round((d.value / total) * 100);
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
