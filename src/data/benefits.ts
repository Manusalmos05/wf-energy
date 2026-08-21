import { TrendingDown, Clock, CreditCard, Award, Wrench, HeadphonesIcon } from "lucide-react";
import { translateList, type Lang } from "../i18n/index.ts";

const ICONS = [TrendingDown, Clock, CreditCard, Award, Wrench, HeadphonesIcon];

export interface Benefit {
  icon: (typeof ICONS)[number];
  label: string;
}

export function getBenefits(lang: Lang): Benefit[] {
  const labels = translateList<string>(lang, "data.benefits");
  return labels.map((label, i) => ({ icon: ICONS[i], label }));
}

export const BENEFITS = getBenefits("es");
