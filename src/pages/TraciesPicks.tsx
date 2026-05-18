import SiteNav from "@/components/SiteNav";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/shop/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2 } from "lucide-react";

const TraciesPicks = () => {
  const { data: products, isLoading } = useShopifyProducts(100, 'product_type:"Tracie\'s Pick"');

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <Seo
        title="Tracie's Picks — Curated Apparel & Studio Goods | Thrift 56"
        description="Hand-selected apparel, hats, and lifestyle objects chosen by Tracie for the Thrift 56 world."
        path="/shop/tracies-picks"
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-[#F9F6F0] film-grain overflow-hidden border-b border-stone-300">
        <div className="container text-center relative z-10 max-w-3xl">
          <p className="font-serif italic text-stone-500 text-sm mb-3">
            Selected by Tracie.
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-stone-950 leading-[0.9]">
            Not Thrifted.
            <br />
            <span className="text-orange-800">Still Worthy.</span>
          </h1>
          <p className="mt-6 text-stone-600 text-sm md:text-base max-w-xl mx-auto">
            Hand-selected apparel, objects, and lifestyle goods chosen for the Thrift 56 world.
          </p>
          <p className="mt-4 text-stone-500 font-heading text-[10px] uppercase tracking-[0.2em]">
            Apparel · Hats · Objects · Studio Goods
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container py-10 md:py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-orange-800" />
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif italic text-stone-500 text-base mb-2">
              Tracie hasn't picked anything new yet.
            </p>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-stone-500">
              Check back soon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};

export default TraciesPicks;
