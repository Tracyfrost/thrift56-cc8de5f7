import { useState } from "react";
import { useSubscribe } from "@/hooks/useSupabaseData";
import { toast } from "@/hooks/use-toast";

const EmailCaptureBrutalist = () => {
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
    <section className="relative z-0 scroll-mt-24 bg-[#F9F6F0] pt-28 md:pt-40 pb-24 md:pb-36">
      <div className="container max-w-2xl text-center">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-stone-950 leading-[0.9] mb-5">
          DON'T MISS THE<br />NEXT RESURRECTION
        </h2>
        <p className="text-stone-500 font-serif text-sm mb-12">
          We drop one-of-one pieces. When they're gone, they're gone.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-4 mb-6">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent text-stone-950 font-serif text-base px-1 py-3 border-b-2 border-stone-400 placeholder:text-stone-400 outline-none focus:ring-0 focus:border-orange-800 transition-colors rounded-none"
          />
          <button
            type="submit"
            disabled={subscribe.isPending}
            className="bg-stone-950 text-[#F9F6F0] font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors disabled:opacity-50 shrink-0"
          >
            {subscribe.isPending ? "Joining..." : "Get Drop Alerts"}
          </button>
        </form>

        <p className="text-orange-800 font-serif italic text-sm">
          Next drop in 3 days
        </p>
      </div>
    </section>
  );
};

export default EmailCaptureBrutalist;
