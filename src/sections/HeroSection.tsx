import { Zap, ArrowRight, Phone } from "lucide-react";
import { TEL_HREF } from "../lib/site.ts";
import { useLanguage } from "../i18n/provider.tsx";

export default function HeroSection() {
  const { t, path } = useLanguage();
  return (
    <section id="inicio" className="relative w-full min-h-screen flex items-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/blog/eficiencia-energetica-residencial-levante/portada.webp)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 md:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-6 tracking-wide">
            <Zap size={11} className="text-accent" /> {t("sections.hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            {t("sections.hero.titlePrefix")}
            <span className="text-accent">{t("sections.hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            {t("sections.hero.subtitleBefore")}
            <strong className="text-white">{t("sections.hero.subtitleHighlight")}</strong>
            {t("sections.hero.subtitleAfter")}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${path("/")}#contacto`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("common.actions.requestQuote")} <ArrowRight size={15} />
            </a>
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              <Phone size={14} /> {t("common.buttons.callNow")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
