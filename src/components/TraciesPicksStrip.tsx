import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/shop/ProductCard";

const TraciesPicksStrip = () => {
  const { data: products, isLoading } = useShopifyProducts(4, 'product_type:"Tracie\'s Pick"');

  if (isLoading) return null;
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#F9F6F0] py-14 md:py-20 border-t border-stone-300">
      <div className="container">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="font-serif italic text-stone-500 text-sm mb-2">From the studio shelf</p>
            <h2 className="font-heading text-3xl md:text-5xl uppercase tracking-tighter text-stone-950 leading-[0.9]">
              Tracie's <span className="text-orange-800">Picks</span>
            </h2>
          </div>
          <Link
            to="/shop/tracies-picks"
            className="font-heading text-[10px] uppercase tracking-[0.2em] text-stone-700 hover:text-orange-800 transition-colors whitespace-nowrap"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraciesPicksStrip;
