import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CommunityFeedback = () => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">WHAT SHOULD HAPPEN NEXT?</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Your Ideas, Our Studio</h2>
          <p className="text-muted-foreground font-body mb-8">
            Suggest art styles, thrift challenges, or items to search for. The best ideas make it into future episodes.
          </p>

          {submitted ? (
            <div className="border border-border rounded-sm bg-card p-8">
              <p className="font-distressed text-rust text-sm tracking-widest mb-2">RECEIVED</p>
              <p className="font-heading text-xl font-bold">Thanks for the idea!</p>
              <p className="text-muted-foreground text-sm font-body mt-1">We read every suggestion.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="font-body h-11 bg-background/80" required />
              <textarea
                placeholder="What should we try next? Art style, challenge, item to hunt..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm font-body resize-none"
                required
              />
              <Button type="submit" variant="rust" className="w-full h-11">Submit Suggestion</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityFeedback;
