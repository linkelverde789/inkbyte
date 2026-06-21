import { useI18n } from "@/i18n/i18nProvider";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AuthorFilter({ value, onChange }: Props) {
  const { t } = useI18n();
  return (
    <div>
      <label
        htmlFor="author-filter"
        className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
      >
        {t("Author")}
      </label>

      <input
        id="author-filter"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="h-11 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-primary"
        placeholder={t("Author's name")}
      />
    </div>
  );
}
