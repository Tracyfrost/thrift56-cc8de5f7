import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SquarePaymentFormProps {
  itemId: string;
  itemTitle: string;
  price: number;
  onSuccess?: () => void;
}

const SquarePaymentForm = ({ itemId, itemTitle, price, onSuccess }: SquarePaymentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const qc = useQueryClient();

  const squareAppId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
  const isConfigured = !!squareAppId;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // When Square SDK is configured, tokenize card here.
      // For now, use placeholder nonce.
      const nonce = isConfigured ? "REAL_NONCE_FROM_SDK" : "PLACEHOLDER_NONCE";

      const { data, error } = await supabase.functions.invoke("square-checkout", {
        body: { item_id: itemId, nonce },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(data.placeholder
        ? "Payment simulated — Square not connected yet"
        : "Payment successful!");

      qc.invalidateQueries({ queryKey: ["thrift-item"] });
      qc.invalidateQueries({ queryKey: ["thrift-items"] });
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-4 border-stone-950 bg-[#F9F6F0]">
      <div className="p-8">
        <p className="font-sans font-black text-4xl tracking-tighter text-stone-950 mb-2">
          ${price}
        </p>
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">
          1 OF 1 · FREE SHIPPING
        </p>

        {!isConfigured && (
          <div className="mb-4 border border-orange-800/30 bg-orange-800/5 p-3">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-orange-800 mb-1">
              PAYMENT PREVIEW MODE
            </p>
            <p className="font-serif text-xs text-stone-500 italic">
              Square payments not configured yet. Click below to simulate a purchase.
            </p>
          </div>
        )}

        {isConfigured && (
          <div className="mb-4">
            {/* Square Web Payments SDK card container */}
            <div
              id="card-container"
              className="border-2 border-stone-300 p-4 min-h-[50px] mb-3 bg-white"
            />
            <div className="flex gap-2">
              <div id="apple-pay-button" className="flex-1" />
              <div id="google-pay-button" className="flex-1" />
            </div>
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-stone-50 border-t-transparent rounded-full animate-spin" />
              PROCESSING...
            </span>
          ) : (
            `ACQUIRE THIS PIECE — $${price}`
          )}
        </button>

        <p className="font-serif text-[11px] text-stone-400 text-center mt-3 italic">
          Secure checkout · All sales final
        </p>
      </div>
    </div>
  );
};

export default SquarePaymentForm;
