"frontend/src/i18n/messages.ts";

import es from "./locales/es/es.json";
import en from "./locales/en/en.json";
import { getLocale } from "./locale";

const translations = {
  es,
  en,
} as const;

export type Locale = keyof typeof translations;

export function getMessages() {
  return translations[getLocale()];
}

export type MessageKey = keyof typeof es;
