import { Link } from "react-router";
import LegalPage, { LegalSection } from "./LegalPage.tsx";
import { BRAND, EMAIL } from "../../lib/site.ts";
import { useLanguage } from "../../i18n/provider.tsx";

export default function PrivacidadPage() {
  const { t, path } = useLanguage();
  const V = { brand: BRAND, email: EMAIL };
  return (
    <LegalPage title={t("legal.privacy.title")}>
      <LegalSection title={t("legal.privacy.sections.controller.title")}>
        <p>{t("legal.privacy.sections.controller.body", V)}</p>
      </LegalSection>

      <LegalSection title={t("legal.privacy.sections.data.title")}>
        <p>{t("legal.privacy.sections.data.p1")}</p>
        <p>
          {t("legal.privacy.sections.data.p2Before")}
          <Link to={path("/politica-de-cookies")} className="text-accent-deep underline">
            {t("legal.privacy.sections.data.p2Link")}
          </Link>
          {t("legal.privacy.sections.data.p2After")}
        </p>
      </LegalSection>

      <LegalSection title={t("legal.privacy.sections.purpose.title")}>
        <p>{t("legal.privacy.sections.purpose.p1")}</p>
        <p>{t("legal.privacy.sections.purpose.p2")}</p>
      </LegalSection>

      <LegalSection title={t("legal.privacy.sections.recipients.title")}>
        <p>{t("legal.privacy.sections.recipients.body")}</p>
      </LegalSection>

      <LegalSection title={t("legal.privacy.sections.retention.title")}>
        <p>{t("legal.privacy.sections.retention.body")}</p>
      </LegalSection>

      <LegalSection title={t("legal.privacy.sections.rights.title")}>
        <p>{t("legal.privacy.sections.rights.body", V)}</p>
      </LegalSection>
    </LegalPage>
  );
}
