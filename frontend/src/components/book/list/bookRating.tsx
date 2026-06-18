import { Star } from "lucide-react";

export default function BookRating({ rating }: { rating: number }) {
  return (
    <div
      className="mb-3 flex gap-1 text-secondary"
      aria-label={`${rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${star <= Math.round(rating) ? "fill-current" : "text-border"}`}
        />
      ))}
    </div>
  );
}
