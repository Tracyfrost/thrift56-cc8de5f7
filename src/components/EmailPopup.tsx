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
    // Don't show if already dismissed this session
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
      const { error } = await supabase.from("subscribers").insert({ name, email });
      if (error) throw error;
      toast.success("You're in!", { description: "You'll be first to know about the next drop." });
      dismiss();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-stone-950 border border-stone-800 p-6 md:p-8 max-w-md w-full z-10">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-stone-600 hover:text-stone-300 transition-colors"
        >
          <X size={18} />
        </button>

        <p className="font-serif italic text-stone-500 text-xs mb-1">Don't miss the next one</p>
        <h3 className="font-heading text-xl uppercase tracking-tighter text-stone-100 mb-1">
          Next Drop <span className="text-rust">Alert</span>
        </h3>
        <p className="text-stone-500 text-xs mb-5">
          Be first to know when new 1-of-1 pieces drop. No spam, just art.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm placeholder:text-stone-600 focus:border-rust focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm placeholder:text-stone-600 focus:border-rust focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-rust/85 transition-colors disabled:opacity-50"
          >
            {submitting ? "Joining..." : "Get Drop Alerts"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailPopup;
