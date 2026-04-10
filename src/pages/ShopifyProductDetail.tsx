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
      <div className="min-h-screen bg-stone-950">
        <SiteNav />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-6 h-6 animate-spin text-rust" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-950">
        <SiteNav />
        <div className="container py-20 text-center">
          <p className="font-heading text-sm uppercase tracking-wider text-stone-500">
            Product not found
          </p>
          <Link to="/shop" className="text-rust text-xs uppercase tracking-wider mt-4 inline-block hover:underline">
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
    <div className="min-h-screen bg-stone-950">
      <SiteNav />

      <div className="container py-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-stone-500 hover:text-rust text-xs font-heading uppercase tracking-wider transition-colors"
        >
          <ChevronLeft size={14} /> Back to Shop
        </Link>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Images */}
          <div className="space-y-3">
            {images.length > 0 ? (
              images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <div key={i} className="aspect-square bg-stone-900 overflow-hidden border border-stone-800">
                  <img
                    src={img.node.url}
                    alt={img.node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="aspect-square bg-stone-900 border border-stone-800 flex items-center justify-center">
                <span className="font-heading text-stone-700 text-xs uppercase tracking-wider">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Right — Sticky Buy Box */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Exclusivity badge */}
            {isOneOfOne && (
              <div className="inline-block border border-rust/50 bg-rust/10 px-3 py-1">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-rust">
                  1 of 1 Worldwide
                </span>
              </div>
            )}

            {/* Title + Type */}
            <div>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider font-heading mb-1">
                {product.productType}
              </p>
              <h1 className="font-heading text-2xl md:text-3xl uppercase tracking-tighter text-stone-100 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="font-heading text-2xl text-rust">
              ${parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
            </div>

            {/* Four Pillars */}
            <FourPillars />

            {/* Description */}
            <p className="text-stone-400 text-sm leading-relaxed">
              {product.description}
            </p>

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
                              className={`px-3 py-1.5 border font-heading text-[10px] uppercase tracking-wider transition-colors ${
                                isSelected
                                  ? "border-rust bg-rust/10 text-rust"
                                  : "border-stone-700 text-stone-400 hover:border-stone-500"
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
              className="w-full bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] py-4 hover:bg-rust/85 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
            <Accordion type="multiple" className="border-t border-stone-800">
              <AccordionItem value="shipping" className="border-b border-stone-800">
                <AccordionTrigger className="font-heading text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-200 py-3 hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 text-xs leading-relaxed pb-3">
                  All originals ship within 5–7 business days via insured carrier. Merch ships within 3–5 business days.
                  Returns accepted within 14 days of delivery for items in original condition. Buyer pays return shipping.
                  Digital products are non-refundable after download.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="safety" className="border-b border-stone-800">
                <AccordionTrigger className="font-heading text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-200 py-3 hover:no-underline">
                  Product Safety
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 text-xs leading-relaxed pb-3">
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
