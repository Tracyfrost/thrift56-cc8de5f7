import { useState, useRef, useCallback } from "react";
import beforeImg from "@/assets/before-piece.jpg";
import afterImg from "@/assets/after-piece.jpg";

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <section className="bg-[#F9F6F0] py-20 md:py-28">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 text-center mb-12">
          FROM FORGOTTEN TO FEATURED
        </h2>

        <div className="max-w-3xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] overflow-hidden rounded-none cursor-ew-resize select-none touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* Before (base layer) */}
            <img
              src={beforeImg}
              alt="Before transformation"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* After (clipped top layer) */}
            <img
              src={afterImg}
              alt="After transformation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` }}
              draggable={false}
            />
            {/* Drag line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-stone-50 z-10 pointer-events-none"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-50 border-2 border-stone-950 flex items-center justify-center shadow-lg pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-stone-950">
                  <path d="M5 3L1 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 3L15 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {/* Labels */}
            <span className="absolute bottom-4 left-4 bg-stone-950/80 text-stone-50 font-sans text-xs uppercase tracking-wider px-3 py-1 z-10">
              Before
            </span>
            <span className="absolute bottom-4 right-4 bg-stone-950/80 text-stone-50 font-sans text-xs uppercase tracking-wider px-3 py-1 z-10">
              After
            </span>
          </div>

          <div className="text-center mt-8">
            <a
              href="/drops"
              className="inline-flex items-center justify-center bg-transparent border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors"
            >
              View This Piece
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
