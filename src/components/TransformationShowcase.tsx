import { useArtPieces } from "@/hooks/useSupabaseData";

const TransformationShowcase = () => {
  const { data: pieces } = useArtPieces();

  const transformations = (pieces || [])
    .filter((p) => p.before_image_url && p.after_image_url)
    .slice(0, 3);

  if (transformations.length === 0) return null;

  return (
    <section className="py-16 md:py-20 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-1">THE PROOF</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">From Thrift to Art</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Every piece starts forgotten. Every piece ends unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {transformations.map((t) => (
            <div key={t.id} className="group">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-border">
                  <img src={t.before_image_url!} alt="Before" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-primary/70 text-primary-foreground text-[9px] font-heading px-1.5 py-0.5 uppercase">Before</span>
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden border border-rust/30">
                  <img src={t.after_image_url!} alt="After" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-rust/70 text-primary-foreground text-[9px] font-heading px-1.5 py-0.5 uppercase">After</span>
                </div>
              </div>
              <p className="text-sm font-heading text-center text-muted-foreground">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationShowcase;
