import { useI18n } from "@/i18n/i18nProvider";

export function WeekTopSelectionSkeleton() {
  const { t } = useI18n();
  return (
    <div className="relative col-span-12 mt-4 md:col-span-5 md:mt-0 ">
      <div className="absolute -left-7 -top-8 z-10 hidden size-28 rotate-[-7deg] items-center justify-center rounded-full bg-secondary p-4 text-center text-[10px] font-bold uppercase leading-tight tracking-wider md:flex">
        {t("Week's selection")}
      </div>
      <div className="aspect-[4/5] w-full rotate-[1.5deg] bg-muted shadow-[16px_18px_0_var(--color-secondary)] animate-pulse" />
      <div className="absolute -bottom-5 right-3 h-8 w-32 bg-muted px-5 py-3 shadow-lg animate-pulse" />
    </div>
  );
}
