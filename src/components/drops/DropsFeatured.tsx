import { getFeaturedPiece } from "@/data/artPieces";
import { Link } from "react-router-dom";

const DropsFeatured = () => {
  const piece = getFeaturedPiece();
  if (!piece) return null;

  return (
    <section className="container pb-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-sans font-bold text-xs tracking-[0.2em] text-orange-800 uppercase mb-4">
          ★ FEATURED DROP
        </p>
        <Link to={`/drops/${piece.slug}`} className="group block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src={piece.beforeImage}
                alt={`${piece.title} before`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src={piece.afterImage}
                alt={piece.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/5 pointer-events-none mix-blend-multiply" />
              <span className="absolute top-4 right-4 px-4 py-1.5 text-xs font-sans font-bold tracking-wider bg-orange-800 text-stone-50">
                AVAILABLE
              </span>
            </div>

            {/* Details */}
            <div>
              <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-stone-950 leading-[0.9] mb-4">
                {piece.title}
              </h2>
              <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-6">
                {piece.description}
              </p>

              {piece.materials && (
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
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Final Price</p>
                  <p className="font-sans font-black text-lg text-orange-800">${piece.price}</p>
                </div>
                <div className="w-px h-8 bg-stone-300" />
                <div>
                  <p className="font-sans font-bold text-xs text-stone-400 tracking-wider uppercase">Edition</p>
                  <p className="font-sans font-black text-lg text-stone-950">1 of 1</p>
                </div>
              </div>

              <button className="bg-orange-800 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-10 py-4 rounded-none hover:bg-orange-900 transition-colors"
                onClick={(e) => e.preventDefault()}>
                BUY NOW — ${piece.price}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default DropsFeatured;
