import { episodes } from "@/data/episodes";
import beforePiece from "@/assets/before-piece.jpg";
import afterPiece from "@/assets/after-piece.jpg";
import featuredDrop from "@/assets/featured-drop.jpg";

const transformations = [
  { before: beforePiece, after: afterPiece, caption: "The Botanical Vase — Episode 47" },
  { before: beforePiece, after: featuredDrop, caption: "The Gallery Frame — Episode 44" },
  { before: beforePiece, after: afterPiece, caption: "The Treasure Chest — Episode 42" },
];

const TransformationShowcase = () => {
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
          {transformations.map((t, i) => (
            <div key={i} className="group">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-border">
                  <img src={t.before} alt="Before" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-primary/70 text-primary-foreground text-[9px] font-heading px-1.5 py-0.5 uppercase">Before</span>
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden border border-rust/30">
                  <img src={t.after} alt="After" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-rust/70 text-primary-foreground text-[9px] font-heading px-1.5 py-0.5 uppercase">After</span>
                </div>
              </div>
              <p className="text-sm font-heading text-center text-muted-foreground">{t.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationShowcase;
