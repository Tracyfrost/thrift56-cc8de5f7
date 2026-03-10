import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApprovedSubmissions, useSubmitFind } from "@/hooks/useSupabaseData";
import ImageUpload from "@/components/ImageUpload";

const CommunitySubmissions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const submitFind = useSubmitFind();
  const { data: approved } = useApprovedSubmissions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitFind.mutate({ name, email, location, notes: notes || null, image_url: imageUrl || undefined });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">SUBMIT A FIND</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Spot Something Worth Transforming?</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Send us your thrift store discoveries. If we pick yours, it could become the next episode.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="border border-border rounded-sm bg-card p-8">
            {submitFind.isSuccess ? (
              <div className="text-center py-12">
                <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">SUBMITTED</p>
                <p className="font-heading text-2xl font-bold mb-2">Thanks for the Find!</p>
                <p className="text-muted-foreground font-body text-sm">If we choose your item, you'll be the first to know.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5 block">Your Name</label>
                  <Input placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} className="font-body h-12 bg-background" required />
                </div>
                <div>
                  <label className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5 block">Email</label>
                  <Input type="email" placeholder="jane@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="font-body h-12 bg-background" required />
                </div>
                <div>
                  <label className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5 block">Where Did You Find It?</label>
                  <Input placeholder="Goodwill — Austin, TX" value={location} onChange={(e) => setLocation(e.target.value)} className="font-body h-12 bg-background" required />
                </div>
                <ImageUpload
                  bucket="submissions"
                  currentUrl={imageUrl || null}
                  onUploaded={setImageUrl}
                  label="Photo of the Item"
                  hint="Upload a photo of the thrift find you spotted."
                />
                <div>
                  <label className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5 block">Notes (Optional)</label>
                  <textarea
                    placeholder="Why do you think this piece has potential?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm font-body resize-none"
                  />
                </div>
                <Button type="submit" variant="rust" className="w-full h-12 text-base" disabled={submitFind.isPending}>
                  {submitFind.isPending ? "Submitting..." : "Submit Your Find"}
                </Button>
              </form>
            )}
          </div>

          <div>
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Community Finds</p>
            {(!approved || approved.length === 0) ? (
              <div className="border border-border rounded-sm bg-card p-10 text-center">
                <p className="text-muted-foreground font-body text-sm">Be the first to submit a find!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {approved.map((s) => (
                  <div key={s.id} className="border border-border rounded-sm overflow-hidden bg-card">
                    {s.image_url && (
                      <div className="aspect-square overflow-hidden">
                        <img src={s.image_url} alt={`Find by ${s.name}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-heading text-xs font-bold">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground font-body">{s.location}</p>
                      {s.notes && <p className="text-[10px] text-muted-foreground font-body italic mt-1">"{s.notes}"</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySubmissions;
