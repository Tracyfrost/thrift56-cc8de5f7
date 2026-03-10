import { Play } from "lucide-react";
import { useShortClips } from "@/hooks/useSupabaseData";
import { shortVideos } from "@/data/episodes";

const ShortFormSection = () => {
  const { data: dbClips } = useShortClips();

  // Use DB clips if available, otherwise fall back to mock
  const clips = dbClips && dbClips.length > 0
    ? dbClips.map((c) => ({ id: c.id, title: c.caption || "Short clip", thumbnail: c.thumbnail_url || "", youtubeId: c.youtube_id }))
    : shortVideos;

  if (clips.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-bone">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-2">QUICK WATCH</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Shorts & Quick Transformations</h2>
          <p className="text-muted-foreground text-sm mt-3 font-body">Fast finds, fast art, fast fun.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 justify-start md:justify-center scrollbar-hide snap-x snap-mandatory">
          {clips.map((short) => (
            <a
              key={short.id}
              href={`https://youtube.com/shorts/${short.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[150px] max-w-[150px] md:min-w-[170px] md:max-w-[170px] flex-shrink-0 group snap-start"
            >
              <div className="relative aspect-[9/16] rounded-sm overflow-hidden border border-border">
                {short.thumbnail ? (
                  <img src={short.thumbnail} alt={short.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center"><Play size={20} className="text-muted-foreground" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                    <Play size={16} className="text-primary-foreground ml-0.5" />
                  </div>
                </div>
                <p className="absolute bottom-2 left-2 right-2 text-primary-foreground text-[11px] font-heading leading-tight">
                  {short.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortFormSection;
