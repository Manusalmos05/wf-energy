import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App.tsx";
import { getArticles } from "./data/blog.ts";
import { seedArticleHtml } from "./lib/articleHtml.ts";
import { articleGraph, blogGraph, homeGraph } from "./lib/structuredData.ts";
import {
  SITE,
  BRAND,
  OG_IMAGE,
  TWITTER_CARD,
  INDEXABLE,
  getBusinessDescription,
  getBlogName,
  getBlogDescription,
  getOgImageAlt,
  getOgLocale,
} from "./lib/site.ts";
import { LANGS, withLang, translate, LANG_META, DEFAULT_LANG, type Lang } from "./i18n/index.ts";

export interface SiteMeta {
  siteName: string;
  ogLocale: string;
  twitterCard: string;
}

export function getSiteMeta(): SiteMeta {
  return { siteName: BRAND, ogLocale: getOgLocale(DEFAULT_LANG), twitterCard: TWITTER_CARD };
}

const BRAND_SUFFIX_LIMIT = 45;
const DESCRIPTION_LIMIT = 155;

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export interface PrerenderRoute {
  path: string;
  out: string;
  title: string;
  description: string;
  canonical: string | null;
  ogType: string;
  ogLocale: string;
  htmlLang: string;
  lang: Lang;
  image: string;
  imageAlt: string;
  robots: string;
  slugs: string[];
  lastmod: string | null;
  published: string | null;
  sitemap: boolean;
  jsonLd: unknown | null;
  alternates: HreflangAlternate[];
}

function withBrand(title: string): string {
  return title.length <= BRAND_SUFFIX_LIMIT ? `${title} | ${BRAND}` : title;
}

function clamp(text: string, max = DESCRIPTION_LIMIT): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(" ");
  const kept = boundary > max * 0.6 ? cut.slice(0, boundary) : cut;
  return `${kept.replace(/[\s,;:.…-]+$/, "")}…`;
}

function absoluteUrl(lang: Lang, path: string): string {
  const p = withLang(lang, path);
  const trimmed = p === "/" ? "/" : `${p.replace(/\/+$/, "")}/`;
  return `${SITE}${trimmed}`;
}

function pageOut(lang: Lang, tail: string): string {
  const prefix = lang === DEFAULT_LANG ? "" : `${lang}/`;
  return `${prefix}${tail}`;
}

function alternatesFor(pathTemplate: string, activeLang: Lang, canonicalHref: string | null): HreflangAlternate[] {
  const alts: HreflangAlternate[] = LANGS.map((l) => ({
    hreflang: LANG_META[l].htmlLang,
    href: absoluteUrl(l, pathTemplate),
  }));
  if (canonicalHref) {
    alts.push({ hreflang: "x-default", href: absoluteUrl(DEFAULT_LANG, pathTemplate) });
  }
  return alts.filter((a, i, arr) => arr.findIndex((b) => b.hreflang === a.hreflang && b.href === a.href) === i);
}

interface LegalPageDef { key: string; path: string }
const LEGAL_PAGES: LegalPageDef[] = [
  { key: "notice", path: "/aviso-legal" },
  { key: "privacy", path: "/politica-de-privacidad" },
  { key: "cookies", path: "/politica-de-cookies" },
  { key: "accessibility", path: "/accesibilidad" },
];

function articleStamp(a: { date: string; updated?: string }): string {
  return a.updated && a.updated > a.date ? a.updated : a.date;
}

export function getRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];

  for (const lang of LANGS) {
    const articles = getArticles(lang);
    const newest = articles.reduce((latest, a) => (articleStamp(a) > latest ? articleStamp(a) : latest), articles[0] ? articleStamp(articles[0]) : "");
    const homeCanonical = absoluteUrl(lang, "/");
    const blogCanonical = absoluteUrl(lang, "/blog");
    const businessDesc = getBusinessDescription(lang);
    const ogAlt = getOgImageAlt(lang);
    const ogLocale = getOgLocale(lang);
    const htmlLang = LANG_META[lang].htmlLang;

    const homeTitle = translate(lang, "pages.meta.home.title");

    routes.push({
      path: withLang(lang, "/"),
      out: pageOut(lang, "index.html"),
      title: homeTitle,
      description: businessDesc,
      canonical: homeCanonical,
      ogType: "website",
      ogLocale,
      htmlLang,
      lang,
      image: OG_IMAGE,
      imageAlt: ogAlt,
      robots: INDEXABLE,
      slugs: [],
      lastmod: null,
      published: null,
      sitemap: true,
      jsonLd: homeGraph(lang),
      alternates: alternatesFor("/", lang, homeCanonical),
    });

    routes.push({
      path: withLang(lang, "/blog"),
      out: pageOut(lang, "blog/index.html"),
      title: `${getBlogName(lang)} | ${BRAND}`,
      description: getBlogDescription(lang),
      canonical: blogCanonical,
      ogType: "website",
      ogLocale,
      htmlLang,
      lang,
      image: OG_IMAGE,
      imageAlt: ogAlt,
      robots: INDEXABLE,
      slugs: [],
      lastmod: newest || null,
      published: null,
      sitemap: true,
      jsonLd: blogGraph(lang),
      alternates: alternatesFor("/blog", lang, blogCanonical),
    });

    for (const a of articles) {
      const articleCanonical = absoluteUrl(lang, `/blog/${a.slug}`);
      routes.push({
        path: withLang(lang, `/blog/${a.slug}`),
        out: pageOut(lang, `blog/${a.slug}/index.html`),
        title: withBrand(a.title),
        description: clamp(a.excerpt),
        canonical: articleCanonical,
        ogType: "article",
        ogLocale,
        htmlLang,
        lang,
        image: `${SITE}/${a.cover}`,
        imageAlt: a.title,
        robots: INDEXABLE,
        slugs: [a.slug],
        lastmod: articleStamp(a),
        published: a.date,
        sitemap: true,
        jsonLd: articleGraph(a, lang),
        alternates: alternatesFor(`/blog/${a.slug}`, lang, articleCanonical),
      });
    }

    for (const legal of LEGAL_PAGES) {
      const canonical = absoluteUrl(lang, legal.path);
      routes.push({
        path: withLang(lang, legal.path),
        out: pageOut(lang, `${legal.path.slice(1)}/index.html`),
        title: withBrand(translate(lang, `pages.meta.legal.${legal.key}.title`)),
        description: translate(lang, `pages.meta.legal.${legal.key}.description`),
        canonical,
        ogType: "website",
        ogLocale,
        htmlLang,
        lang,
        image: OG_IMAGE,
        imageAlt: ogAlt,
        robots: INDEXABLE,
        slugs: [],
        lastmod: null,
        published: null,
        sitemap: false,
        jsonLd: null,
        alternates: alternatesFor(legal.path, lang, canonical),
      });
    }
  }

  routes.push({
    path: "/pagina-que-no-existe",
    out: "404.html",
    title: translate(DEFAULT_LANG, "pages.meta.notFound.title"),
    description: translate(DEFAULT_LANG, "pages.meta.notFound.description"),
    canonical: null,
    ogType: "website",
    ogLocale: getOgLocale(DEFAULT_LANG),
    htmlLang: LANG_META[DEFAULT_LANG].htmlLang,
    lang: DEFAULT_LANG,
    image: OG_IMAGE,
    imageAlt: getOgImageAlt(DEFAULT_LANG),
    robots: "noindex, follow",
    slugs: [],
    lastmod: null,
    published: null,
    sitemap: false,
    jsonLd: null,
    alternates: [],
  });

  return routes;
}

export function render(
  location = "/",
  preloaded: Record<string, string> = {},
): string {
  seedArticleHtml(preloaded);
  return renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  );
}
