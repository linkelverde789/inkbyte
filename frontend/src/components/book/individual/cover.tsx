type Props = {
  image?: string;
};
export function Cover(props: Props) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-muted shadow-[14px_16px_0_var(--color-secondary)]">
      <img src={props.image} className="h-full w-full object-cover" />
    </div>
  );
}
