import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL } from "../../lib/site.ts";
import { useLanguage } from "../../i18n/provider.tsx";

export default function AccesibilidadPage() {
  const { t, tList } = useLanguage();
  const items = tList<string>("legal.accessibility.sections.measures.items");
  return (
    <LegalPage title={t("legal.accessibility.title")}>
      <LegalSection title={t("legal.accessibility.sections.commitment.title")}>
        <p>{t("legal.accessibility.sections.commitment.body", { brand: BRAND })}</p>
      </LegalSection>

      <LegalSection title={t("legal.accessibility.sections.measures.title")}>
        <ul className="list-disc space-y-2 pl-6">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </LegalSection>

      <LegalSection title={t("legal.accessibility.sections.barrier.title")}>
        <p>{t("legal.accessibility.sections.barrier.body", { email: EMAIL })}</p>
      </LegalSection>
    </LegalPage>
  );
}
