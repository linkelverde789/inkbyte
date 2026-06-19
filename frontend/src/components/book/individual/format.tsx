import { useI18n } from "@/i18n/i18nProvider";

type Props = {
  format?: string;
};
export function BookFormats(props: Props) {
  const { t } = useI18n();

  const formats = props.format ?? "PDF";
  return (
    <div className="mt-10 border-y border-border py-6">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">
        {t("Available formats")}
      </p>
      <p className="mt-2 text-lg">{formats}</p>
    </div>
  );
}
