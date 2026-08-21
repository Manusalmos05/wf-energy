import { translateList, type Lang } from "../i18n/index.ts";

export interface Project { img: string; label: string; kw: string }

const IMAGES = [
  "images/proyects/placas.webp",
  "images/proyects/instalacion_murcia.webp",
  "images/proyects/cargador_chalet.webp",
  "images/proyects/domotica_proyecto.webp",
];
const KWS = ["8 kWp", "6 kWp", "7.4 Kw", "Domótica"];

interface ProjectCopy { label: string }

export function getProjects(lang: Lang): Project[] {
  const copy = translateList<ProjectCopy>(lang, "data.projects");
  return copy.map((c, i) => ({ img: IMAGES[i], label: c.label, kw: KWS[i] }));
}

export const PROJECTS = getProjects("es");
