import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { getSortedArticles, getAllTags } from "../data/blog.ts";
import ArticleCard from "../app/components/blog/ArticleCard.tsx";
import { useLanguage } from "../i18n/provider.tsx";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function BlogPage() {
  const { t, lang } = useLanguage();
  const articles = getSortedArticles(lang);
  const tags = getAllTags(lang);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter((a) => {
      const haystack = normalize(`${a.title} ${a.excerpt} ${a.tags.join(" ")}`);
      const matchesQuery = q === "" || haystack.includes(q);
      const matchesTags = activeTags.length === 0 || activeTags.some((tag) => a.tags.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags, articles]);

  return (
    <main className="pt-16">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("pages.blog.hero.eyebrow")}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{t("pages.blog.hero.title")}</h1>
          <p className="text-primary-foreground/70 text-base max-w-lg mx-auto">{t("pages.blog.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex-col md:flex-row md:items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("pages.blog.search.placeholder")}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div className="display flex-wrap items-center gap-2 p-5">
              {tags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-white text-muted-foreground border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} /> {t("pages.blog.search.clear")}
                </button>
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} headingLevel={2} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground font-semibold mb-1">{t("pages.blog.search.emptyTitle")}</p>
              <p className="text-sm text-muted-foreground">{t("pages.blog.search.emptyBody")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
