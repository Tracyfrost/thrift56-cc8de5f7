import { Link } from "react-router-dom";
import { useFeaturedEpisode } from "@/hooks/useSupabaseData";

const EpisodeHero = () => {
  const { data: episode, isLoading } = useFeaturedEpisode();

  return (
    <section className="bg-[#F9F6F0] texture-grain py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-stone-950 leading-[0.9] mb-4">
            EVERY PIECE HAS A STORY
          </h1>
          <p className="font-serif italic text-stone-500 text-lg md:text-xl max-w-xl mx-auto">
            From thrift shelf to finished art — watch the full transformation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video border-4 border-orange-800 bg-stone-200 relative overflow-hidden shadow-[0_0_30px_rgba(180,80,20,0.15)]">
            {episode?.youtube_id ? (
              <iframe
                src={`https://www.youtube.com/embed/${episode.youtube_id}?rel=0`}
                title={episode.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="font-serif italic text-stone-500 text-lg">
                  {isLoading ? "Loading…" : "Featured episode coming soon"}
                </p>
              </div>
            )}
          </div>
        </div>

        {episode && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-sans font-black tracking-tighter text-stone-950 mb-4">
              {episode.title}
            </h2>

            <div className="grid grid-cols-3 divide-x divide-stone-300 border-2 border-stone-300 mb-6">
              <div className="px-4 py-3 text-center">
                <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Original Price</p>
                <p className="font-sans font-black text-orange-800 text-xl md:text-2xl">
                  {episode.purchase_price || "—"}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Found At</p>
                <p className="font-sans font-black text-stone-950 text-xl md:text-2xl">
                  {episode.thrift_store_location || "Thrift Find"}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Episode</p>
                <p className="font-sans font-black text-stone-950 text-xl md:text-2xl">
                  {episode.episode_number ? `#${episode.episode_number}` : "Featured"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {episode.youtube_id && (
                <a
                  href={`https://www.youtube.com/watch?v=${episode.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-orange-800 text-[#F9F6F0] font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-orange-900 transition-colors min-h-[48px]"
                >
                  WATCH FULL EPISODE ON YOUTUBE
                </a>
              )}
              <Link
                to={`/episodes/${episode.slug}`}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-stone-950 text-stone-950 font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-stone-950 hover:text-[#F9F6F0] transition-colors min-h-[48px]"
              >
                VIEW EPISODE DETAILS
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EpisodeHero;
