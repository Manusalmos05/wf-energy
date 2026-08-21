import { Sun, Phone, Mail, MapPin, Lock } from "lucide-react";
import { Link } from "react-router";
import { EMAIL, PHONE_DISPLAY } from "../lib/site.ts";
import { useLanguage } from "../i18n/provider.tsx";
import { getNav } from "../data/navigation.ts";

const LEGAL_KEYS: Array<[string, string]> = [
  ["common.footer.links.privacy", "/politica-de-privacidad"],
  ["common.footer.links.cookies", "/politica-de-cookies"],
  ["common.footer.links.notice", "/aviso-legal"],
  ["common.footer.links.accessibility", "/accesibilidad"],
];

export default function FooterSection({ onCookieSettings }: { onCookieSettings?: () => void }) {
  const { t, lang, path } = useLanguage();
  const nav = getNav(lang).filter((n) => n.key !== "kits" && n.key !== "faq");
  const homeAnchor = (anchor: string) => `${path("/")}#${anchor}`;
  return (
    <footer className="bg-primary text-primary-foreground pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sun size={15} className="text-white" />
              </div>
              <span className="font-bold text-base">White Fox Energy</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">{t("common.footer.tagline")}</p>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">{t("common.footer.navigation")}</p>
            <ul className="space-y-2 text-xs text-white/60">
              {nav.map((item) => (
                <li key={item.key}>
                  {item.to ? (
                    <Link to={path(item.to)} className="hover:text-white transition-colors">{item.label}</Link>
                  ) : (
                    <a href={homeAnchor(item.anchor!)} className="hover:text-white transition-colors">{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">{t("common.footer.legal")}</p>
            <ul className="space-y-2 text-xs text-white/60">
              {LEGAL_KEYS.map(([key, to]) => (
                <li key={to}><Link to={path(to)} className="hover:text-white transition-colors">{t(key)}</Link></li>
              ))}
              <li>
                <button onClick={onCookieSettings} className="hover:text-white transition-colors">
                  {t("common.footer.cookieSettings")}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">{t("common.footer.contact")}</p>
            <ul className="space-y-2 text-xs text-white/60">
              <li className="flex items-center gap-2"><Phone size={11} /> {PHONE_DISPLAY}</li>
              <li className="flex items-center gap-2"><Mail size={11} /> {EMAIL}</li>
              <li className="flex items-center gap-2"><MapPin size={11} /> {t("common.footer.areaLine")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">{t("common.footer.copyright")}</p>
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Lock size={10} className="text-accent" /> {t("common.footer.secureLine")}
          </div>
        </div>
      </div>
    </footer>
  );
}
