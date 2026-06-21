import { Star } from "lucide-react";

type Props = {
  rating?: number;
};

export function Rating({ rating = 0 }: Props) {
  return (
    <div className="my-7 flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, rating - (star - 1)));

        return (
          <div key={star} className="relative">
            <Star className="text-border" />

            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="text-yellow-400 fill-current" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
