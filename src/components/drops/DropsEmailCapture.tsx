import { useState, useEffect } from "react";
import { useSubscribe } from "@/hooks/useSupabaseData";
import { toast } from "@/hooks/use-toast";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, expired: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        expired: false,
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const DropsEmailCapture = () => {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  // Mock next drop date: 3 days from now
  const nextDropDate = new Date(Date.now() + 3 * 86400000).toISOString();
  const { days, hours, minutes, expired } = useCountdown(nextDropDate);

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
    <section className="bg-stone-950 py-24 md:py-32">
      <div className="container max-w-2xl text-center">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter text-[#F9F6F0] leading-[0.9] mb-4">
          GET FIRST ACCESS TO<br />THE NEXT DROP
        </h2>
        <p className="text-stone-500 font-serif italic text-sm mb-10">
          One-of-one pieces. No restocks. No second chances.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
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
            className="bg-[#F9F6F0] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-200 transition-colors disabled:opacity-50 shrink-0"
          >
            {subscribe.isPending ? "Joining..." : "GET DROP ALERTS"}
          </button>
        </form>

        {/* Countdown */}
        {!expired && (
          <div className="flex items-center justify-center gap-6">
            <p className="font-sans font-bold text-[10px] tracking-[0.2em] text-stone-500 uppercase">
              Next drop in
            </p>
            <div className="flex items-center gap-3 text-orange-800 font-sans font-black text-2xl tracking-wider">
              <span>{String(days).padStart(2, "0")}</span>
              <span className="text-stone-600">:</span>
              <span>{String(hours).padStart(2, "0")}</span>
              <span className="text-stone-600">:</span>
              <span>{String(minutes).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-6 text-stone-600 font-sans text-[9px] tracking-wider uppercase">
              <span>Days</span>
              <span>Hrs</span>
              <span>Min</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DropsEmailCapture;
