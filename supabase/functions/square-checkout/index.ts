import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { item_id, nonce } = await req.json();

    if (!item_id || !nonce) {
      return new Response(
        JSON.stringify({ error: "item_id and nonce are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Look up the item
    const { data: item, error: itemErr } = await supabase
      .from("thrift_items")
      .select("id, title, price, square_variation_id, is_sold")
      .eq("id", item_id)
      .single();

    if (itemErr || !item) {
      return new Response(
        JSON.stringify({ error: "Item not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (item.is_sold) {
      return new Response(
        JSON.stringify({ error: "Item is already sold" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── PLACEHOLDER: Square API calls ──
    // When Square is configured, this will:
    // 1. Create a Square Order via POST /v2/orders
    // 2. Process payment via POST /v2/payments with the nonce
    //
    // For now, simulate a successful payment:

    const squareAccessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const squareLocationId = Deno.env.get("SQUARE_LOCATION_ID");

    if (!squareAccessToken || !squareLocationId) {
      // PLACEHOLDER MODE: simulate success without Square
      console.log(`[PLACEHOLDER] Simulating checkout for item ${item.title} ($${item.price})`);

      const { error: updateErr } = await supabase
        .from("thrift_items")
        .update({ is_sold: true, square_inventory_count: 0 })
        .eq("id", item_id);

      if (updateErr) throw updateErr;

      return new Response(
        JSON.stringify({
          success: true,
          placeholder: true,
          message: `Payment simulated for "${item.title}". Square not configured yet.`,
          order_id: `PLACEHOLDER-${Date.now()}`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── REAL Square checkout flow ──
    const baseUrl = "https://connect.squareup.com/v2";

    // Create order
    const orderRes = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${squareAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: squareLocationId,
          line_items: [
            {
              name: item.title,
              quantity: "1",
              base_price_money: {
                amount: Math.round((item.price || 0) * 100),
                currency: "USD",
              },
              ...(item.square_variation_id
                ? { catalog_object_id: item.square_variation_id }
                : {}),
            },
          ],
        },
      }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      console.error("Square order error:", orderData);
      return new Response(
        JSON.stringify({ error: "Failed to create Square order", details: orderData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process payment
    const paymentRes = await fetch(`${baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${squareAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        source_id: nonce,
        amount_money: {
          amount: Math.round((item.price || 0) * 100),
          currency: "USD",
        },
        order_id: orderData.order.id,
        location_id: squareLocationId,
      }),
    });

    const paymentData = await paymentRes.json();
    if (!paymentRes.ok) {
      console.error("Square payment error:", paymentData);
      return new Response(
        JSON.stringify({ error: "Payment failed", details: paymentData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark as sold
    await supabase
      .from("thrift_items")
      .update({ is_sold: true, square_inventory_count: 0 })
      .eq("id", item_id);

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderData.order.id,
        payment_id: paymentData.payment.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
