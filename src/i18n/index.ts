import esCommon from "./locales/es/common.json";
import esSections from "./locales/es/sections.json";
import esPages from "./locales/es/pages.json";
import esLegal from "./locales/es/legal.json";
import esData from "./locales/es/data.json";
import enCommon from "./locales/en/common.json";
import enSections from "./locales/en/sections.json";
import enPages from "./locales/en/pages.json";
import enLegal from "./locales/en/legal.json";
import enData from "./locales/en/data.json";

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export const LANG_META: Record<Lang, {
  htmlLang: string;
  ogLocale: string;
  intlLocale: string;
  label: string;
  altLabel: string;
  flagCode: string;
}> = {
  es: { htmlLang: "es", ogLocale: "es_ES", intlLocale: "es-ES", label: "Español", altLabel: "ES", flagCode: "es" },
  en: { htmlLang: "en", ogLocale: "en_US", intlLocale: "en-GB", label: "English", altLabel: "EN", flagCode: "gb" },
};

type Dict = Record<string, unknown>;

const RESOURCES: Record<Lang, Dict> = {
  es: { common: esCommon, sections: esSections, pages: esPages, legal: esLegal, data: esData },
  en: { common: enCommon, sections: enSections, pages: enPages, legal: enLegal, data: enData },
};

function lookup(dict: Dict, path: string[]): unknown {
  let node: unknown = dict;
  for (const key of path) {
    if (node && typeof node === "object" && key in (node as Dict)) {
      node = (node as Dict)[key];
    } else {
      return undefined;
    }
  }
  return node;
}

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const path = key.split(".");
  let value = lookup(RESOURCES[lang], path);
  if (value === undefined && lang !== DEFAULT_LANG) {
    value = lookup(RESOURCES[DEFAULT_LANG], path);
  }
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function translateList<T = string>(lang: Lang, key: string): T[] {
  const path = key.split(".");
  let value = lookup(RESOURCES[lang], path);
  if (value === undefined && lang !== DEFAULT_LANG) {
    value = lookup(RESOURCES[DEFAULT_LANG], path);
  }
  return Array.isArray(value) ? (value as T[]) : [];
}

export function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

export function withLang(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefix = langPrefix(lang);
  if (clean === "/" && prefix === "") return "/";
  if (clean === "/") return `${prefix}/`;
  return `${prefix}${clean}`;
}

export function stripLangPrefix(pathname: string): { lang: Lang; rest: string } {
  const match = pathname.match(/^\/(en)(?=\/|$)/);
  if (match) {
    const rest = pathname.slice(match[0].length) || "/";
    return { lang: match[1] as Lang, rest };
  }
  return { lang: DEFAULT_LANG, rest: pathname };
}
