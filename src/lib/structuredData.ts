import { getFaqs } from "../data/faqs.ts";
import { getServices } from "../data/services.ts";
import { getKits } from "../data/kits.ts";
import { KIT_SPECS } from "../data/kitSpecs.ts";
import { getSortedArticles, type BlogArticle } from "../data/blog.ts";
import {
  SITE,
  BRAND,
  PHONE,
  EMAIL,
  WHATSAPP,
  LOGO,
  OG_IMAGE,
  AREAS,
  ORG_ID,
  SITE_ID,
  BLOG_ID,
  slugify,
  getLocaleTag,
  getBusinessDescription,
  getBlogName,
  getBlogDescription,
} from "./site.ts";
import { withLang, translate, type Lang } from "../i18n/index.ts";

type Node = Record<string, unknown>;

function areaServed(): Node[] {
  return AREAS.map((name) => ({ "@type": "AdministrativeArea", name }));
}

function serviceId(title: string): string {
  return `${SITE}/#servicio-${slugify(title)}`;
}

function kitId(_title: string, slug?: string): string {
  return `${SITE}/#kit-${slug ?? "kit"}`;
}

export function articleId(slug: string): string {
  return `${SITE}/blog/${slug}/#articulo`;
}

function absolute(lang: Lang, pathOrEmpty: string): string {
  const p = withLang(lang, pathOrEmpty);
  return `${SITE}${p}${p.endsWith("/") ? "" : "/"}`.replace(/\/{2,}$/, "/");
}

function website(lang: Lang): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absolute(lang, "/"),
    name: BRAND,
    description: getBusinessDescription(lang),
    inLanguage: getLocaleTag(lang),
    publisher: { "@id": ORG_ID },
  };
}

function organization(lang: Lang, withCatalog = false): Node {
  const services = getServices(lang);
  const node: Node = {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: BRAND,
    url: absolute(lang, "/"),
    description: getBusinessDescription(lang),
    image: OG_IMAGE,
    logo: LOGO,
    telephone: PHONE,
    email: EMAIL,
    sameAs: [WHATSAPP],
    knowsLanguage: getLocaleTag(lang),
    currenciesAccepted: "EUR",
    areaServed: areaServed(),
  };

  if (withCatalog) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: translate(lang, "sections.services.title"),
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(s.title) },
      })),
    };
  }

  return node;
}

function services(lang: Lang): Node[] {
  return getServices(lang).map((s) => ({
    "@type": "Service",
    "@id": serviceId(s.title),
    name: s.title,
    serviceType: s.title,
    description: s.desc,
    image: `${SITE}/${s.img}`,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
  }));
}

function products(lang: Lang): Node[] {
  return getKits(lang).map((k) => {
    const spec = KIT_SPECS[k.slug];
    const node: Node = {
      "@type": "Product",
      "@id": kitId(k.title, k.slug),
      name: k.title,
      image: spec?.productImage ? `${SITE}/${spec.productImage}` : OG_IMAGE,
      brand: { "@type": "Brand", name: BRAND },
      offers: {
        "@type": "Offer",
        url: `${absolute(lang, "/")}#kits`,
        price: k.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORG_ID },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: k.price,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
    };
    if (spec?.summary) {
      node.description = spec.summary;
    }
    return node;
  });
}

function faqPage(lang: Lang): Node {
  return {
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    inLanguage: getLocaleTag(lang),
    mainEntity: getFaqs(lang).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function breadcrumb(trail: Array<[string, string]>): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function homeGraph(lang: Lang = "es"): Node {
  return graph([website(lang), organization(lang, true), faqPage(lang), ...services(lang), ...products(lang)]);
}

export function blogGraph(lang: Lang = "es"): Node {
  return graph([
    website(lang),
    organization(lang),
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      url: absolute(lang, "/blog"),
      name: getBlogName(lang),
      description: getBlogDescription(lang),
      inLanguage: getLocaleTag(lang),
      publisher: { "@id": ORG_ID },
      blogPost: getSortedArticles(lang).map((a) => ({
        "@type": "BlogPosting",
        "@id": articleId(a.slug),
        url: absolute(lang, `/blog/${a.slug}`),
        headline: a.title,
        description: a.excerpt,
        image: `${SITE}/${a.cover}`,
        datePublished: a.date,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      })),
    },
    breadcrumb([
      [translate(lang, "common.nav.menu.home.label"), absolute(lang, "/")],
      [translate(lang, "common.nav.menu.blog.label"), absolute(lang, "/blog")],
    ]),
  ]);
}

export function articleGraph(a: BlogArticle, lang: Lang = "es"): Node {
  const url = absolute(lang, `/blog/${a.slug}`);
  return graph([
    website(lang),
    organization(lang),
    {
      "@type": "BlogPosting",
      "@id": articleId(a.slug),
      url,
      headline: a.title,
      description: a.excerpt,
      image: `${SITE}/${a.cover}`,
      datePublished: a.date,
      dateModified: a.updated ?? a.date,
      inLanguage: getLocaleTag(lang),
      keywords: a.tags.join(", "),
      timeRequired: `PT${a.readingMinutes}M`,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": BLOG_ID },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    breadcrumb([
      [translate(lang, "common.nav.menu.home.label"), absolute(lang, "/")],
      [translate(lang, "common.nav.menu.blog.label"), absolute(lang, "/blog")],
      [a.title, url],
    ]),
  ]);
}
