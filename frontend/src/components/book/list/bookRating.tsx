import { Star } from "lucide-react";

type BookRatingProps = {
  rating: number;
  size?: string | undefined;
};
export default function BookRating(props: BookRatingProps) {
  return (
    <div
      className="mb-2 flex gap-1 text-secondary"
      aria-label={`${props.rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, props.rating - (star - 1)));

        return (
          <div key={star} className="relative">
            <Star className={`${props.size} text-border`} />

            <div
              className="absolute inset-0 overflow-hidden "
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${props.size} fill-current`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
