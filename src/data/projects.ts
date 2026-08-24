import { translateList, type Lang } from "../i18n/index.ts";

export interface Project { img: string; label: string; kw: string }

const IMAGES = [
  "images/proyects/instalacion-placas-solares-chalet-torrevieja.webp",
  "images/proyects/autoconsumo-fotovoltaico-residencial-murcia.webp",
  "images/proyects/cargador-wallbox-garaje-particular-vega-baja..webp",
  "images/proyects/domotica-para-ahorro-energetico-vivienda.webp",
];
const KWS = ["8 kWp", "6 kWp", "7.4 Kw", "Domótica"];

interface ProjectCopy { label: string }

export function getProjects(lang: Lang): Project[] {
  const copy = translateList<ProjectCopy>(lang, "data.projects");
  return copy.map((c, i) => ({ img: IMAGES[i], label: c.label, kw: KWS[i] }));
}

export const PROJECTS = getProjects("es");
