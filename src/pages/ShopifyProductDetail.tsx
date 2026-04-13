import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FourPillars from "@/components/shop/FourPillars";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0]">
        <SiteNav />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-6 h-6 animate-spin text-orange-800" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F6F0]">
        <SiteNav />
        <div className="container py-20 text-center">
          <p className="font-heading text-sm uppercase tracking-wider text-stone-500">
            Product not found
          </p>
          <Link to="/shop" className="text-orange-800 text-xs uppercase tracking-wider mt-4 inline-block hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");
  const isOneOfOne = product.tags?.includes("1-of-1");

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: {
        node: {
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          productType: product.productType,
          tags: product.tags,
          priceRange: product.priceRange,
          images: product.images,
          variants: product.variants,
          options: product.options,
        },
      },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />

      <div className="container py-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-stone-500 hover:text-orange-800 text-xs font-heading uppercase tracking-wider transition-colors"
        >
          <ChevronLeft size={14} /> Back to Shop
        </Link>
      </div>

      <div className="container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Cinematic Gallery */}
          <div className="space-y-4">
            {images.length > 0 ? (
              images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <div key={i} className="aspect-[4/5] bg-stone-100 overflow-hidden border border-stone-300">
                  <img
                    src={img.node.url}
                    alt={img.node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="aspect-[4/5] bg-stone-100 border border-stone-300 flex items-center justify-center">
                <span className="font-heading text-stone-400 text-xs uppercase tracking-wider">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Right — Sticky Buy Box */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
            {/* Exclusivity badge */}
            {isOneOfOne && (
              <div className="inline-block border border-orange-800/50 bg-orange-800/10 px-4 py-1.5">
                <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-orange-800">
                  1 of 1 Worldwide
                </span>
              </div>
            )}

            {/* Title + Type */}
            <div>
              <p className="text-[10px] text-stone-600 uppercase tracking-[0.2em] font-heading mb-2">
                {product.productType}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter text-stone-950 leading-none">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="font-heading text-3xl text-orange-800">
              ${parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
            </div>

            {/* Four Pillars */}
            <FourPillars />

            {/* Origin Line + Description */}
            <div className="space-y-3 border-l-2 border-orange-800/30 pl-5">
              <p className="font-body italic text-stone-600 text-sm leading-relaxed">
                {product.description?.split('.')[0]}.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                {product.description?.split('.').slice(1).join('.').trim()}
              </p>
            </div>

            {/* Variant selector */}
            {hasMultipleVariants && product.options && (
              <div className="space-y-3">
                {product.options
                  .filter((opt: { name: string }) => opt.name !== "Title")
                  .map((option: { name: string; values: string[] }) => (
                    <div key={option.name}>
                      <label className="font-heading text-[10px] uppercase tracking-wider text-stone-500 block mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string) => {
                          const variantIdx = variants.findIndex(
                            (v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                              v.node.selectedOptions.some(
                                (so) => so.name === option.name && so.value === value
                              )
                          );
                          const isSelected = variantIdx === selectedVariantIdx;
                          return (
                            <button
                              key={value}
                              onClick={() => setSelectedVariantIdx(variantIdx >= 0 ? variantIdx : 0)}
                              className={`px-4 py-2 border font-heading text-[10px] uppercase tracking-wider transition-colors ${
                                isSelected
                                  ? "border-orange-800 bg-orange-800/10 text-orange-800"
                                  : "border-stone-300 text-stone-600 hover:border-stone-500"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
              className="w-full bg-orange-800 text-[#F9F6F0] font-heading text-sm uppercase tracking-[0.15em] py-5 hover:bg-orange-800/85 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {cartLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                "Sold Out"
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Accordions */}
            <Accordion type="multiple" className="border-t border-stone-300">
              <AccordionItem value="journey" className="border-b border-stone-300">
                <AccordionTrigger className="font-heading text-[10px] uppercase tracking-wider text-stone-600 hover:text-stone-950 py-4 hover:no-underline">
                  The Journey
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 text-xs leading-relaxed pb-4 space-y-2">
                  <p><span className="text-stone-700 font-heading uppercase text-[9px] tracking-wider">Discovery</span> — Pulled from a place most people ignore.</p>
                  <p><span className="text-stone-700 font-heading uppercase text-[9px] tracking-wider">Transformation</span> — Restored, reimagined, and finished by hand.</p>
                  <p><span className="text-stone-700 font-heading uppercase text-[9px] tracking-wider">Story</span> — The entire process documented on film.</p>
                  <p><span className="text-stone-700 font-heading uppercase text-[9px] tracking-wider">Release</span> — Limited. Once it's gone, it stays gone.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b border-stone-300">
                <AccordionTrigger className="font-heading text-[10px] uppercase tracking-wider text-stone-600 hover:text-stone-950 py-4 hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 text-xs leading-relaxed pb-4">
                  All originals ship within 5–7 business days via insured carrier. Merch ships within 3–5 business days.
                  Returns accepted within 14 days of delivery for items in original condition. Buyer pays return shipping.
                  Digital products are non-refundable after download.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="safety" className="border-b border-stone-300">
                <AccordionTrigger className="font-heading text-[10px] uppercase tracking-wider text-stone-600 hover:text-stone-950 py-4 hover:no-underline">
                  Product Safety
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 text-xs leading-relaxed pb-4">
                  All transformed items are inspected for structural integrity and finished with non-toxic, archival-grade materials.
                  Items labeled as decorative are not intended for food contact unless specifically noted.
                  For questions about materials used, contact us directly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default ShopifyProductDetail;
