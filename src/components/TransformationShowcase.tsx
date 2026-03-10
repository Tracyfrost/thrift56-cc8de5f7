import { useArtPieces } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TransformationShowcase = () => {
  const { data: pieces } = useArtPieces();

  const transformations = (pieces || [])
    .filter((p) => p.before_image_url && p.after_image_url)
    .slice(0, 3);

  if (transformations.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="container">
        <div className="text-center mb-14">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">THE PROOF</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground">From Thrift to Art</h2>
          <p className="text-primary-foreground/50 text-sm mt-3 max-w-md mx-auto font-body">
            Every piece starts forgotten. Every piece ends unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto mb-12">
          {transformations.map((t) => (
            <Link to={`/drops/${t.slug}`} key={t.id} className="group">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-primary-foreground/10">
                  <img src={t.before_image_url!} alt="Before" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 left-2 bg-primary/80 text-primary-foreground text-[9px] font-heading px-2 py-0.5 uppercase tracking-wider">Before</span>
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden border border-rust/30">
                  <img src={t.after_image_url!} alt="After" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 left-2 bg-rust/80 text-primary-foreground text-[9px] font-heading px-2 py-0.5 uppercase tracking-wider">After</span>
                </div>
              </div>
              <p className="text-sm font-heading text-center text-primary-foreground/70 group-hover:text-rust transition-colors">{t.title}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/drops">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-6">
              View All Transformations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TransformationShowcase;
