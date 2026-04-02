import { Link } from "react-router-dom";
import { useEpisodeDrops } from "@/hooks/useSupabaseData";

const LatestTransformationBrutalist = () => {
  const { data: drops } = useEpisodeDrops();
  const latestDrop = drops?.find((d: any) => d.status === "live") || drops?.[0];

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <section id="latest-transformation" className="bg-[#F9F6F0] py-20 md:py-28">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 mb-10">
          LATEST TRANSFORMATION
        </h2>

        <div className="max-w-4xl">
          <div className="aspect-video border-4 border-stone-950 bg-stone-900">
            <iframe
              src={latestDrop?.youtube_url ? getEmbedUrl(latestDrop.youtube_url) : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              title={latestDrop?.title || "Latest Thrift 56 Transformation"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {latestDrop?.title && (
            <p className="font-sans font-bold text-sm uppercase tracking-wide text-stone-950 mt-6">
              {latestDrop.title}
            </p>
          )}

          <div className="mt-4">
            <Link
              to="/episodes"
              className="inline-flex items-center justify-center bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors"
            >
              Watch Full Episode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestTransformationBrutalist;
