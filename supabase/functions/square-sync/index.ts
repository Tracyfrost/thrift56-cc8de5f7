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
    // Verify admin JWT
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Use anon client to verify JWT and check role
    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await anonClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const adminClient = createClient(supabaseUrl, serviceKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const squareAccessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const squareLocationId = Deno.env.get("SQUARE_LOCATION_ID");

    if (!squareAccessToken || !squareLocationId) {
      // PLACEHOLDER MODE
      return new Response(
        JSON.stringify({
          success: true,
          placeholder: true,
          message: "Square is not configured yet. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID to enable catalog sync.",
          synced: 0,
          created: 0,
          updated: 0,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── REAL Square catalog sync ──
    const baseUrl = "https://connect.squareup.com/v2";

    // Fetch catalog items
    const catalogRes = await fetch(`${baseUrl}/catalog/list?types=ITEM`, {
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${squareAccessToken}`,
      },
    });
    const catalogData = await catalogRes.json();
    if (!catalogRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Square catalog", details: catalogData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const items = catalogData.objects || [];
    let created = 0;
    let updated = 0;

    const catalogObjectIds: string[] = [];

    for (const catalogItem of items) {
      const itemData = catalogItem.item_data;
      if (!itemData) continue;

      const variation = itemData.variations?.[0];
      const variationId = variation?.id || null;
      const priceMoney = variation?.item_variation_data?.price_money;
      const price = priceMoney ? priceMoney.amount / 100 : null;

      if (variationId) catalogObjectIds.push(variationId);

      const slug = itemData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");

      // Upsert by square_catalog_id
      const { data: existing } = await adminClient
        .from("thrift_items")
        .select("id")
        .eq("square_catalog_id", catalogItem.id)
        .maybeSingle();

      if (existing) {
        await adminClient
          .from("thrift_items")
          .update({
            title: itemData.name,
            price,
            square_variation_id: variationId,
          })
          .eq("id", existing.id);
        updated++;
      } else {
        await adminClient.from("thrift_items").insert({
          square_catalog_id: catalogItem.id,
          square_variation_id: variationId,
          title: itemData.name,
          slug,
          price,
          category: "resurrected",
        });
        created++;
      }
    }

    // Fetch inventory counts
    if (catalogObjectIds.length > 0) {
      const invRes = await fetch(`${baseUrl}/inventory/counts/batch-retrieve`, {
        method: "POST",
        headers: {
          "Square-Version": "2024-01-18",
          Authorization: `Bearer ${squareAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalog_object_ids: catalogObjectIds,
          location_ids: [squareLocationId],
        }),
      });
      const invData = await invRes.json();

      for (const count of invData.counts || []) {
        const qty = parseInt(count.quantity || "0", 10);
        await adminClient
          .from("thrift_items")
          .update({
            square_inventory_count: qty,
            is_sold: qty <= 0,
          })
          .or(`square_catalog_id.eq.${count.catalog_object_id},square_variation_id.eq.${count.catalog_object_id}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced: items.length,
        created,
        updated,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Sync error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
