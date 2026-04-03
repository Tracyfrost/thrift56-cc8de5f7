import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { createHmac } from "https://deno.land/std@0.208.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function verifySignature(
  body: string,
  signature: string | null,
  webhookUrl: string
): Promise<boolean> {
  const sigKey = Deno.env.get("SQUARE_WEBHOOK_SIGNATURE_KEY");
  if (!sigKey) {
    console.warn("[PLACEHOLDER] No SQUARE_WEBHOOK_SIGNATURE_KEY set — skipping verification");
    return true;
  }
  if (!signature) return false;

  const payload = webhookUrl + body;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sigKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const computed = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return computed === signature;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("x-square-hmacsha256-signature");
    const webhookUrl = req.url;

    const valid = await verifySignature(body, signature, webhookUrl);
    if (!valid) {
      return new Response("Invalid signature", { status: 403 });
    }

    const event = JSON.parse(body);
    const eventType = event.type;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    console.log(`[square-webhook] Received event: ${eventType}`);

    if (eventType === "inventory.count.updated") {
      const counts = event.data?.object?.inventory_counts || [];
      for (const count of counts) {
        const catalogId = count.catalog_object_id;
        const quantity = parseInt(count.quantity || "0", 10);

        const { error } = await supabase
          .from("thrift_items")
          .update({
            square_inventory_count: quantity,
            is_sold: quantity <= 0,
          })
          .or(`square_catalog_id.eq.${catalogId},square_variation_id.eq.${catalogId}`);

        if (error) console.error("inventory update error:", error);
        else console.log(`Updated inventory for ${catalogId}: ${quantity}`);
      }
    }

    if (eventType === "order.created") {
      const lineItems = event.data?.object?.order?.line_items || [];
      for (const li of lineItems) {
        const catalogId = li.catalog_object_id;
        if (!catalogId) continue;

        const { error } = await supabase
          .from("thrift_items")
          .update({ is_sold: true, square_inventory_count: 0 })
          .or(`square_catalog_id.eq.${catalogId},square_variation_id.eq.${catalogId}`);

        if (error) console.error("order.created update error:", error);
        else console.log(`Marked ${catalogId} as sold via order.created`);
      }
    }

    if (eventType === "catalog.version.updated") {
      console.log("[square-webhook] Catalog updated — trigger admin sync for full refresh");
      // This is informational; admin can manually sync via square-sync function
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
