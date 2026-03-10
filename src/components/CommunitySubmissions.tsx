import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { communitySubmissions } from "@/data/communityData";

const CommunitySubmissions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const approved = communitySubmissions.filter((s) => s.approved);

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">SUBMIT A FIND</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Spot Something Worth Transforming?</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Send us your thrift store finds. If we pick yours, it could become the next episode.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="border border-border rounded-sm bg-card p-6">
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-distressed text-rust text-sm tracking-widest mb-2">SUBMITTED</p>
                <p className="font-heading text-2xl font-bold mb-2">Thanks for the Find!</p>
                <p className="text-muted-foreground font-body text-sm">
                  If we choose your item, you'll be the first to know.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="font-body h-11 bg-background/80" required />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="font-body h-11 bg-background/80" required />
                <Input placeholder="Where did you find it?" value={location} onChange={(e) => setLocation(e.target.value)} className="font-body h-11 bg-background/80" required />
                <div>
                  <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Photo</label>
                  <input type="file" accept="image/*" className="w-full text-sm font-body file:mr-3 file:py-1.5 file:px-3 file:border file:border-border file:rounded-sm file:bg-card file:text-foreground file:font-heading file:text-xs file:uppercase file:tracking-wider" />
                </div>
                <textarea
                  placeholder="Anything else we should know? (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm font-body resize-none"
                />
                <Button type="submit" variant="rust" className="w-full h-11">Submit Your Find</Button>
              </form>
            )}
          </div>

          {/* Gallery */}
          <div>
            <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-3">Community Finds</p>
            <div className="grid grid-cols-2 gap-3">
              {approved.map((s) => (
                <div key={s.id} className="border border-border rounded-sm overflow-hidden bg-card">
                  <div className="aspect-square overflow-hidden">
                    <img src={s.image} alt={`Find by ${s.name}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2">
                    <p className="font-heading text-xs font-bold">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground font-body">{s.location}</p>
                    {s.note && <p className="text-[10px] text-muted-foreground font-body italic mt-0.5">"{s.note}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySubmissions;
