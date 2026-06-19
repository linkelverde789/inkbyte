import { Star } from "lucide-react";

type Props = {
  rating?: number;
};
export function Rating(props: Props) {
  const rating = props.rating ?? 0;
  return (
    <div className="my-7 flex gap-1 text-secondary">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={star <= rating ? "fill-current" : "text-border"}
        />
      ))}
    </div>
  );
}
