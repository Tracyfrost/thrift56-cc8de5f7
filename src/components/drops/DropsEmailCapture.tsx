import { useState } from "react";
import { useSubscribe } from "@/hooks/useSupabaseData";
import { toast } from "@/hooks/use-toast";

const DropsEmailCapture = () => {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribe.mutateAsync({ name: "Drop List", email: email.trim() });
      toast({ title: "You're on the list.", description: "We'll notify you before the next drop." });
      setEmail("");
    } catch (err: any) {
      if (err?.message?.includes("duplicate")) {
        toast({ title: "Already on the list", description: "You're good — we've got you." });
      } else {
        toast({ title: "Error", description: "Something went wrong. Try again.", variant: "destructive" });
      }
    }
  };

  return (
    <section className="relative bg-stone-950 py-28 md:py-36 overflow-hidden">
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Rust top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange-800/40" />

      <div className="container max-w-2xl text-center relative z-10">
        <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[#F9F6F0] leading-[0.85] mb-4">
          GET DROP ACCESS
        </h2>
        <p className="text-stone-500 font-serif italic text-sm mb-12">
          Early releases. Private drops. No noise.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent text-stone-50 font-serif text-base px-1 py-3 border-b-2 border-stone-500 placeholder:text-stone-600 outline-none focus:ring-0 focus:border-stone-300 transition-colors rounded-none"
          />
          <button
            type="submit"
            disabled={subscribe.isPending}
            className="bg-[#F9F6F0] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-200 transition-all duration-300 disabled:opacity-50 shrink-0"
          >
            {subscribe.isPending ? "Joining..." : "GET DROP ALERTS"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DropsEmailCapture;
