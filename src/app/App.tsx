import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { Phone, MessageCircle } from "lucide-react";

import Navbar from "../sections/Navbar.tsx";
import FooterSection from "../sections/FooterSection.tsx";
import CookieBanner from "./components/CookieBanner.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import HomePage from "../pages/HomePage.tsx";
import BlogPage from "../pages/BlogPage.tsx";
import ArticlePage from "../pages/ArticlePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import AvisoLegalPage from "../pages/legal/AvisoLegalPage.tsx";
import PrivacidadPage from "../pages/legal/PrivacidadPage.tsx";
import CookiesPage from "../pages/legal/CookiesPage.tsx";
import AccesibilidadPage from "../pages/legal/AccesibilidadPage.tsx";
import { TEL_HREF, WHATSAPP } from "../lib/site.ts";
import { getStoredConsent, storeConsent, loadClarity, type CookieConsent } from "../lib/consent.ts";
import { LanguageProvider, useLanguage } from "../i18n/provider.tsx";
import { LANGS, DEFAULT_LANG } from "../i18n/index.ts";

function LocalizedRoutes() {
  return (
    <Routes>
      {LANGS.map((lang) => {
        const prefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
        return [
          <Route key={`${lang}-home`} path={`${prefix}/`} element={<HomePage />} />,
          <Route key={`${lang}-blog`} path={`${prefix}/blog`} element={<BlogPage />} />,
          <Route key={`${lang}-article`} path={`${prefix}/blog/:slug`} element={<ArticlePage />} />,
          <Route key={`${lang}-aviso`} path={`${prefix}/aviso-legal`} element={<AvisoLegalPage />} />,
          <Route key={`${lang}-privacy`} path={`${prefix}/politica-de-privacidad`} element={<PrivacidadPage />} />,
          <Route key={`${lang}-cookies`} path={`${prefix}/politica-de-cookies`} element={<CookiesPage />} />,
          <Route key={`${lang}-a11y`} path={`${prefix}/accesibilidad`} element={<AccesibilidadPage />} />,
        ];
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function FloatingActions({ bannerVisible }: { bannerVisible: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3" style={{ bottom: bannerVisible ? "5.5rem" : "1.5rem" }}>
      <a
        href={TEL_HREF}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title={t("common.buttons.callNow")}
      >
        <Phone size={18} />
      </a>
      <a
        href={WHATSAPP}
        className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="WhatsApp"
      >
        <MessageCircle size={18} />
      </a>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  useEffect(() => {
    if (consent === "accepted") loadClarity();
  }, [consent]);

  const decideConsent = (value: CookieConsent) => {
    storeConsent(value);
    setConsent(value);
  };

  const bannerVisible = consent === null;

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        <ScrollToTop />

        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {bannerVisible && (
          <CookieBanner onAccept={() => decideConsent("accepted")} onReject={() => decideConsent("rejected")} />
        )}

        <FloatingActions bannerVisible={bannerVisible} />

        <LocalizedRoutes />

        <FooterSection onCookieSettings={() => setConsent(null)} />
      </div>
    </LanguageProvider>
  );
}
