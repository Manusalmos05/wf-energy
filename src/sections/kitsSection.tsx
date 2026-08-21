import KitsCarousel from "../app/components/KitsCarousel";
import { useLanguage } from "../i18n/provider.tsx";

export default function KitsSection() {
  const { t } = useLanguage();
  return (
    <section id="kits" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.kits.eyebrow")}</p>
          <h2 className="text-4xl font-bold mt-3">{t("sections.kits.title")}</h2>
          <p className="text-white/70 text-base max-w-lg mx-auto">{t("sections.kits.subtitle")}</p>
        </div>

        <KitsCarousel />
      </div>
    </section>
  );
}
