import type { Lang } from "../i18n/index.ts";

const serverStore: Record<string, string> = {};

type WindowWithArticles = Window & {
  __ARTICLE_HTML__?: Record<string, string>;
};

function storeKey(lang: Lang, slug: string): string {
  return `${lang}:${slug}`;
}

export function seedArticleHtml(map: Record<string, string>): void {
  Object.assign(serverStore, map);
}

export function readArticleHtml(lang: Lang, slug: string): string | null {
  const key = storeKey(lang, slug);
  if (typeof window !== "undefined") {
    const store = (window as WindowWithArticles).__ARTICLE_HTML__ ?? {};
    return store[key] ?? store[slug] ?? null;
  }
  return serverStore[key] ?? serverStore[slug] ?? null;
}

export function articleHtmlPath(lang: Lang, slug: string): string {
  return lang === "es" ? `blog/articles/${slug}.html` : `blog/articles/${slug}.${lang}.html`;
}
