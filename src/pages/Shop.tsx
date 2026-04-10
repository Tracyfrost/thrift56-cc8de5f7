import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/shop/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2 } from "lucide-react";

const FILTERS = [
  { label: "All", query: undefined },
  { label: "Originals", query: "product_type:Original" },
  { label: "Prints", query: "product_type:Print" },
  { label: "Merch", query: "product_type:Merch" },
  { label: "Digital", query: "product_type:Digital" },
];

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const { data: products, isLoading } = useShopifyProducts(20, FILTERS[activeFilter].query);

  return (
    <div className="min-h-screen bg-stone-950">
      <SiteNav />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-stone-950 film-grain overflow-hidden">
        <div className="container text-center relative z-10">
          <p className="font-serif italic text-stone-500 text-sm mb-3">
            This was $3. It deserved better.
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-stone-100 leading-[0.9]">
            From Forgotten
            <br />
            <span className="text-rust">to Featured.</span>
          </h1>
          <p className="mt-4 text-stone-500 font-heading text-xs uppercase tracking-[0.2em]">
            Originals · Prints · Merch · Digital
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-y border-stone-800">
        <div className="container flex items-center gap-0 overflow-x-auto">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(i)}
              className={`font-heading text-[10px] uppercase tracking-[0.2em] px-5 py-3 border-r border-stone-800 transition-colors whitespace-nowrap ${
                activeFilter === i
                  ? "bg-rust text-cream"
                  : "text-stone-500 hover:text-stone-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="container py-10 md:py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-rust" />
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-xs uppercase tracking-wider text-stone-600">
              No products found
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

export default Shop;
