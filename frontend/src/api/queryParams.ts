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

  const forbiddenKeys = new Set(["__proto__", "constructor", "prototype"]);

  Object.entries(params as Record<string, QueryValue>).forEach(
    ([key, value]) => {
      if (forbiddenKeys.has(key)) return;
      if (value == null) return;

      result[key] = Array.isArray(value) ? value.join(",") : String(value);
    },
  );

  return result;
}
