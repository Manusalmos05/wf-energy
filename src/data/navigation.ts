import { translate, type Lang } from "../i18n/index.ts";

export type NavItem = { key: string; label: string; anchor?: string; to?: string };

const KEYS = ["home", "services", "projects", "kits", "blog", "faq", "contact"] as const;

export function getNav(lang: Lang): NavItem[] {
  return KEYS.map((key) => {
    const label = translate(lang, `common.nav.menu.${key}.label`);
    if (key === "blog") return { key, label, to: "/blog" };
    const anchor = translate(lang, `common.nav.menu.${key}.anchor`);
    return { key, label, anchor };
  });
}
