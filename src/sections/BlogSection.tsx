import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { getSortedArticles } from "../data/blog.ts";
import ArticleCard from "../app/components/blog/ArticleCard.tsx";
import { useLanguage } from "../i18n/provider.tsx";

export default function BlogSection() {
  const { t, lang, path } = useLanguage();
  const recent = getSortedArticles(lang).slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.blog.eyebrow")}</p>
          <h2 className="text-4xl font-bold mt-3">{t("sections.blog.title")}</h2>
          <p className="text-white/70 text-base max-w-lg mx-auto">{t("sections.blog.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={path("/blog")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full whitespace-nowrap rounded-xl bg-accent-deep px-6 py-3 font-semibold text-accent-deep-foreground shadow-lg transition hover:bg-accent-deep/90 lg:py-2.5y"
          >
            {t("common.actions.seeAllArticles")} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
