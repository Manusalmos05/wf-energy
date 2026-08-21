import { translateList, type Lang } from "../i18n/index.ts";

export interface Step { num: string; title: string; body: string }

interface StepCopy { title: string; body: string }

export function getSteps(lang: Lang): Step[] {
  const copy = translateList<StepCopy>(lang, "data.steps");
  return copy.map((c, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: c.title,
    body: c.body,
  }));
}

export const STEPS = getSteps("es");
