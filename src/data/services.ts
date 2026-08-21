import { Sun, Battery, Car, Wifi, BarChart3, Wrench } from "lucide-react";
import { translateList, type Lang } from "../i18n/index.ts";

const ICONS = [Sun, Battery, Car, Wifi, BarChart3, Wrench];
const IMAGES = [
  "images/services/placas.webp",
  "images/services/bateria.webp",
  "images/services/cargador.webp",
  "images/services/domotica.webp",
  "images/services/reforma.webp",
  "images/services/certificado.webp",
];

export interface Service {
  icon: (typeof ICONS)[number];
  title: string;
  desc: string;
  cta: string;
  img: string;
}

interface ServiceCopy { title: string; desc: string; cta: string }

export function getServices(lang: Lang): Service[] {
  const copy = translateList<ServiceCopy>(lang, "data.services");
  return copy.map((c, i) => ({
    icon: ICONS[i],
    title: c.title,
    desc: c.desc,
    cta: c.cta,
    img: IMAGES[i],
  }));
}

export const SERVICES = getServices("es");
