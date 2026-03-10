import { Button } from "@/components/ui/button";
import featuredImg from "@/assets/featured-drop.jpg";
import beforeImg from "@/assets/before-piece.jpg";

type DropStatus = "available" | "giveaway" | "sold" | "raffle";

const statusConfig: Record<DropStatus, { label: string; cta: string; badgeClass: string }> = {
  available: { label: "Available", cta: "Shop the Piece", badgeClass: "bg-secondary text-secondary-foreground" },
  giveaway: { label: "Giveaway Live", cta: "Enter Giveaway", badgeClass: "bg-rust text-primary-foreground" },
  sold: { label: "Sold", cta: "View Drop", badgeClass: "bg-muted text-muted-foreground" },
  raffle: { label: "Raffle Open", cta: "Enter Raffle", badgeClass: "bg-secondary text-secondary-foreground" },
};

const FeaturedDropSection = () => {
  const status: DropStatus = "available";
  const config = statusConfig[status];

  return (
    <section className="py-20 md:py-28 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">CURRENT DROP</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Featured Piece</h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image side */}
          <div className="relative">
            <img
              src={featuredImg}
              alt="Featured art piece"
              className="w-full rounded-sm shadow-xl border border-border"
            />
            {/* Before thumbnail */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-sm overflow-hidden border-2 border-background shadow-lg">
              <img src={beforeImg} alt="Before" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[10px] font-heading text-center py-0.5 uppercase">Before</span>
            </div>
          </div>

          {/* Copy side */}
          <div>
            <span className={`inline-block px-4 py-1.5 text-xs font-heading uppercase tracking-widest rounded-sm mb-4 ${config.badgeClass}`}>
              {config.label}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The Botanical Vase
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              What started as a $3 dusty ceramic vase from a Goodwill shelf became a hand-painted botanical masterpiece. Each petal was painted live on camera during Episode 47. One of a kind—once it's gone, it's gone.
            </p>
            <Button variant="rust" size="lg" className="px-8 py-6">
              {config.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDropSection;
