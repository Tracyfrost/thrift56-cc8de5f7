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
    <section className="bg-stone-950 py-24 md:py-32">
      <div className="container max-w-2xl text-center">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter text-[#F9F6F0] leading-[0.9] mb-4">
          GET DROP ACCESS
        </h2>
        <p className="text-stone-500 font-serif italic text-sm mb-10">
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
            className="bg-[#F9F6F0] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-200 transition-colors disabled:opacity-50 shrink-0"
          >
            {subscribe.isPending ? "Joining..." : "GET DROP ALERTS"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DropsEmailCapture;
