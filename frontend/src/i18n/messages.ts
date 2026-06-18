// frontend/src/i18n/messages.ts

import es from "./locales/es/es.json";
import en from "./locales/en/en.json";

export const LOCALE = "es";

const translations = {
  es,
  en,
} as const;

export const MSG = translations[LOCALE];

export type MessageKey = keyof typeof es;

export function t(key: MessageKey): string {
  return translations[LOCALE][key];
}
