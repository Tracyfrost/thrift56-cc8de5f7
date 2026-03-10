import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useArtPieces } from "@/hooks/useSupabaseData";

const BeforeAfterSection = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: pieces } = useArtPieces();

  // Find first piece with both images
  const piece = pieces?.find((p) => p.before_image_url && p.after_image_url);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  if (!piece) return null;

  return (
    <section className="py-24 md:py-32 texture-paper">
      <div className="container">
        <div className="text-center mb-14">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">THE MAGIC</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5">Before & After</h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            Every piece starts as something forgotten. Drag to see the transformation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <div
            ref={containerRef}
            className="relative aspect-[4/5] overflow-hidden rounded-sm cursor-col-resize select-none border-2 border-border shadow-2xl"
            onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            <img src={piece.after_image_url!} alt="After transformation" className="absolute inset-0 w-full h-full object-cover" />

            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={piece.before_image_url!} alt="Before transformation" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth }} />
            </div>

            <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/80 shadow-lg" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground text-sm font-heading">↔</span>
              </div>
            </div>

            <span className="absolute top-4 left-4 bg-primary/80 text-primary-foreground px-3 py-1.5 text-xs font-heading uppercase tracking-wider">Before</span>
            <span className="absolute top-4 right-4 bg-rust/80 text-primary-foreground px-3 py-1.5 text-xs font-heading uppercase tracking-wider">After</span>
          </div>
          {piece.title && (
            <p className="text-center font-heading text-sm text-muted-foreground mt-4 tracking-wider">{piece.title}</p>
          )}
        </div>

        <div className="text-center">
          <Link to="/drops">
            <Button variant="hero-outline" size="lg" className="px-10 py-6">
              See More Transformations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
