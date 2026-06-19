import AuthorFilter from "./authorFilters";

type Props = {
  author: string | number;
  format?: string;
  onAuthorChange: (value: string) => void;
  onFormatChange?: (value: string) => void;
};

export default function AdvancedFilters({
  author,
  format,
  onAuthorChange,
  onFormatChange,
}: Props) {
  return (
    <div className="page-in mt-4 grid gap-3 border-l-4 border-secondary bg-background p-5 sm:grid-cols-2">
      <AuthorFilter value={author.toString()} onChange={onAuthorChange} />
      {/* <FormatFilter value={format} onChange={onFormatChange} t={t} /> */}
    </div>
  );
}
