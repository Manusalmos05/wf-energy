import { translate, translateList, type Lang } from "../i18n/index.ts";

export type IconName =
  | "trending"
  | "shield"
  | "leaf"
  | "house"
  | "panel"
  | "inverter"
  | "battery"
  | "clipboard"
  | "phone"
  | "droplet"
  | "plug"
  | "wifi"
  | "calendar"
  | "cloud"
  | "lock";

export type KitSpec = {
  badge: string;
  titleMain: string;
  titlePower: string;
  summary: string;
  productImage: string;
  productImageAlt: string;
  productImageWidth: number;
  productImageHeight: number;
  priceLabel: string;
  taxNote: string;
  benefits: { icon: IconName; title: string; body: string }[];
  components?: { icon: IconName; title: string; body: string }[];
  selfSufficiency?: { percent: string; scope: string; body: string };
  stats?: { label: string; value: string; ringPercent?: number }[];
  highlight?: { icon: IconName; title: string; body: string };
  includes?: string[];
  extras?: { label: string; price: number }[];
  guarantees: { icon: IconName; title: string; body: string }[];
};

interface KitCopyItem { title: string; body: string }
interface KitByCopy {
  titleMain: string;
  titlePower: string;
  summary?: string;
  productImageAlt: string;
  components?: KitCopyItem[];
  benefits?: KitCopyItem[];
  selfSufficiency?: { percent: string; scope: string; body: string };
  stats?: { label: string; value: string }[];
  includes: string[];
  highlight?: { title: string; body: string };
  guarantees?: KitCopyItem[];
}

const SOLAR_BENEFIT_ICONS: IconName[] = ["trending", "shield", "leaf", "house"];
const SOLAR_GUARANTEE_ICONS: IconName[] = ["shield", "clipboard"];
const SOLAR_EXTRAS_PRICES = [900, 120, 250, 1000, 1500];
const AEROTERMOS_EXTRAS_PRICES = [32, 50, 70];
const RING_BY_KIT: Record<string, number[]> = {
  "3kw-hibrido": [94],
  "6kw": [94],
  "8kw-hibrido": [94],
  "10kw-hibrido": [95],
};
const DEFAULT_SELF_SUFFICIENCY = new Set(["6kw", "8kw-hibrido", "10kw-hibrido"]);

const DOMOTICO_BENEFIT_ICONS: IconName[] = ["trending", "shield", "leaf", "house"];
const DOMOTICO_GUARANTEE_ICONS: IconName[] = ["shield", "cloud", "lock"];
const AEROTERMO_BENEFIT_ICONS: IconName[] = ["battery", "inverter", "shield", "wifi", "clipboard", "house"];
const AEROTERMO_GUARANTEE_ICONS: IconName[] = ["shield", "cloud"];
const CARGADOR_BENEFIT_ICONS: IconName[] = ["inverter", "shield", "phone", "trending", "droplet"];
const CARGADOR_GUARANTEE_ICONS: IconName[] = ["shield", "wifi", "calendar", "leaf"];
const COMPONENT_ICONS: IconName[] = ["panel", "inverter", "battery"];

function labels(lang: Lang) {
  return {
    badge: translate(lang, "data.kitSpec.labels.badgePromo"),
    priceLabel: translate(lang, "data.kitSpec.labels.priceLabel"),
    taxNote: translate(lang, "data.kitSpec.labels.taxNote"),
  };
}

function solarBenefits(lang: Lang): KitSpec["benefits"] {
  return translateList<KitCopyItem>(lang, "data.kitSpec.shared.solarBenefits").map((c, i) => ({
    icon: SOLAR_BENEFIT_ICONS[i],
    title: c.title,
    body: c.body,
  }));
}

function solarAdminIncludes(lang: Lang): string[] {
  return translateList<string>(lang, "data.kitSpec.shared.adminIncludes");
}

function solarExtras(lang: Lang): KitSpec["extras"] {
  return translateList<string>(lang, "data.kitSpec.shared.solarExtras").map((label, i) => ({
    label,
    price: SOLAR_EXTRAS_PRICES[i],
  }));
}

function aerotermosExtras(lang: Lang): KitSpec["extras"] {
  return translateList<string>(lang, "data.kitSpec.shared.aerotermosExtras").map((label, i) => ({
    label,
    price: AEROTERMOS_EXTRAS_PRICES[i],
  }));
}

function sharedSolarGuarantees(lang: Lang): KitSpec["guarantees"] {
  return translateList<KitCopyItem>(lang, "data.kitSpec.shared.solarGuarantees").map((c, i) => ({
    icon: SOLAR_GUARANTEE_ICONS[i],
    title: c.title,
    body: c.body,
  }));
}

function readKit(lang: Lang, slug: string): KitByCopy {
  const path = `data.kitSpec.byKit.${slug}`;
  return {
    titleMain: translate(lang, `${path}.titleMain`),
    titlePower: translate(lang, `${path}.titlePower`),
    summary: translate(lang, `${path}.summary`),
    productImageAlt: translate(lang, `${path}.productImageAlt`),
    components: translateList<KitCopyItem>(lang, `${path}.components`),
    benefits: translateList<KitCopyItem>(lang, `${path}.benefits`),
    stats: translateList<{ label: string; value: string }>(lang, `${path}.stats`),
    includes: translateList<string>(lang, `${path}.includes`),
    guarantees: translateList<KitCopyItem>(lang, `${path}.guarantees`),
  };
}

function readSelfSufficiency(lang: Lang, slug: string): KitByCopy["selfSufficiency"] {
  const percent = translate(lang, `data.kitSpec.byKit.${slug}.selfSufficiency.percent`);
  if (percent === `data.kitSpec.byKit.${slug}.selfSufficiency.percent`) return undefined;
  return {
    percent,
    scope: translate(lang, `data.kitSpec.byKit.${slug}.selfSufficiency.scope`),
    body: translate(lang, `data.kitSpec.byKit.${slug}.selfSufficiency.body`),
  };
}

function readHighlight(lang: Lang, slug: string, fallbackIcon: IconName): KitSpec["highlight"] | undefined {
  const title = translate(lang, `data.kitSpec.byKit.${slug}.highlight.title`);
  if (title === `data.kitSpec.byKit.${slug}.highlight.title`) return undefined;
  return {
    icon: fallbackIcon,
    title,
    body: translate(lang, `data.kitSpec.byKit.${slug}.highlight.body`),
  };
}

function withRings(slug: string, statsCopy: { label: string; value: string }[]): KitSpec["stats"] {
  const rings = RING_BY_KIT[slug] ?? [];
  return statsCopy.map((s, i) => ({ label: s.label, value: s.value, ringPercent: rings[i] }));
}

function mediaVivienda(lang: Lang) {
  return {
    scope: translate(lang, "data.kitSpec.shared.mediaVivienda.scope"),
    body: translate(lang, "data.kitSpec.shared.mediaVivienda.body"),
  };
}

function buildSolarKit(lang: Lang, slug: string, opts: {
  productImage: string;
  productImageWidth: number;
  productImageHeight: number;
  guarantees?: KitSpec["guarantees"];
  useMediaVivienda?: boolean;
  selfSufficiencyPercent?: string;
}): KitSpec {
  const base = readKit(lang, slug);
  const l = labels(lang);
  let selfSuff = readSelfSufficiency(lang, slug);
  if (!selfSuff && opts.useMediaVivienda && opts.selfSufficiencyPercent) {
    selfSuff = { percent: opts.selfSufficiencyPercent, ...mediaVivienda(lang) };
  }
  const includes = [...base.includes];
  if (DEFAULT_SELF_SUFFICIENCY.has(slug) || slug === "6kw-offgrid") {
    includes.push(...solarAdminIncludes(lang));
  }
  return {
    badge: l.badge,
    titleMain: base.titleMain,
    titlePower: base.titlePower,
    summary: base.summary!,
    productImage: opts.productImage,
    productImageAlt: base.productImageAlt,
    productImageWidth: opts.productImageWidth,
    productImageHeight: opts.productImageHeight,
    priceLabel: l.priceLabel,
    taxNote: l.taxNote,
    benefits: solarBenefits(lang),
    components: (base.components ?? []).map((c, i) => ({ icon: COMPONENT_ICONS[i], title: c.title, body: c.body })),
    selfSufficiency: selfSuff,
    stats: withRings(slug, base.stats ?? []),
    includes,
    extras: solarExtras(lang),
    guarantees: opts.guarantees ?? (base.guarantees && base.guarantees.length
      ? base.guarantees.map((g, i) => ({ icon: SOLAR_GUARANTEE_ICONS[i], title: g.title, body: g.body }))
      : sharedSolarGuarantees(lang)),
  };
}

function buildDomotico(lang: Lang, slug: string, productImage: string): KitSpec {
  const base = readKit(lang, slug);
  const l = labels(lang);
  return {
    badge: l.badge,
    titleMain: base.titleMain,
    titlePower: base.titlePower,
    summary: translate(lang, "data.kitSpec.shared.domoticoBase.summary"),
    productImage,
    productImageAlt: base.productImageAlt,
    productImageWidth: 550,
    productImageHeight: 460,
    priceLabel: l.priceLabel,
    taxNote: l.taxNote,
    benefits: translateList<KitCopyItem>(lang, "data.kitSpec.shared.domoticoBase.benefits").map((c, i) => ({
      icon: DOMOTICO_BENEFIT_ICONS[i], title: c.title, body: c.body,
    })),
    includes: base.includes,
    highlight: {
      icon: "house",
      title: translate(lang, "data.kitSpec.shared.domoticoBase.highlight.title"),
      body: translate(lang, "data.kitSpec.shared.domoticoBase.highlight.body"),
    },
    guarantees: translateList<KitCopyItem>(lang, "data.kitSpec.shared.domoticoBase.guarantees").map((c, i) => ({
      icon: DOMOTICO_GUARANTEE_ICONS[i], title: c.title, body: c.body,
    })),
  };
}

function buildAerotermo(lang: Lang, slug: string, productImage: string, benefitsKey: "benefits" | "benefits100", highlightKey: "highlight110" | "highlight100"): KitSpec {
  const base = readKit(lang, slug);
  const l = labels(lang);
  return {
    badge: l.badge,
    titleMain: base.titleMain,
    titlePower: base.titlePower,
    summary: translate(lang, "data.kitSpec.shared.aerotermoBase.summary"),
    productImage,
    productImageAlt: base.productImageAlt,
    productImageWidth: 550,
    productImageHeight: 460,
    priceLabel: l.priceLabel,
    taxNote: l.taxNote,
    benefits: translateList<KitCopyItem>(lang, `data.kitSpec.shared.aerotermoBase.${benefitsKey}`).map((c, i) => ({
      icon: AEROTERMO_BENEFIT_ICONS[i], title: c.title, body: c.body,
    })),
    includes: base.includes,
    extras: aerotermosExtras(lang),
    highlight: {
      icon: "house",
      title: translate(lang, `data.kitSpec.shared.aerotermoBase.${highlightKey}.title`),
      body: translate(lang, `data.kitSpec.shared.aerotermoBase.${highlightKey}.body`),
    },
    guarantees: translateList<KitCopyItem>(lang, "data.kitSpec.shared.aerotermoBase.guarantees").map((c, i) => ({
      icon: AEROTERMO_GUARANTEE_ICONS[i], title: c.title, body: c.body,
    })),
  };
}

function buildCargador(lang: Lang): KitSpec {
  const base = readKit(lang, "cargador");
  const l = labels(lang);
  return {
    badge: l.badge,
    titleMain: base.titleMain,
    titlePower: base.titlePower,
    summary: base.summary!,
    productImage: "images/kits/cargador-producto.webp",
    productImageAlt: base.productImageAlt,
    productImageWidth: 900,
    productImageHeight: 600,
    priceLabel: l.priceLabel,
    taxNote: l.taxNote,
    benefits: (base.benefits ?? []).map((c, i) => ({ icon: CARGADOR_BENEFIT_ICONS[i], title: c.title, body: c.body })),
    includes: base.includes,
    highlight: readHighlight(lang, "cargador", "clipboard"),
    guarantees: (base.guarantees ?? []).map((c, i) => ({ icon: CARGADOR_GUARANTEE_ICONS[i], title: c.title, body: c.body })),
  };
}

export function getKitSpecs(lang: Lang): Record<string, KitSpec> {
  return {
    "3kw-hibrido": buildSolarKit(lang, "3kw-hibrido", {
      productImage: "images/kits/3kw-producto.webp",
      productImageWidth: 700,
      productImageHeight: 500,
    }),
    "6kw": buildSolarKit(lang, "6kw", {
      productImage: "images/kits/6kw-producto.webp",
      productImageWidth: 700,
      productImageHeight: 500,
      useMediaVivienda: true,
      selfSufficiencyPercent: "98%",
    }),
    "6kw-offgrid": buildSolarKit(lang, "6kw-offgrid", {
      productImage: "images/kits/6kw-offgrid-producto.webp",
      productImageWidth: 700,
      productImageHeight: 500,
    }),
    "8kw-hibrido": buildSolarKit(lang, "8kw-hibrido", {
      productImage: "images/kits/8kw-producto.webp",
      productImageWidth: 700,
      productImageHeight: 500,
      useMediaVivienda: true,
      selfSufficiencyPercent: "98%",
    }),
    "10kw-hibrido": buildSolarKit(lang, "10kw-hibrido", {
      productImage: "images/kits/10kw-producto.webp",
      productImageWidth: 700,
      productImageHeight: 500,
      useMediaVivienda: true,
      selfSufficiencyPercent: "98%",
    }),
    cargador: buildCargador(lang),
    domotico: buildDomotico(lang, "domotico", "images/kits/domotico-producto.webp"),
    "domotico-s": buildDomotico(lang, "domotico-s", "images/kits/domotico-s-producto.webp"),
    "aerotermo-110": buildAerotermo(lang, "aerotermo-110", "images/kits/aerotermo_110.webp", "benefits", "highlight110"),
    "aerotermo-100": buildAerotermo(lang, "aerotermo-100", "images/kits/aerotermo_100.webp", "benefits100", "highlight100"),
  };
}

export const KIT_SPECS = getKitSpecs("es");
