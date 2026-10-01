import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = resolve(root, "docs");
const shellPath = resolve(docsDir, "index.html");
const articlesDir = resolve(root, "public/blog/articles");
const ssrDir = resolve(root, ".ssr-tmp");
const serverEntry = resolve(ssrDir, "entry-server.js");

const ROOT_MARKER = '<div id="root"></div>';
const MODULE_MARKER = '<script type="module"';
const MIN_RENDERED_BYTES = 1000;

function fail(message) {
  console.error(`\n[prerender] ERROR: ${message}\n`);
  process.exit(1);
}

function escAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function forScript(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    fail(`no se encontró ${label} en docs/index.html: la plantilla ha cambiado y el head por ruta dejaría de aplicarse.`);
  }
  return typeof replacement === "function"
    ? html.replace(pattern, replacement)
    : html.replace(pattern, () => replacement);
}

if (!existsSync(shellPath)) {
  fail("no existe docs/index.html: ejecuta build:client antes de prerenderizar.");
}
if (!existsSync(serverEntry)) {
  fail(`no existe ${serverEntry}: falta el paso build:ssr.`);
}

const shell = readFileSync(shellPath, "utf8");

for (const marker of [ROOT_MARKER, MODULE_MARKER]) {
  if (!shell.includes(marker)) {
    fail(`no se encontró ${marker} en docs/index.html.`);
  }
}

const { render, getRoutes, getSiteMeta } = await import(pathToFileURL(serverEntry).href);

for (const [name, fn] of [["getRoutes", getRoutes], ["getSiteMeta", getSiteMeta], ["render", render]]) {
  if (typeof fn !== "function") {
    fail(`entry-server no exporta ${name}.`);
  }
}

const siteMeta = getSiteMeta();

function buildHead(route) {
  const tags = [
    `<meta name="description" content="${escAttr(route.description)}" />`,
    `<meta name="robots" content="${escAttr(route.robots)}" />`,
  ];

  if (route.canonical) {
    tags.push(`<link rel="canonical" href="${escAttr(route.canonical)}" />`);
  }

  for (const alt of route.alternates ?? []) {
    tags.push(`<link rel="alternate" hreflang="${escAttr(alt.hreflang)}" href="${escAttr(alt.href)}" />`);
  }

  tags.push(
    "",
    `<meta property="og:type" content="${escAttr(route.ogType)}" />`,
    `<meta property="og:site_name" content="${escAttr(siteMeta.siteName)}" />`,
    `<meta property="og:locale" content="${escAttr(route.ogLocale ?? siteMeta.ogLocale)}" />`,
  );

  if (route.canonical) {
    tags.push(`<meta property="og:url" content="${escAttr(route.canonical)}" />`);
  }

  tags.push(
    `<meta property="og:title" content="${escAttr(route.title)}" />`,
    `<meta property="og:description" content="${escAttr(route.description)}" />`,
    `<meta property="og:image" content="${escAttr(route.image)}" />`,
    `<meta property="og:image:alt" content="${escAttr(route.imageAlt)}" />`,
  );

  if (route.published) {
    tags.push(`<meta property="article:published_time" content="${escAttr(route.published)}" />`);
    if (route.lastmod) {
      tags.push(`<meta property="article:modified_time" content="${escAttr(route.lastmod)}" />`);
    }
  }

  tags.push(
    "",
    `<meta name="twitter:card" content="${escAttr(siteMeta.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${escAttr(route.image)}" />`,
  );

  if (route.jsonLd) {
    tags.push("", `<script type="application/ld+json">${forScript(route.jsonLd)}</script>`);
  }

  return tags.map((tag) => (tag === "" ? "" : `      ${tag}`)).join("\n");
}

function applyHead(html, route) {
  const withLang = replaceOnce(
    html,
    /<html\b([^>]*)\blang="[^"]*"([^>]*)>/,
    (_m, before, after) => `<html${before}lang="${escAttr(route.htmlLang)}"${after}>`,
    "<html lang>",
  );
  const withTitle = replaceOnce(
    withLang,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escText(route.title)}</title>`,
    "<title>",
  );
  return replaceOnce(
    withTitle,
    /[ \t]*\n?[ \t]*<\/head>/,
    `\n\n${buildHead(route)}\n\n    </head>`,
    "</head>",
  );
}

function readArticleFile(lang, slug) {
  const suffix = lang === "es" ? "" : `.${lang}`;
  const filePath = join(articlesDir, `${slug}${suffix}.html`);
  if (existsSync(filePath)) return readFileSync(filePath, "utf8");
  const fallback = join(articlesDir, `${slug}.html`);
  return existsSync(fallback) ? readFileSync(fallback, "utf8") : null;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|h[1-6]|li|tr|blockquote|figcaption)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

function cleanTitle(route) {
  const suffix = ` | ${siteMeta.siteName}`;
  return route.title.endsWith(suffix) ? route.title.slice(0, -suffix.length) : route.title;
}

function llmsEntry(route, extra = "") {
  return `- [${cleanTitle(route)}](${route.canonical}): ${route.description}${extra}`;
}

function llmsLangGroup(allRoutes, lang) {
  const indexable = allRoutes.filter((r) => r.sitemap && r.canonical && r.lang === lang);
  const blog = indexable.find((r) => r.ogType === "website" && /\/blog\/?$/.test(r.canonical));
  const home = indexable.find((r) => r.ogType === "website" && r !== blog);
  const articles = indexable
    .filter((r) => r.ogType === "article")
    .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""));
  return { home, blog, articles };
}

function buildLlms(allRoutes) {
  const es = llmsLangGroup(allRoutes, "es");
  const en = llmsLangGroup(allRoutes, "en");
  const stampEs = (r) => (r.lastmod ? ` (actualizado ${r.lastmod})` : "");
  const stampEn = (r) => (r.lastmod ? ` (updated ${r.lastmod})` : "");
  return [
    `# ${siteMeta.siteName}`,
    "",
    `> Empresa instaladora de placas solares fotovoltaicas, baterías, cargadores de coche eléctrico y domótica para viviendas y empresas en ${siteMeta.areas.join(", ")} (España). Estudio energético y presupuesto gratuitos en 24 horas, sin compromiso.`,
    "",
    `- Zonas de servicio: ${siteMeta.areas.join(", ")}`,
    `- Teléfono y WhatsApp: ${siteMeta.phone} (${siteMeta.whatsapp})`,
    `- Email: ${siteMeta.email}`,
    `- Idiomas: español (por defecto) e inglés (rutas bajo ${siteMeta.site}/en/)`,
    `- Texto íntegro de las guías del blog: ${siteMeta.site}/llms-full.txt`,
    "",
    "## Páginas principales",
    "",
    llmsEntry(es.home),
    llmsEntry(es.blog),
    "",
    "## Guías del blog",
    "",
    ...es.articles.map((r) => llmsEntry(r, stampEs(r))),
    "",
    "## English",
    "",
    llmsEntry(en.home),
    llmsEntry(en.blog),
    ...en.articles.map((r) => llmsEntry(r, stampEn(r))),
    "",
  ].join("\n");
}

function buildLlmsFull(docs) {
  const sections = docs.map(({ route, text }) =>
    [
      `## ${cleanTitle(route)}`,
      "",
      `URL: ${route.canonical}`,
      route.published ? `Publicado: ${route.published}` : "",
      route.lastmod ? `Actualizado: ${route.lastmod}` : "",
      "",
      text,
    ]
      .filter((line) => line !== "")
      .join("\n"),
  );
  return [
    `# ${siteMeta.siteName} — guías completas del blog`,
    "",
    `> Texto íntegro de las guías sobre autoconsumo solar publicadas en ${siteMeta.site}/blog. Índice resumido en ${siteMeta.site}/llms.txt.`,
    "",
    ...sections,
    "",
  ].join("\n\n");
}

const routes = getRoutes();
const written = [];
const articleDocs = [];

for (const route of routes) {
  const preloaded = {};

  for (const slug of route.slugs) {
    const key = `${route.lang}:${slug}`;
    const content = readArticleFile(route.lang, slug);
    if (content === null) {
      fail(`la ruta ${route.path} declara el artículo "${slug}" pero no existe html para el idioma ${route.lang}.`);
    }
    preloaded[key] = content;
  }

  const appHtml = render(route.path, preloaded);

  if (!appHtml || appHtml.length < MIN_RENDERED_BYTES) {
    fail(`el render de ${route.path} devolvió ${appHtml ? `${appHtml.length} bytes` : "nada"}.`);
  }

  let out = applyHead(shell, route);
  out = out.replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`);

  if (Object.keys(preloaded).length > 0) {
    const seed = `<script>window.__ARTICLE_HTML__=${forScript(preloaded)}</script>`;
    out = out.replace(MODULE_MARKER, () => `${seed}\n      ${MODULE_MARKER}`);
  }

  const target = resolve(docsDir, route.out);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, out, "utf8");
  written.push({ out: route.out, bytes: out.length, rendered: appHtml.length });

  if (route.ogType === "article" && route.sitemap && route.slugs.length > 0) {
    articleDocs.push({ route, text: stripHtml(preloaded[`${route.lang}:${route.slugs[0]}`]) });
  }
}

const REDIRECTS = {
  "blog/aislamiento-térmico-de-tuberías-de-PPR": "/blog/aislamiento-termico-de-tuberias-de-ppr/",
  "en/blog/aislamiento-térmico-de-tuberías-de-PPR": "/en/blog/aislamiento-termico-de-tuberias-de-ppr/",
};

const origin = new URL(routes[0].canonical).origin;

for (const [from, to] of Object.entries(REDIRECTS)) {
  const target = `${origin}${to}`;
  const stub = [
    "<!DOCTYPE html>",
    '<html lang="es">',
    "<head>",
    '<meta charset="UTF-8" />',
    `<meta http-equiv="refresh" content="0; url=${escAttr(target)}" />`,
    `<link rel="canonical" href="${escAttr(target)}" />`,
    '<meta name="robots" content="noindex" />',
    "<title>Redirigiendo…</title>",
    "</head>",
    `<body><a href="${escAttr(target)}">${escText(target)}</a></body>`,
    "</html>",
    "",
  ].join("\n");
  const stubPath = resolve(docsDir, from, "index.html");
  mkdirSync(dirname(stubPath), { recursive: true });
  writeFileSync(stubPath, stub, "utf8");
  console.log(`[prerender]   redirect ${from} -> ${to}`);
}

const indexed = routes.filter((r) => r.sitemap);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...indexed.map((r) =>
    [
      "  <url>",
      `    <loc>${escText(r.canonical)}</loc>`,
      r.lastmod ? `    <lastmod>${escText(r.lastmod)}</lastmod>` : "",
      ...(r.alternates ?? []).map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${escAttr(alt.hreflang)}" href="${escAttr(alt.href)}" />`,
      ),
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve(docsDir, "sitemap.xml"), sitemap, "utf8");

const llms = buildLlms(routes);
const llmsFull = buildLlmsFull(articleDocs);
writeFileSync(resolve(docsDir, "llms.txt"), llms, "utf8");
writeFileSync(resolve(docsDir, "llms-full.txt"), llmsFull, "utf8");

rmSync(ssrDir, { recursive: true, force: true });

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
const pad = Math.max(...written.map((w) => w.out.length));

console.log(`\n[prerender] plantilla ${kb(shell.length)}`);
for (const w of written) {
  console.log(`[prerender]   ${w.out.padEnd(pad)}  ${kb(w.bytes).padStart(9)}  (+${kb(w.rendered)} renderizados)`);
}
console.log(`[prerender] sitemap.xml con ${indexed.length} URL(s)`);
console.log(`[prerender] llms.txt ${kb(llms.length)} · llms-full.txt ${kb(llmsFull.length)} (${articleDocs.length} guías)\n`);
