type Props = {
  title: string;
};
export function Title(props: Props) {
  return <h1 className="text-5xl leading-tight sm:text-6xl">{props.title}</h1>;
}
