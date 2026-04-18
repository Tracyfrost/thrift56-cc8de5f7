import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const AvailableNowGrid = () => {
  const { data: edges, isLoading } = useShopifyProducts(6);
  const products = (edges || []).slice(0, 6);

  if (typeof window !== "undefined" && products.length > 0) {
    console.log("[Shopify products]", products);
  }

  return (
    <section id="available-now" className="bg-[#F9F6F0] texture-grain py-20 md:py-28 relative overflow-hidden">
      <div className="container relative z-10">
        <p className="font-serif italic text-stone-500 text-sm mb-2">One of one</p>
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 text-center mb-12">
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
            {products.map((edge: any, idx: number) => {
              const node = edge.node;
              const imageUrl = node?.images?.edges?.[0]?.node?.url;
              const imageAlt = node?.images?.edges?.[0]?.node?.altText || node?.title;
              const price = node?.priceRange?.minVariantPrice?.amount;
              const available = node?.variants?.edges?.[0]?.node?.availableForSale;

              return (
                <Link key={node.id} to={`/product/${node.handle}`} className="group block">
                  <div className="relative aspect-square overflow-hidden border-2 border-stone-300 group-hover:border-orange-800 transition-colors bg-[#1a1a1a]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        loading={idx < 3 ? "eager" : "lazy"}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null}
                    {!imageUrl && (
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <span className="font-sans text-white text-[13px] text-center uppercase tracking-tight leading-tight">
                          {node.title}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-[#F9F6F0] text-stone-950 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 border border-stone-300">
                      1 of 1
                    </span>
                    {available === false ? (
                      <span className="absolute top-3 left-3 bg-stone-400 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 line-through z-10">
                        Sold
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-orange-800 text-[#F9F6F0] font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10">
                        Available
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="font-sans font-bold text-sm uppercase tracking-wide text-stone-950 group-hover:text-orange-800 transition-colors">
                      {node.title}
                    </p>
                    <p className={`font-serif text-sm mt-1 ${available === false ? "text-stone-400 line-through" : "text-orange-800"}`}>
                      {price ? `$${parseFloat(price).toFixed(2)}` : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-950 hover:text-[#F9F6F0] transition-colors"
          >
            View All Drops
          </Link>
        </div>
      </div>

    </section>
  );
};

export default AvailableNowGrid;
