import { translateList, type Lang } from "../i18n/index.ts";

export interface Faq { q: string; a: string }

export function getFaqs(lang: Lang): Faq[] {
  return translateList<Faq>(lang, "data.faqs");
}

export const FAQS = getFaqs("es");
