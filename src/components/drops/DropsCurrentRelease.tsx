import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFeaturedArtPiece } from "@/hooks/useSupabaseData";

const statusBadge = (status: string) => {
  switch (status) {
    case "available": return { text: "AVAILABLE", cls: "bg-orange-800 text-stone-50" };
    case "archived": return { text: "SOLD", cls: "bg-stone-400 text-stone-50" };
    default: return { text: status.toUpperCase(), cls: "bg-stone-950 text-stone-50" };
  }
};

const DropsCurrentRelease = () => {
  const { data: piece, isLoading } = useFeaturedArtPiece();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
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

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  if (isLoading) return <div className="container py-20 text-center text-stone-400 font-serif italic">Loading...</div>;
  if (!piece) return null;

  const badge = statusBadge(piece.status);
  const hasBothImages = piece.before_image_url && piece.after_image_url;

  return (
    <section className="container pb-20 pt-8">
      <div className="max-w-5xl mx-auto">
        <p className="font-sans font-bold text-xs tracking-[0.2em] text-orange-800 uppercase mb-6">
          ★ CURRENT RELEASE
        </p>
        <Link to={`/drops/${piece.slug}`} className="group block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image / Before-After Slider */}
            <div
              ref={containerRef}
              className={`relative aspect-[4/3] overflow-hidden bg-stone-200 ${hasBothImages ? "cursor-ew-resize select-none touch-none" : ""}`}
              onPointerDown={hasBothImages ? onPointerDown : undefined}
              onPointerMove={hasBothImages ? onPointerMove : undefined}
              onPointerUp={hasBothImages ? onPointerUp : undefined}
            >
              {hasBothImages ? (
                <>
                  <img src={piece.before_image_url!} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  <img
                    src={piece.after_image_url!}
                    alt={piece.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                    draggable={false}
                  />
                  {/* Slider handle */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-stone-50 z-10 pointer-events-none" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-50 border-2 border-stone-950 flex items-center justify-center shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-stone-950">
                        <path d="M5 3L1 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 3L15 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-4 bg-stone-950/80 text-stone-50 font-sans text-xs uppercase tracking-wider px-3 py-1 z-10">Before</span>
                  <span className="absolute bottom-4 right-4 bg-stone-950/80 text-stone-50 font-sans text-xs uppercase tracking-wider px-3 py-1 z-10">After</span>
                </>
              ) : piece.after_image_url ? (
                <img src={piece.after_image_url} alt={piece.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic">No image</div>
              )}
              <div className="absolute inset-0 bg-stone-950/5 pointer-events-none mix-blend-multiply" />
              <span className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-sans font-bold tracking-wider ${badge.cls} z-20`}>
                {badge.text}
              </span>
            </div>

            {/* Details */}
            <div>
              <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-stone-950 leading-[0.9] mb-4">
                {piece.title}
              </h2>
              {piece.description && (
                <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {piece.description}
                </p>
              )}

              {piece.materials && piece.materials.length > 0 && (
                <div className="mb-6">
                  <p className="font-sans font-bold text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-2">Materials</p>
                  <p className="font-serif text-stone-600 text-sm">
                    {piece.materials.join(" · ")}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-6 mb-6">
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Original</p>
                  <p className="font-sans font-black text-lg text-stone-950">$3</p>
                </div>
                <div className="w-px h-8 bg-stone-300" />
                {piece.price && (
                  <>
                    <div>
                      <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Final Price</p>
                      <p className="font-sans font-black text-lg text-orange-800">${piece.price}</p>
                    </div>
                    <div className="w-px h-8 bg-stone-300" />
                  </>
                )}
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Edition</p>
                  <p className="font-sans font-black text-lg text-stone-950">1 of 1</p>
                </div>
              </div>

              <button
                className="bg-orange-800 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-10 py-4 rounded-none hover:bg-orange-900 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {piece.status === "available" ? `BUY NOW${piece.price ? ` — $${piece.price}` : ""}` : badge.text}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default DropsCurrentRelease;
