import { useState, useMemo } from "react";
import { episodes, categoryLabels, type EpisodeCategory } from "@/data/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import SubscribePrompt from "@/components/SubscribePrompt";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type SortOption = "newest" | "most-viewed" | "transformations";
const categories: (EpisodeCategory | "all")[] = ["all", "thrift-hunt", "transformation", "giveaway", "livestream", "studio"];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "most-viewed", label: "Most Viewed" },
  { value: "transformations", label: "Transformations First" },
];

const EpisodesPage = () => {
  const [filter, setFilter] = useState<EpisodeCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let list = filter === "all" ? [...episodes] : episodes.filter((e) => e.category === filter);
    switch (sort) {
      case "most-viewed":
        list.sort((a, b) => b.views - a.views);
        break;
      case "transformations":
        list.sort((a, b) => (b.category === "transformation" ? 1 : 0) - (a.category === "transformation" ? 1 : 0));
        break;
      default:
        list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    return list;
  }, [filter, sort]);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="py-12 md:py-16 texture-paper">
        <div className="container">
          <div className="text-center mb-10">
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">ALL EPISODES</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Episode Hub</h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Every thrift hunt, transformation, giveaway, and livestream — all in one place.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 text-xs font-heading uppercase tracking-wider rounded-sm border transition-colors ${
                    filter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-border hover:border-rust"
                  }`}
                >
                  {cat === "all" ? "All" : categoryLabels[cat]}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-card border border-border rounded-sm px-3 py-1.5 text-xs font-heading uppercase tracking-wider focus:outline-none focus:border-rust"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No episodes match this filter.</p>
          )}

          <SubscribePrompt />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default EpisodesPage;
