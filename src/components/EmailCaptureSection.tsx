import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailCaptureSection = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email service
    console.log("Signup:", { firstName, email });
    setFirstName("");
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28 texture-paper">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">STAY IN THE LOOP</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Get First Shot at New Drops
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Be first to know when a new piece goes live, a giveaway opens, or a new episode drops.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-background/80 border-border font-body h-12"
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/80 border-border font-body h-12"
              required
            />
            <Button type="submit" variant="hero" size="lg" className="px-8 h-12 whitespace-nowrap">
              Join the Drop List
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            No spam. Just drops, giveaways, and new episodes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
