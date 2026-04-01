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

const DropsCurrentRelease = ({ statusFilter = "all" }: { statusFilter?: string }) => {
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
  if (statusFilter !== "all" && piece.status !== statusFilter) return null;

  const badge = statusBadge(piece.status);
  const hasBothImages = piece.before_image_url && piece.after_image_url;

  return (
    <section className="container pb-20 pt-8">
      <div className="max-w-5xl mx-auto">
        {/* Dark band label */}
        <div className="bg-stone-950 px-5 py-2.5 mb-8 inline-block">
          <span className="font-sans font-bold text-xs tracking-[0.2em] text-orange-800 uppercase">
            ★ CURRENT RELEASE
          </span>
        </div>

        <Link to={`/drops/${piece.slug}`} className="group block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Image / Before-After Slider — taller aspect */}
            <div
              ref={containerRef}
              className={`relative aspect-[3/4] overflow-hidden bg-stone-200 ${hasBothImages ? "cursor-ew-resize select-none touch-none" : ""}`}
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
              {/* Grit texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                }}
              />
              <span className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-sans font-bold tracking-wider ${badge.cls} z-20`}>
                {badge.text}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center py-4">
              <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tighter text-stone-950 leading-[0.85] mb-4">
                {piece.title}
              </h2>
              {piece.description && (
                <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {piece.description}
                </p>
              )}

              {piece.materials && piece.materials.length > 0 && (
                <div className="mb-8">
                  <p className="font-sans font-bold text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-2">Materials</p>
                  <p className="font-serif text-stone-600 text-sm">
                    {piece.materials.join(" · ")}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Original</p>
                  <p className="font-sans font-black text-xl text-stone-950">$3</p>
                </div>
                <div className="w-px h-10 bg-stone-300" />
                {piece.price && (
                  <>
                    <div>
                      <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Final Price</p>
                      <p className="font-sans font-black text-xl text-orange-800">${piece.price}</p>
                    </div>
                    <div className="w-px h-10 bg-stone-300" />
                  </>
                )}
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Edition</p>
                  <p className="font-sans font-black text-xl text-stone-950">1 of 1</p>
                </div>
              </div>

              {/* Rust divider */}
              <div className="w-full h-px bg-orange-800/30 mb-8" />

              <button
                className="w-full bg-orange-800 text-stone-50 font-sans font-bold text-sm uppercase tracking-[0.15em] px-10 py-5 rounded-none hover:bg-orange-900 transition-all duration-300"
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
