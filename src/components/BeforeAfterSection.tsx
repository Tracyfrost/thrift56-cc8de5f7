import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import beforeImg from "@/assets/before-piece.jpg";
import afterImg from "@/assets/after-piece.jpg";

const BeforeAfterSection = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <section className="py-20 md:py-28 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE MAGIC</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Before & After
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every piece starts as something forgotten. Watch what happens when art meets intention.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <div
            ref={containerRef}
            className="relative aspect-[4/5] overflow-hidden rounded-sm cursor-col-resize select-none border border-border shadow-lg"
            onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* After (full background) */}
            <img src={afterImg} alt="After transformation" className="absolute inset-0 w-full h-full object-cover" />

            {/* Before (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={beforeImg} alt="Before transformation" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth }} />
            </div>

            {/* Slider line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/80 shadow-lg" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-heading">↔</span>
              </div>
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 bg-primary/80 text-primary-foreground px-3 py-1 text-xs font-heading uppercase tracking-wider">Before</span>
            <span className="absolute top-4 right-4 bg-rust/80 text-primary-foreground px-3 py-1 text-xs font-heading uppercase tracking-wider">After</span>
          </div>
        </div>

        <div className="text-center">
          <Button variant="hero-outline" size="lg">
            See More Transformations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
