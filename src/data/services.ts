import { Sun, Battery, Car, Wifi, BarChart3, Wrench } from "lucide-react";
import { translateList, type Lang } from "../i18n/index.ts";

const ICONS = [Sun, Battery, Car, Wifi, BarChart3, Wrench];
const IMAGES = [
  "images/services/instalacion-placas-solares-chalet-torrevieja.webp",
  "images/services/baterias-solares-almacenamiento-hibrido-benidorm.webp",
  "images/services/instalacion-cargador-coche-electrico-alicante.webp",
  "images/services/sistema-domotico-gestion-energetica-solar-murcia.webp",
  "images/services/reforma-instalacion-electrica-cuadro-alicante.webp",
  "images/services/certificado-energetico-elche.webp",
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
