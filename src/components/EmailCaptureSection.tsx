import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribe } from "@/hooks/useSupabaseData";
import { toast } from "@/hooks/use-toast";
import ShieldWatermark from "@/components/ShieldWatermark";

const EmailCaptureSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await subscribe.mutateAsync({ name: name.trim(), email: email.trim() });
      toast({ title: "You're in!", description: "You'll be the first to know about new drops." });
      setName("");
      setEmail("");
    } catch (err: any) {
      if (err?.message?.includes("duplicate")) {
        toast({ title: "Already subscribed", description: "You're already on the list!" });
      } else {
        toast({ title: "Error", description: "Something went wrong. Try again.", variant: "destructive" });
      }
    }
  };

  return (
    <section id="email-capture" className="relative py-24 md:py-32 bg-bone overflow-hidden">
      {/* Shield watermark */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 text-foreground hidden md:block">
        <ShieldWatermark size={280} opacity={0.035} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">STAY IN THE LOOP</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5">
            Get First Shot at New Drops
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed font-body text-sm">
            New episodes, art drops, giveaways, and raffles — delivered to your inbox before anyone else.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border font-body h-13 text-base"
                required
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border font-body h-13 text-base"
                required
              />
            </div>
            <Button type="submit" variant="rust" size="lg" className="w-full sm:w-auto px-12 h-13 text-base" disabled={subscribe.isPending}>
              {subscribe.isPending ? "Joining..." : "Join the Drop List"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-5">No spam. Just drops, giveaways, and new episodes.</p>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
