import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  max?: number;
  size?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onLeave?: () => void;
};

export function Stars({
  rating,
  max = 5,
  size = "size-5",
  interactive = false,
  onChange,
  onHover,
  onLeave,
}: Props) {
  return (
    <div
      className="flex gap-1 text-secondary"
      aria-label={`${rating} de ${max} estrellas`}
      onMouseLeave={onLeave}
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;

        const fill = Math.max(0, Math.min(1, rating - (star - 1)));

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={cn("relative", interactive && "cursor-pointer")}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => onHover?.(star)}
          >
            <Star className={`${size} text-border`} />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${size} fill-current`} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
