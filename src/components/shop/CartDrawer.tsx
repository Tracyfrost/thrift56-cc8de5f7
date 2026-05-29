import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { TENMOKU_SET_TAG, TENMOKU_SET_SIZE, TENMOKU_SET_CODE } from "@/data/tenmokuSet";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, addItem } = useCartStore();

  const hasTenmokuInCart = useMemo(
    () => items.some(i => i.product.node.tags?.includes(TENMOKU_SET_TAG)),
    [items]
  );
  const { data: tenmokuSet } = useShopifyProducts(10, hasTenmokuInCart ? `tag:${TENMOKU_SET_TAG}` : undefined);
  const cartVariantIds = useMemo(() => new Set(items.map(i => i.variantId)), [items]);
  const missingFromSet = useMemo(() => {
    if (!hasTenmokuInCart || !tenmokuSet) return [];
    return tenmokuSet.filter(p => {
      const v = p.node.variants.edges[0]?.node;
      return v && !cartVariantIds.has(v.id);
    });
  }, [hasTenmokuInCart, tenmokuSet, cartVariantIds]);
  const setComplete = hasTenmokuInCart && tenmokuSet && tenmokuSet.length >= TENMOKU_SET_SIZE && missingFromSet.length === 0;

  const handleAddSuggestion = async (product: typeof tenmokuSet[number]) => {
    const v = product.node.variants.edges[0]?.node;
    if (!v) return;
    await addItem({
      product,
      variantId: v.id,
      variantTitle: v.title,
      price: v.price,
      quantity: 1,
      selectedOptions: v.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 text-stone-300 hover:text-orange-800 transition-colors">
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-none bg-orange-800 text-[#F9F6F0] text-[10px] font-heading flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#F9F6F0] border-l border-stone-300 rounded-none text-stone-950">
        <SheetHeader className="flex-shrink-0 border-b border-stone-300 pb-4">
          <SheetTitle className="font-heading text-sm uppercase tracking-[0.2em] text-stone-950">
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-stone-500 text-xs uppercase tracking-wider">
            {totalItems === 0 ? "Nothing here yet" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-10 w-10 text-stone-400 mx-auto mb-3" />
                <p className="text-stone-500 font-heading text-xs uppercase tracking-wider">
                  Cart is empty
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-3 p-3 border border-stone-300 bg-white"
                  >
                    <div className="w-14 h-14 bg-stone-100 flex-shrink-0 overflow-hidden">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs uppercase tracking-wider truncate text-stone-950">
                        {item.product.node.title}
                      </h4>
                      {item.variantTitle !== "Default Title" && (
                        <p className="text-[10px] text-stone-500 uppercase">{item.variantTitle}</p>
                      )}
                      <p className="text-orange-800 font-heading text-sm mt-1">
                        ${parseFloat(item.price.amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-stone-400 hover:text-orange-800 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-5 h-5 border border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-950 hover:border-stone-500"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center text-xs font-heading">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-5 h-5 border border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-950 hover:border-stone-500"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {setComplete && (
                  <div className="mt-4 border border-orange-800/60 bg-orange-800/5 p-3 text-center">
                    <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-orange-800">
                      Tenmoku 4 Complete · Code {TENMOKU_SET_CODE} = 10% Off
                    </p>
                  </div>
                )}

                {!setComplete && missingFromSet.length > 0 && (
                  <div className="mt-4 border-t border-stone-300 pt-4">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-stone-950">
                      Complete the Set — Tenmoku 4
                    </p>
                    <p className="font-serif italic text-[11px] text-stone-600 mt-1 mb-3">
                      Add the rest, get 10% off at $120+ with code {TENMOKU_SET_CODE}.
                    </p>
                    <div className="space-y-2">
                      {missingFromSet.map(p => {
                        const node = p.node;
                        const img = node.images?.edges?.[0]?.node;
                        const variant = node.variants.edges[0]?.node;
                        return (
                          <div key={node.id} className="flex gap-3 p-2 border border-stone-300 bg-white items-center">
                            <div className="w-10 h-10 bg-stone-100 flex-shrink-0 overflow-hidden">
                              {img && <img src={img.url} alt={img.altText || node.title} className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-heading text-[10px] uppercase tracking-wider truncate text-stone-950">
                                {node.title}
                              </h5>
                              <p className="text-orange-800 font-heading text-xs">
                                ${parseFloat(variant?.price.amount || "0").toFixed(0)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAddSuggestion(p)}
                              disabled={isLoading || !variant}
                              className="flex-shrink-0 border border-orange-800 text-orange-800 font-heading text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 hover:bg-orange-800 hover:text-[#F9F6F0] transition-colors disabled:opacity-40 flex items-center gap-1"
                            >
                              {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Plus size={10} /> Add</>}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-stone-300">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-xs uppercase tracking-wider text-stone-600">Total</span>
                  <span className="font-heading text-lg text-orange-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full bg-orange-800 text-[#F9F6F0] font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-orange-800/85 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink size={14} />
                      Checkout
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
