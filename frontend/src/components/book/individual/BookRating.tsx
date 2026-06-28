import { Stars } from "@/components/ui/Stars";

type Props = {
  rating: number;
  size?: string;
};

export default function BookRatingSecond({ rating, size = "size-5" }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Stars rating={rating} size={size} />

      <span className="text-sm font-medium text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
