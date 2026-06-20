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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DownloadDropdown(props: DownloadDropdownProps) {
  const { t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("cursor-pointer", props.className)}>
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
            <a href={item.file} download={true}>
              {t("Download")} {getExtension(item.file)}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
