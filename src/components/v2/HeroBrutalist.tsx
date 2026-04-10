import { useState } from "react";
import { Link } from "react-router-dom";
import heroTracie from "@/assets/hero-tracie-disco.jpg";
import { useSubscribe } from "@/hooks/useSupabaseData";
import { toast } from "@/hooks/use-toast";

const HeroBrutalist = () => {
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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-bleed background image with ken-burns */}
      <div className="absolute inset-0">
        <img
          src={heroTracie}
          alt="Tracie working on a thrift store transformation"
          className="w-full h-full object-cover contrast-125 saturate-50 sepia-[.25] animate-ken-burns"
        />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F6F0]/98 via-[#F9F6F0]/85 to-[#F9F6F0]/30 md:from-[#F9F6F0]/95 md:via-[#F9F6F0]/75 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-orange-800 font-sans text-xs font-bold uppercase tracking-[0.35em] mb-6 animate-stamp">
            THRIFT 56
          </p>
          <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.85] text-stone-950 mb-6">
            FROM<br />
            FORGOTTEN<br />
            TO FEATURED.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-stone-800 mb-5">
            This was $3. It deserved better.
          </p>
          <p className="text-stone-600 font-serif text-sm leading-relaxed max-w-md mb-8">
            We find overlooked objects and turn them into one-of-one art pieces.
            Nothing is staged. Nothing is precious. Everything is transformed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-orange-800 transition-colors"
            >
              Shop the Resurrection
            </Link>
            <Link
              to="/episodes"
              className="inline-flex items-center justify-center bg-transparent border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors"
            >
              Watch Latest Episode
            </Link>
          </div>

          {/* Inline email signup */}
          <div className="border-t border-stone-300 pt-6">
            <p className="text-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
              Next Drop & Raffle Alerts
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent text-stone-950 font-serif text-sm px-1 py-2.5 border-b-2 border-stone-400 placeholder:text-stone-400 outline-none focus:ring-0 focus:border-stone-950 transition-colors rounded-none"
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="bg-orange-800 text-stone-50 font-sans font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-3 rounded-none hover:bg-orange-900 transition-colors disabled:opacity-50 shrink-0"
              >
                {subscribe.isPending ? "Joining..." : "Get Alerts"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F9F6F0] to-transparent" />
    </section>
  );
};

export default HeroBrutalist;
