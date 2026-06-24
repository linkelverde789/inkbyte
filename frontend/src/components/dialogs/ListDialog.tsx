import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/TextArea";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18nProvider";

type ListDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  mode: "create" | "edit";
  initialValue?: {
    id?: number | string;
    name: string;
    description: string | null;
    cover: string | null;
  };
  onSubmit: (data: {
    id?: number | string;
    name: string;
    description: string;
    cover: string;
  }) => void;
};

const COLOR_PALETTE = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

export function ListDialog(props: ListDialogProps) {
  const { t } = useI18n();
  const [list, setList] = useState({
    id: undefined as number | string | undefined,
    name: "",
    description: "",
    cover: COLOR_PALETTE[0],
  });

  useEffect(() => {
    if (props.open) {
      setList({
        id: props.initialValue?.id,
        name: props.initialValue?.name ?? "",
        description: props.initialValue?.description ?? "",
        cover: props.initialValue?.cover ?? COLOR_PALETTE[0],
      });
    }
  }, [props.open, props.initialValue]);

  const handleSubmit = () => {
    if (!list.name.trim()) return;

    props.onSubmit(list);

    setList({
      id: undefined,
      name: "",
      description: "",
      cover: COLOR_PALETTE[0],
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="rounded-none border-border bg-card shadow-[9px_10px_0_var(--color-secondary)] sm:max-w-md">
        <DialogHeader>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Shelves")}
          </p>

          <DialogTitle className="font-display text-3xl leading-tight">
            {props.mode === "edit" ? t("Edit list") : t("Create list")}
          </DialogTitle>

          <DialogDescription>
            {props.mode === "edit"
              ? t("Modify your list's information.")
              : t("Name and description.")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Input
            placeholder={t("Name")}
            value={list.name}
            onChange={(e) => setList((p) => ({ ...p, name: e.target.value }))}
          />

          <Textarea
            placeholder={t("Description")}
            rows={3}
            value={list.description}
            onChange={(e) =>
              setList((p) => ({ ...p, description: e.target.value }))
            }
          />

          <div className="grid gap-2">
            <Label>Color</Label>

            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setList((p) => ({ ...p, cover: color }))}
                  className={`h-7 w-7 rounded-full border-2 transition ${
                    list.cover === color
                      ? "border-foreground scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => props.setOpen(false)}>
            {t("Cancel")}
          </Button>

          <Button variant="editorial" onClick={handleSubmit}>
            {props.mode === "edit" ? t("Save changes") : t("Create list")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
