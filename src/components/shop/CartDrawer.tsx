import { useState, useEffect } from "react";
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
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
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
        <button className="relative p-2 text-stone-300 hover:text-rust transition-colors">
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-none bg-rust text-cream text-[10px] font-heading flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-stone-950 border-l border-stone-800 rounded-none text-stone-200">
        <SheetHeader className="flex-shrink-0 border-b border-stone-800 pb-4">
          <SheetTitle className="font-heading text-sm uppercase tracking-[0.2em] text-stone-200">
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
                <ShoppingCart className="h-10 w-10 text-stone-700 mx-auto mb-3" />
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
                    className="flex gap-3 p-3 border border-stone-800 bg-stone-900"
                  >
                    <div className="w-14 h-14 bg-stone-800 flex-shrink-0 overflow-hidden">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs uppercase tracking-wider truncate text-stone-200">
                        {item.product.node.title}
                      </h4>
                      {item.variantTitle !== "Default Title" && (
                        <p className="text-[10px] text-stone-500 uppercase">{item.variantTitle}</p>
                      )}
                      <p className="text-rust font-heading text-sm mt-1">
                        ${parseFloat(item.price.amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-stone-600 hover:text-rust transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-5 h-5 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 hover:border-stone-500"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center text-xs font-heading">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-5 h-5 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 hover:border-stone-500"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-stone-800">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-xs uppercase tracking-wider text-stone-400">Total</span>
                  <span className="font-heading text-lg text-rust">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-rust/85 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
