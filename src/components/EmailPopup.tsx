import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("email-popup-dismissed")) return;

    const timer = setTimeout(() => setShow(true), 8000);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) setShow(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("email-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-drop-alerts", {
        body: { name, email },
      });
      if (error) throw error;
      if (data?.status === "duplicate") {
        toast.success("Already on the list", { description: "You're good — we've got you." });
      } else if (data?.status === "success") {
        toast.success("You're in!", { description: "You'll be first to know about the next drop." });
      } else {
        throw new Error(data?.message || "Failed");
      }
      dismiss();
    } catch (err) {
      console.error("Email popup error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-stone-950 border border-stone-800 p-6 md:p-8 max-w-md w-full z-10 texture-grain overflow-hidden">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-stone-600 hover:text-stone-300 transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="relative z-10">
          <p className="font-serif italic text-stone-500 text-xs mb-1">Don't miss the next one</p>
          <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-stone-100 mb-1">
            Next Drop <span className="text-orange-800">Alert</span>
          </h3>
          <p className="text-stone-500 text-xs mb-5 font-serif">
            Be first to know when new 1-of-1 pieces drop. No spam, just art.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm font-serif placeholder:text-stone-600 focus:border-orange-800 focus:outline-none rounded-none"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm font-serif placeholder:text-stone-600 focus:border-orange-800 focus:outline-none rounded-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-800 text-stone-50 font-sans font-black text-xs uppercase tracking-[0.15em] py-3 hover:bg-orange-900 transition-colors disabled:opacity-50 rounded-none min-h-[48px]"
            >
              {submitting ? "Joining..." : "Get Drop Alerts"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
