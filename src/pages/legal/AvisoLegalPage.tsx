import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL, PHONE_DISPLAY, SITE } from "../../lib/site.ts";
import { useLanguage } from "../../i18n/provider.tsx";

export default function AvisoLegalPage() {
  const { t, tList } = useLanguage();
  const items = tList<string>("legal.notice.sections.identification.items");
  const V = { brand: BRAND, email: EMAIL, phone: PHONE_DISPLAY, site: SITE };
  const format = (raw: string) => raw
    .replace(/\{brand\}/g, BRAND)
    .replace(/\{email\}/g, EMAIL)
    .replace(/\{phone\}/g, PHONE_DISPLAY)
    .replace(/\{site\}/g, SITE);

  return (
    <LegalPage title={t("legal.notice.title")}>
      <LegalSection title={t("legal.notice.sections.identification.title")}>
        <p>{t("legal.notice.sections.identification.intro")}</p>
        <ul className="list-disc space-y-1 pl-6">
          {items.map((item) => <li key={item}>{format(item)}</li>)}
        </ul>
      </LegalSection>

      <LegalSection title={t("legal.notice.sections.purpose.title")}>
        <p>{t("legal.notice.sections.purpose.body", V)}</p>
      </LegalSection>

      <LegalSection title={t("legal.notice.sections.terms.title")}>
        <p>{t("legal.notice.sections.terms.p1")}</p>
        <p>{t("legal.notice.sections.terms.p2")}</p>
      </LegalSection>

      <LegalSection title={t("legal.notice.sections.ip.title")}>
        <p>{t("legal.notice.sections.ip.body", V)}</p>
      </LegalSection>

      <LegalSection title={t("legal.notice.sections.liability.title")}>
        <p>{t("legal.notice.sections.liability.body", V)}</p>
      </LegalSection>

      <LegalSection title={t("legal.notice.sections.law.title")}>
        <p>{t("legal.notice.sections.law.body")}</p>
      </LegalSection>
    </LegalPage>
  );
}
