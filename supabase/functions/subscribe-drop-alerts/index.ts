import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-api-version, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const COMMON_TLDS = new Set([
      "com","net","org","io","co","app","dev","me","us","uk","ca","au","de","fr","es","it","nl","se","no","fi","dk","ie","pl","pt","ch","at","be","cz","gr","ru","ua","tr","il","ae","sa","za","jp","kr","cn","hk","tw","sg","in","id","ph","th","vn","my","br","mx","ar","cl","pe","ve","nz","edu","gov","mil","int","info","biz","tv","xyz","online","store","shop","art","studio","email","live","news","media","agency","design","tech","ai","pro","blog","space","site","club","fun","world","today","ly","cc","to","gg","fm","so","is","im","name","mobi","asia","tel",
    ]);

    if (!emailStr || emailStr.length > 254 || !emailRegex.test(emailStr)) {
      return new Response(
        JSON.stringify({ status: "invalid", message: "A valid email is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tld = emailStr.split("@")[1].split(".").pop()!;
    if (tld.length >= 4 && !COMMON_TLDS.has(tld)) {
      return new Response(
        JSON.stringify({ status: "invalid", message: `".${tld}" doesn't look like a real domain extension.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("subscribers")
      .insert({ name: name.trim(), email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ status: "duplicate", message: "Already on the list." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("Insert error:", error);
      return new Response(
        JSON.stringify({ status: "error", message: "Failed to subscribe." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: "success", message: "Subscribed successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
