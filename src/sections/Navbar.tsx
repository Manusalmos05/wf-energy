import React from "react";
import { Link } from "react-router";
import { Zap, Phone, ArrowRight, Menu, X } from "lucide-react";
import { getNav } from "../data/navigation.ts";
import { PHONE_DISPLAY, TEL_HREF } from "../lib/site.ts";
import { useLanguage } from "../i18n/provider.tsx";
import { LANGS, LANG_META, type Lang } from "../i18n/index.ts";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function LanguageSwitcher() {
  const { lang, switchTo, t } = useLanguage();
  return (
    <div className="flex items-center gap-2 mr-3" role="group" aria-label={t("common.nav.languageLabel")}>
      {LANGS.map((l: Lang, i) => {
        const active = l === lang;
        return (
          <React.Fragment key={l}>
            {i > 0 && <span aria-hidden="true" className="text-muted-foreground/50 select-none">/</span>}
            <Link
              to={switchTo(l)}
              hrefLang={LANG_META[l].htmlLang}
              aria-label={LANG_META[l].label}
              aria-current={active ? "true" : undefined}
              className={`inline-flex items-center transition-opacity ${active ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}flags/${LANG_META[l].flagCode}.svg`}
                alt=""
                aria-hidden="true"
                width={24}
                height={18}
                style={{ display: "block", width: "24px", height: "18px", minWidth: "24px", maxWidth: "24px", objectFit: "fill" }}
                className="rounded-sm"
              />
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const { t, path } = useLanguage();
  const nav = getNav(useLanguage().lang);
  const homeAnchor = (anchor: string) => `${path("/")}#${anchor}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-5 h-16 flex items-center justify-between min-[1420px]:gap-8">
        <a href={homeAnchor("inicio")} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Zap size={15} className="text-white" />
          </div>
          <div className="whitespace-nowrap">
            <span className="font-bold text-primary text-base tracking-tight">White Fox Energy</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-1.5">{t("common.nav.brandSubtitle")}</span>
          </div>
        </a>

        <div className="hidden min-[1420px]:flex items-center gap-7">
          {nav.map((item) =>
            item.to ? (
              <Link key={item.key} to={path(item.to)} className="whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <a key={item.key} href={homeAnchor(item.anchor!)} className="whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden min-[1420px]:flex items-center gap-4">
          <LanguageSwitcher />
          <a href={TEL_HREF} className="whitespace-nowrap flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors">
            <Phone size={14} /> {PHONE_DISPLAY}
          </a>
          <a
            href={homeAnchor("contacto")}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            {t("common.nav.quote")} <ArrowRight size={13} />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="min-[1420px]:hidden text-foreground"
          aria-label={menuOpen ? t("common.nav.closeMenu") : t("common.nav.openMenu")}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="min-[1420px]:hidden bg-white border-t border-border px-5 pb-6 pt-3 flex flex-col gap-3">
          {nav.map((item) =>
            item.to ? (
              <Link key={item.key} to={path(item.to)} onClick={() => setMenuOpen(false)} className="py-1 text-sm text-foreground">
                {item.label}
              </Link>
            ) : (
              <a key={item.key} href={homeAnchor(item.anchor!)} onClick={() => setMenuOpen(false)} className="py-1 text-sm text-foreground">
                {item.label}
              </a>
            ),
          )}
          <div className="pt-1"><LanguageSwitcher /></div>
          <div className="flex gap-3 pt-2">
            <a href={TEL_HREF} className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-medium flex items-center justify-center gap-1.5">
              <Phone size={13} /> {t("common.buttons.callShort")}
            </a>
            <a href={homeAnchor("contacto")} onClick={() => setMenuOpen(false)} className="flex-1 py-2.5 rounded-full bg-accent text-white text-center text-sm font-semibold">
              {t("common.nav.quote")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
