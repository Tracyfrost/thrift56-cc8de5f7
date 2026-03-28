import beforeImg from "@/assets/before-piece.jpg";
import afterImg from "@/assets/after-piece.jpg";
import featuredDrop from "@/assets/featured-drop.jpg";

const mockProducts = [
  {
    id: 1,
    name: "Oxidized Vessel",
    price: "$185",
    before: beforeImg,
    after: afterImg,
    status: "available" as const,
  },
  {
    id: 2,
    name: "Reclaimed Frame No. 7",
    price: "$240",
    before: featuredDrop,
    after: afterImg,
    status: "available" as const,
  },
  {
    id: 3,
    name: "Weathered Basin",
    price: "$160",
    before: beforeImg,
    after: featuredDrop,
    status: "sold" as const,
  },
];

const AvailableNowGrid = () => {
  return (
    <section id="available-now" className="bg-[#F9F6F0] py-20 md:py-28">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 text-center mb-12">
          AVAILABLE NOW
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockProducts.map((product) => (
            <div key={product.id} className="group relative cursor-pointer">
              {/* Image container */}
              <div className="relative aspect-square overflow-hidden bg-stone-200">
                {/* Before (base) */}
                <img
                  src={product.before}
                  alt={`${product.name} before`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* After (hover reveal) */}
                <img
                  src={product.after}
                  alt={`${product.name} after`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* 1 of 1 badge — top right */}
                <span className="absolute top-3 right-3 bg-stone-950 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10">
                  1 of 1
                </span>
                {/* Status badge — top left */}
                {product.status === "available" ? (
                  <span className="absolute top-3 left-3 bg-orange-800 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10">
                    Available
                  </span>
                ) : (
                  <span className="absolute top-3 left-3 bg-stone-500 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 line-through z-10">
                    Sold
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="mt-3">
                <p className="font-sans font-bold text-sm uppercase tracking-wide text-stone-950">
                  {product.name}
                </p>
                <p className={`font-serif text-sm mt-1 ${product.status === "sold" ? "text-stone-400 line-through" : "text-orange-800"}`}>
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/drops"
            className="inline-flex items-center justify-center bg-transparent border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors"
          >
            View All Drops
          </a>
        </div>
      </div>
    </section>
  );
};

export default AvailableNowGrid;
