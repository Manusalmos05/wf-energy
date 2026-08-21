import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";
import { useLanguage } from "../i18n/provider.tsx";

export default function NotFoundPage() {
  const { t, path } = useLanguage();
  return (
    <main className="pt-16">
      <div className="max-w-2xl mx-auto px-5 py-32 text-center">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("pages.notFound.eyebrow")}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{t("pages.notFound.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("pages.notFound.body")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to={path("/")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Home size={14} /> {t("common.actions.goHome")}
          </Link>
          <Link
            to={path("/blog")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:border-accent transition-colors"
          >
            <ArrowLeft size={14} /> {t("common.actions.seeBlog")}
          </Link>
        </div>
      </div>
    </main>
  );
}
