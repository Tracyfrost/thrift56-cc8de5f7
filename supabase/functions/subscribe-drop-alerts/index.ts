// supabase/functions/subscribe-drop-alerts/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors"; // Official CORS helper — clean & maintained

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    // Input validation
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 254) {
      return new Response(JSON.stringify({ status: "invalid", message: "A valid email is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
      return new Response(JSON.stringify({ status: "invalid", message: "Name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { error } = await supabase.from("subscribers").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    if (error) {
      if (error.code === "23505") {
        // unique violation
        return new Response(JSON.stringify({ status: "duplicate", message: "Already on the list." }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.error("Insert error:", error);
      return new Response(JSON.stringify({ status: "error", message: "Failed to subscribe." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", message: "Subscribed successfully!" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ status: "error", message: "Internal server error. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
