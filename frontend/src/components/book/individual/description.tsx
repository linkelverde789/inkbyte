type Props = {
  description?: string;
};
export function Description(props: Props) {
  const description = props.description ?? "";
  return (
    <p className="max-w-2xl text-base leading-8 text-muted-foreground">
      {props.description}
    </p>
  );
}
