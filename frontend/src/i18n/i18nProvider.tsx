// frontend/src/i18n/I18nProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { LOCALE_KEY, getLocale as getStoredLocale } from "./locale";
import es from "./locales/es/es.json";
import en from "./locales/en/en.json";

const translations = {
  es,
  en,
} as const;

type Locale = keyof typeof translations;

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof es) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale());

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const t = (key: keyof typeof es) => {
    return translations[locale][key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
