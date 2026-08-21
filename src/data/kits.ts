import { translate, type Lang } from "../i18n/index.ts";

export type Kit = {
  title: string;
  price: number;
  slug: string;
};

const KIT_BASE: Array<{ slug: string; price: number }> = [
  { slug: "3kw-hibrido", price: 6500 },
  { slug: "6kw", price: 7800 },
  { slug: "6kw-offgrid", price: 8400 },
  { slug: "8kw-hibrido", price: 10800 },
  { slug: "10kw-hibrido", price: 12000 },
  { slug: "cargador", price: 1200 },
  { slug: "domotico", price: 2500 },
  { slug: "domotico-s", price: 2000 },
  { slug: "aerotermo-110", price: 1500 },
  { slug: "aerotermo-100", price: 850 },
];

export function getKits(lang: Lang): Kit[] {
  return KIT_BASE.map((k) => ({ ...k, title: translate(lang, `data.kits.${k.slug}`) }));
}

export const KITS = getKits("es");

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}
