import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const LatestEpisodeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-bone">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">ON YOUTUBE</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Latest Episode
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video embed placeholder */}
          <div className="relative aspect-video bg-charcoal rounded-sm overflow-hidden mb-8 group cursor-pointer shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
              <p className="font-heading text-primary-foreground text-sm uppercase tracking-wider mb-1">Episode 47</p>
              <h3 className="font-heading text-primary-foreground text-2xl md:text-3xl">
                The $3 Vase That Became a $200 Art Piece
              </h3>
            </div>
          </div>

          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 leading-relaxed">
            Tracie finds a dusty ceramic vase at Goodwill and transforms it into a hand-painted botanical masterpiece. Watch the full journey from shelf to studio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="gap-2 px-8 py-6">
              <Play size={16} />
              Watch on YouTube
            </Button>
            <Button variant="hero-outline" size="lg" className="px-8 py-6">
              Browse Episodes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodeSection;
