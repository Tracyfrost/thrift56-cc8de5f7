import { useState, useEffect } from "react";
import { useArtPieces } from "@/hooks/useSupabaseData";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const DropsHero = () => {
  const { data: pieces } = useArtPieces();
  const activePieces = pieces?.filter((p) => p.status !== "archived") || [];
  const availableCount = activePieces.filter((p) => p.status === "available").length;

  // Mock next drop date: 3 days from now
  const nextDropDate = new Date(Date.now() + 3 * 86400000).toISOString();
  const { days, hours, minutes, seconds, expired } = useCountdown(nextDropDate);

  return (
    <section className="relative py-20 md:py-32 bg-[#F9F6F0] text-center overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10 max-w-4xl">
        <p className="font-sans font-bold text-xs tracking-[0.2em] text-orange-800 uppercase mb-6">
          ★ THRIFT 56
        </p>

        <h1 className="font-sans font-black text-5xl md:text-8xl tracking-tighter text-stone-950 leading-[0.85] mb-6">
          DROP #001 —<br />LIVE NOW
        </h1>
        <p className="font-sans text-base md:text-lg text-stone-600 max-w-2xl mx-auto mb-2 leading-relaxed">
          From Forgotten to Featured
        </p>
        <p className="font-serif italic text-stone-500 text-sm">
          No restocks. No duplicates. One of one.
        </p>

        {/* Countdown */}
        {!expired && (
          <div className="mt-10 mb-8">
            <p className="font-sans font-bold text-[10px] tracking-[0.2em] text-stone-500 uppercase mb-4">
              Next drop in
            </p>
            <div className="flex items-center justify-center gap-4">
              {[
                { val: days, label: "Days" },
                { val: hours, label: "Hrs" },
                { val: minutes, label: "Min" },
                { val: seconds, label: "Sec" },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="font-sans font-black text-3xl md:text-4xl text-orange-800 tracking-wider">
                      {String(unit.val).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-[9px] tracking-wider uppercase text-stone-500 mt-1">
                      {unit.label}
                    </p>
                  </div>
                  {i < 3 && <span className="text-stone-400 font-sans font-black text-2xl md:text-3xl -mt-4">:</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status strip */}
        <div className="flex items-center justify-center divide-x divide-stone-300 border border-stone-300 rounded-none max-w-xl mx-auto">
          <div className="flex-1 py-3 px-4">
            <span className="font-sans font-bold text-xs md:text-sm tracking-wider text-stone-950 uppercase">
              DROP #001 LIVE
            </span>
          </div>
          <div className="flex-1 py-3 px-4">
            <span className="font-sans font-bold text-xs md:text-sm tracking-wider text-stone-950 uppercase">
              {availableCount} {availableCount === 1 ? "piece" : "pieces"} available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropsHero;
