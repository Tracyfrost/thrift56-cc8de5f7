import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const isOneOfOne = node.tags?.includes("1-of-1");
  const isLimited = node.productType === "Print";
  // Sandbox override: 1-of-1 curated items are purchasable on-site even if Shopify
  // inventory hasn't been set yet (during trial). Once stock is set, this is a no-op.
  const isPurchasable = firstVariant?.availableForSale || isOneOfOne;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group block border border-stone-300 bg-white hover:border-orange-800/50 transition-colors"
    >
      {/* Image */}
      <div className="aspect-square bg-stone-100 overflow-hidden relative">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-heading text-stone-400 text-xs uppercase tracking-wider">
              No Image
            </span>
          </div>
        )}

        {/* Badge */}
        {(isOneOfOne || isLimited) && (
          <div className="absolute top-2 left-2 bg-[#F9F6F0]/90 border border-orange-800/50 px-2 py-1">
            <span className="font-heading text-[10px] uppercase tracking-wider text-orange-800">
              {isOneOfOne ? "1 of 1" : "Limited /50"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-xs uppercase tracking-wider text-stone-950 leading-tight line-clamp-2">
            {node.title}
          </h3>
          <span className="font-heading text-sm text-orange-800 flex-shrink-0">
            ${parseFloat(price.amount).toFixed(0)}
          </span>
        </div>

        <p className="text-[10px] text-stone-500 uppercase tracking-wider">
          {node.productType}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          className="w-full mt-2 bg-stone-200 text-stone-800 font-heading text-[10px] uppercase tracking-[0.15em] py-2 hover:bg-orange-800 hover:text-white transition-colors disabled:opacity-40"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin mx-auto" />
          ) : !firstVariant?.availableForSale ? (
            "Sold Out"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
