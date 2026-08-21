import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND } from "../../lib/site.ts";
import { useLanguage } from "../../i18n/provider.tsx";

export default function CookiesPage() {
  const { t } = useLanguage();
  const V = { brand: BRAND };
  return (
    <LegalPage title={t("legal.cookies.title")}>
      <LegalSection title={t("legal.cookies.sections.what.title")}>
        <p>{t("legal.cookies.sections.what.body")}</p>
      </LegalSection>

      <LegalSection title={t("legal.cookies.sections.used.title")}>
        <p>{t("legal.cookies.sections.used.intro", V)}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>{t("legal.cookies.sections.used.consent.label")}</strong>
            {t("legal.cookies.sections.used.consent.body")}
          </li>
          <li>
            <strong>{t("legal.cookies.sections.used.clarity.label")}</strong>
            {t("legal.cookies.sections.used.clarity.body")}
          </li>
        </ul>
        <p>{t("legal.cookies.sections.used.note")}</p>
      </LegalSection>

      <LegalSection title={t("legal.cookies.sections.change.title")}>
        <p>{t("legal.cookies.sections.change.body")}</p>
      </LegalSection>
    </LegalPage>
  );
}
