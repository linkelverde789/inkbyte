"frontend/src/i18n/locale.ts";

export const LOCALE_KEY = "app_locale";

export function getLocale(): "en" | "es" {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved === "es" || saved === "en") return saved;

  return "en"; // fallback
}

export function setLocale(locale: "en" | "es") {
  localStorage.setItem(LOCALE_KEY, locale);
}
