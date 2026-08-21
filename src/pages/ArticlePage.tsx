import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticleBySlug, formatDate } from "../data/blog.ts";
import ArticleContent from "../app/components/blog/ArticleContent.tsx";
import { useLanguage } from "../i18n/provider.tsx";

export default function ArticlePage() {
  const { t, lang, path } = useLanguage();
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(lang, slug) : undefined;

  if (!article) {
    return (
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-5 py-32 text-center">
          <h1 className="text-2xl font-extrabold mb-3">{t("pages.article.notFoundTitle")}</h1>
          <p className="text-muted-foreground mb-8">{t("pages.article.notFoundBody")}</p>
          <Link
            to={path("/blog")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={14} /> {t("pages.article.backToBlog")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <article className="pb-16">
        <header className="bg-secondary border-b border-border">
          <div className="max-w-3xl mx-auto px-5 py-12">
            <Link
              to={path("/blog")}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft size={14} /> {t("pages.article.backToBlog")}
            </Link>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">{article.title}</h1>

            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {formatDate(article.date, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {t("pages.article.readingMinutes", { minutes: article.readingMinutes })}
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-5">
          <img
            src={`${import.meta.env.BASE_URL}${article.cover}`}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl my-10 shadow-sm"
          />

          <ArticleContent slug={article.slug} />

          <div className="mt-16 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
            <h2 className="text-xl font-extrabold mb-2">{t("pages.article.ctaTitle")}</h2>
            <p className="text-primary-foreground/70 text-sm mb-6">{t("pages.article.ctaBody")}</p>
            <a
              href={`${path("/")}#contacto`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t("pages.article.ctaButton")} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
