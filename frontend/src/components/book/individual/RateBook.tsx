import { Stars } from "@/components/ui/Stars";
import { useState } from "react";

type Props = {
  initialRating: number;
  loading?: boolean;
  onRate: (rating: number) => void;
};

export function RateBook({
  initialRating = 0,
  loading = false,
  onRate,
}: Props) {
  console.log("initialRating", initialRating);
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState(initialRating);

  function handleClick(value: number) {
    setRating(value);
    onRate(value);
  }

  console.log("rating ", rating);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">Tu valoración</span>

      <Stars
        rating={hover ?? rating}
        interactive
        onHover={setHover}
        onLeave={() => setHover(null)}
        onChange={handleClick}
      />

      {loading && (
        <span className="text-xs text-muted-foreground">Guardando...</span>
      )}
    </div>
  );
}
