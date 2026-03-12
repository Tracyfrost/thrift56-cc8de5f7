import { useState } from "react";
import { useEpisodes } from "@/hooks/useSupabaseData";
import EpisodeCard, { categoryLabels } from "@/components/EpisodeCard";
import SubscribePrompt from "@/components/SubscribePrompt";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShieldDivider from "@/components/ShieldDivider";
import logo from "@/assets/thrift56-logo-clean.png";

const categories = ["all", "thrift-hunt", "transformation", "giveaway", "livestream", "studio"];

const EpisodesPage = () => {
  const [filter, setFilter] = useState("all");
  const { data: episodes, isLoading } = useEpisodes(filter === "all" ? undefined : filter);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="py-12 md:py-16 texture-paper">
        <div className="container">
          <div className="text-center mb-10">
            <img src={logo} alt="" className="h-12 w-auto mx-auto mb-4 opacity-20" aria-hidden="true" />
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">ALL EPISODES</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Episode Hub</h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Every thrift hunt, transformation, giveaway, and livestream — all in one place.
            </p>
          </div>

          <ShieldDivider className="mb-8" />

          <div className="flex flex-wrap gap-2 justify-center mb-8">
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
                {cat === "all" ? "All" : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-12 font-body">Loading episodes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {episodes?.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          )}

          {!isLoading && (!episodes || episodes.length === 0) && (
            <p className="text-center text-muted-foreground py-12">No episodes found.</p>
          )}

          <SubscribePrompt />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default EpisodesPage;
