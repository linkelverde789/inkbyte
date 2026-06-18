type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number)[];

export function toQueryParams<T extends object>(
  params: T,
): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(params as Record<string, QueryValue>).forEach(
    ([key, value]) => {
      if (value == null) return;

      result[key] = Array.isArray(value) ? value.join(",") : String(value);
    },
  );

  return result;
}
