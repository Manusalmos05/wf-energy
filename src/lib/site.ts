import { translate, LANG_META, type Lang } from "../i18n/index.ts";

export const SITE = "https://www.wf-energy.com";
export const BRAND = "White Fox Energy";
export const PHONE = "+34743098335";
export const PHONE_DISPLAY = PHONE.replace("+34", "");
export const TEL_HREF = `tel:${PHONE}`;
export const EMAIL = "info@wf-energy.com";
export const MAILTO_HREF = `mailto:${EMAIL}`;
export const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}`;
export const LOGO = `${SITE}/icon.svg`;
export const OG_IMAGE = `${SITE}/images/og-image.jpg`;
export const TWITTER_CARD = "summary_large_image";
export const INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1";

export const AREAS = ["Alicante", "Murcia", "Vega Baja del Segura"];

export const ORG_ID = `${SITE}/#empresa`;
export const SITE_ID = `${SITE}/#sitio`;
export const BLOG_ID = `${SITE}/blog/#blog`;

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLocaleTag(lang: Lang): string {
  return LANG_META[lang].intlLocale;
}

export function getOgLocale(lang: Lang): string {
  return LANG_META[lang].ogLocale;
}

export function getBusinessDescription(lang: Lang): string {
  return translate(lang, "pages.meta.site.businessDescription");
}

export function getBlogName(lang: Lang): string {
  return translate(lang, "pages.meta.site.blogName");
}

export function getBlogDescription(lang: Lang): string {
  return translate(lang, "pages.meta.site.blogDescription");
}

export function getOgImageAlt(lang: Lang): string {
  return translate(lang, "pages.meta.site.ogImageAlt");
}

export const OG_IMAGE_ALT = getOgImageAlt("es");
export const LOCALE = getLocaleTag("es");
export const OG_LOCALE = getOgLocale("es");
export const BUSINESS_DESCRIPTION = getBusinessDescription("es");
export const BLOG_NAME = getBlogName("es");
export const BLOG_DESCRIPTION = getBlogDescription("es");
