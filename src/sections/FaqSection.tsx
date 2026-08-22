import { getFaqs } from "../data/faqs.ts";
import FaqItem from "../app/components/FaqItem.tsx";
import { useLanguage } from "../i18n/provider.tsx";
import { useState } from "react";


export default function FaqSection() {
  const [openIndex, setOpenIndex]= useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)};
  const { t, lang } = useLanguage();
  const faqs = getFaqs(lang);
  return (
    <section id="preguntas" className="py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.faq.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t("sections.faq.title")}</h2>
          <p className="text-muted-foreground text-base">{t("sections.faq.subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl border border-border px-6 divide-y divide-border">
          {faqs.map((faq,index) => (
            <FaqItem key={index} q={faq.q} a={faq.a} 
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}

            />
          ))}
        </div>
        <div id="promo_blog" className="py-7 bg-secondary">
          <em>
            {t("sections.faq.spanStart")}
            <a
              href="/blog"
              className="underline font-semibold text-accent">
              {t("sections.faq.blogLink")}
            </a>
            {t("sections.faq.spanEnd")}
          </em>
        </div>
      </div>
      
    </section>
  );
}

