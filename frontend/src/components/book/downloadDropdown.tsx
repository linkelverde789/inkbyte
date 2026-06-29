import { BookFile } from "@/types/book";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";

type DownloadDropdownProps = {
  files: BookFile[];
  className: string;
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getExtension } from "@/routes/utils";
import { toast } from "sonner";
import { api } from "@/api";
import { API_DYNAMIC_ENDPOINTS } from "@/api/endpoints";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

async function downloadFile(fileId: number) {
  try {
    const blob = await api.get<Blob>(
      API_DYNAMIC_ENDPOINTS.BOOK_DOWNLOAD_FILE(fileId),
      {
        blob: true,
        auth: true,
      },
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    toast.error("Error downloading file");
  }
}

export function DownloadDropdown(props: DownloadDropdownProps) {
  const { t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="editorial"
          size="editorial"
          className={cn("cursor-pointer", props.className)}
        >
          <Download /> {t("Download")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {props.files.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onSelect={() => {}}
            className="cursor-pointer"
          >
            <DropdownMenuItem
              key={item.id}
              onSelect={(e) => {
                e.preventDefault();
                downloadFile(item.id);
              }}
              className="cursor-pointer"
            >
              {t("Download")} {getExtension(item.file)}
            </DropdownMenuItem>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
