import { Book } from "@/types/book";
import { DownloadDropdown } from "../downloadDropdown";
import { getExtension } from "@/routes/utils";

function BookFooter({ book }: { book: Book }) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
        {book.files.map((item) => getExtension(item.file)).join(", ")}
      </span>

      <div className="flex items-center gap-2">
        <DownloadDropdown files={book.files} className="rounded-none" />
      </div>
    </div>
  );
}
export default BookFooter;
