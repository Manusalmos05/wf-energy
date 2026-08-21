import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router";
import { DEFAULT_LANG, translate, translateList, stripLangPrefix, withLang, type Lang } from "./index.ts";

interface LanguageContextValue {
  lang: Lang;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tList: <T = string>(key: string) => T[];
  path: (target: string) => string;
  switchTo: (target: Lang) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, lang }: { children: ReactNode; lang?: Lang }) {
  const location = useLocation();
  const effective: Lang = lang ?? stripLangPrefix(location.pathname).lang;

  const value = useMemo<LanguageContextValue>(() => ({
    lang: effective,
    t: (key, vars) => translate(effective, key, vars),
    tList: <T,>(key: string) => translateList<T>(effective, key),
    path: (target) => withLang(effective, target),
    switchTo: (target) => withLang(target, stripLangPrefix(location.pathname).rest),
  }), [effective, location.pathname]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: DEFAULT_LANG,
      t: (key, vars) => translate(DEFAULT_LANG, key, vars),
      tList: <T,>(key: string) => translateList<T>(DEFAULT_LANG, key),
      path: (target) => withLang(DEFAULT_LANG, target),
      switchTo: (target) => withLang(target, "/"),
    };
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
