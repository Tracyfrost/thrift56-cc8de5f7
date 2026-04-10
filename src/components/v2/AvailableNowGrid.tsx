import { Link } from "react-router-dom";
import { useThriftItems } from "@/hooks/useSupabaseData";

const AvailableNowGrid = () => {
  const { data: items, isLoading } = useThriftItems();
  const products = (items || []).slice(0, 6);

  return (
    <section id="available-now" className="section-dark texture-grain py-20 md:py-28">
      {/* Asymmetric rust accent line */}
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-orange-800 z-10" />

      <div className="container relative z-10">
        <p className="font-serif italic text-stone-500 text-sm mb-2">One of one</p>
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-50 text-center mb-12">
          AVAILABLE NOW
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-orange-800 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-serif italic text-stone-500 py-12">No pieces yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {products.map((product: any) => (
              <Link key={product.id} to={`/shop/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-stone-900 border-2 border-stone-800 group-hover:border-orange-800 transition-colors">
                  {product.before_image_url && (
                    <img
                      src={product.before_image_url}
                      alt={`${product.title} before`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {product.after_image_url && (
                    <img
                      src={product.after_image_url}
                      alt={`${product.title} after`}
                      className={`absolute inset-0 w-full h-full object-cover ${product.before_image_url ? "opacity-0 group-hover:opacity-100 transition-opacity duration-500" : ""}`}
                    />
                  )}
                  {!product.before_image_url && !product.after_image_url && (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-600 font-sans text-sm">No Image</div>
                  )}
                  <span className="absolute top-3 right-3 bg-stone-950 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 border border-stone-700">
                    1 of 1
                  </span>
                  {product.is_sold ? (
                    <span className="absolute top-3 left-3 bg-stone-700 text-stone-400 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 line-through z-10">
                      Sold
                    </span>
                  ) : product.square_inventory_count === 1 ? (
                    <span className="absolute top-3 left-3 bg-orange-800 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 animate-pulse">
                      ONLY 1 LEFT
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-orange-800 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10">
                      Available
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="font-sans font-bold text-sm uppercase tracking-wide text-stone-100 group-hover:text-orange-800 transition-colors">
                    {product.title}
                  </p>
                  <p className={`font-serif text-sm mt-1 ${product.is_sold ? "text-stone-600 line-through" : "text-orange-800"}`}>
                    {product.price ? `$${product.price}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/drops"
            className="inline-flex items-center justify-center border-2 border-stone-50 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-50 hover:text-stone-950 transition-colors"
          >
            View All Drops
          </Link>
        </div>
      </div>

      {/* Bottom asymmetric rust accent */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1 bg-orange-800 z-10" />
    </section>
  );
};

export default AvailableNowGrid;
