import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "ready" | "already" | "invalid" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } },
        );
        const data = await res.json();
        if (!res.ok) {
          setState("invalid");
        } else if (data.valid === false && data.reason === "already_unsubscribed") {
          setState("already");
        } else if (data.valid) {
          setState("ready");
        } else {
          setState("invalid");
        }
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setSubmitting(false);
    if (error || (data && data.success === false && data.reason === "already_unsubscribed")) {
      setState(data?.reason === "already_unsubscribed" ? "already" : "error");
    } else {
      setState("done");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <section className="container py-20 max-w-lg">
        <p className="font-serif italic text-stone-500 text-sm mb-3">Email preferences</p>
        <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter text-stone-950 mb-6">
          Unsubscribe
        </h1>

        {state === "loading" && <p className="text-stone-700">Checking your link...</p>}

        {state === "ready" && (
          <>
            <p className="text-stone-700 mb-6">
              Click below to confirm you want to stop receiving emails from THRIFT 56.
            </p>
            <button
              onClick={confirm}
              disabled={submitting}
              className="w-full bg-orange-800 text-[#F9F6F0] font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-orange-900 transition-colors disabled:opacity-60"
            >
              {submitting ? "Working..." : "Confirm Unsubscribe"}
            </button>
          </>
        )}

        {state === "done" && (
          <p className="text-stone-700">You've been unsubscribed. Sorry to see you go.</p>
        )}
        {state === "already" && (
          <p className="text-stone-700">You're already unsubscribed. No further action needed.</p>
        )}
        {state === "invalid" && (
          <p className="text-stone-700">This unsubscribe link is invalid or expired.</p>
        )}
        {state === "error" && (
          <p className="text-stone-700">Something went wrong. Please try again later.</p>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default Unsubscribe;
