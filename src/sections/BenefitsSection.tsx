import { getBenefits } from "../data/benefits.ts";
import { useLanguage } from "../i18n/provider.tsx";

export default function BenefitsSection() {
  const { lang } = useLanguage();
  const benefits = getBenefits(lang);
  return (
    <section id="benefits" className="bg-secondary py-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {benefits.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon size={18} className="text-accent" />
              </div>
              <span className="text-xs font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
