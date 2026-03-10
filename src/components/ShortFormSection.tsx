import { Play } from "lucide-react";
import { shortVideos } from "@/data/episodes";

const ShortFormSection = () => {
  return (
    <section className="py-16 md:py-20 bg-bone">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-distressed text-rust text-sm tracking-widest mb-1">QUICK WATCH</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Shorts & Quick Transformations</h2>
          <p className="text-muted-foreground text-sm mt-2">Fast finds, fast art, fast fun.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 justify-start md:justify-center" style={{ scrollbarWidth: "none" }}>
          {shortVideos.map((short) => (
            <a
              key={short.id}
              href={`https://youtube.com/shorts/${short.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[160px] max-w-[160px] flex-shrink-0 group"
            >
              <div className="relative aspect-[9/16] rounded-sm overflow-hidden border border-border">
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                    <Play size={16} className="text-primary-foreground ml-0.5" />
                  </div>
                </div>
                <p className="absolute bottom-2 left-2 right-2 text-primary-foreground text-xs font-heading leading-tight">
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
