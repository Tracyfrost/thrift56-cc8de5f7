import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Extract storage path inside the 'submissions' bucket from either a full
// public URL (legacy rows) or a bare path (new rows).
function extractPath(imageUrl: string): string | null {
  if (!imageUrl) return null;
  const marker = "/storage/v1/object/public/submissions/";
  const idx = imageUrl.indexOf(marker);
  if (idx !== -1) return imageUrl.slice(idx + marker.length);
  const altMarker = "/storage/v1/object/submissions/";
  const idx2 = imageUrl.indexOf(altMarker);
  if (idx2 !== -1) return imageUrl.slice(idx2 + altMarker.length);
  if (!imageUrl.startsWith("http")) return imageUrl.replace(/^submissions\//, "");
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { id } = await req.json();
    if (!id || typeof id !== "string") {
      return new Response(JSON.stringify({ error: "id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: row, error } = await admin
      .from("submissions")
      .select("id, image_url, is_approved")
      .eq("id", id)
      .maybeSingle();

    if (error || !row || !row.image_url) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If unapproved, require admin caller
    if (!row.is_approved) {
      const authHeader = req.headers.get("Authorization") || "";
      if (!authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: claimsData } = await userClient.auth.getClaims(token);
      const uid = claimsData?.claims?.sub;
      if (!uid) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: roleRow } = await admin
        .from("user_roles").select("id").eq("user_id", uid).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const path = extractPath(row.image_url);
    if (!path) {
      return new Response(JSON.stringify({ error: "Invalid image path" }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signErr } = await admin.storage
      .from("submissions")
      .createSignedUrl(path, 60 * 10);

    if (signErr || !signed?.signedUrl) {
      console.error("sign error", signErr);
      return new Response(JSON.stringify({ error: "Could not sign url" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: signed.signedUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submission-image-url error", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
