import Calculator from "../app/components/SavingsCalculator.tsx";
import { useLanguage } from "../i18n/provider.tsx";

export default function CalculatorSection() {
  const { t, tList } = useLanguage();
  const keywords = tList<string>("sections.calculator.keywords");
  return (
    <section id="calculadora" className="py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.calculator.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">{t("sections.calculator.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t("sections.calculator.bodyLead")}{" "}
              <b>{t("sections.calculator.bodyStrong")}</b>
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {keywords.map((kw) => (
                <span key={kw} className="px-3 py-1 rounded-full bg-secondary border border-border text-xs">{kw}</span>
              ))}
            </div>
          </div>
          <Calculator />
        </div>
      </div>
    </section>
  );
}
