function BookDescription({ description }: { description?: string }) {
  if (!description) return null;

  return (
    <p className="mb-4 text-sm leading-6 text-muted-foreground">
      {description.length > 250
        ? description.slice(0, 250) + "..."
        : description}
    </p>
  );
}
export default BookDescription;
