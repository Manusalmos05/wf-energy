import { getSteps } from "../data/steps.ts";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/provider.tsx";

export default function HowWeWorkSection() {
  const { t, lang, path } = useLanguage();
  const steps = getSteps(lang);
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.howWeWork.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t("sections.howWeWork.title")}</h2>
          <p className="text-white/70 text-base max-w-lg mx-auto">{t("sections.howWeWork.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-md mx-auto md:max-w-none md:mx-0 md:grid-cols-none md:grid-rows-2 md:grid-flow-col md:auto-cols-fr md:gap-6">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center text-accent text-xs font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`${path("/")}#contacto`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t("common.actions.requestStudy")} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
