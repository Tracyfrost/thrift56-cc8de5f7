import { useState } from "react";
import { useThriftFinds, useVoteThriftFind } from "@/hooks/useSupabaseData";
import { thriftFinds as mockFinds } from "@/data/communityData";

const DiscoverHunt = () => {
  const { data: dbFinds } = useThriftFinds();
  const voteMutation = useVoteThriftFind();
  const [voted, setVoted] = useState<Record<string, string>>({});

  // Use DB data if available, otherwise fall back to mock
  const finds = dbFinds && dbFinds.length > 0 ? dbFinds : mockFinds.map((f) => ({
    id: f.id,
    image_url: f.image,
    caption: f.caption,
    price: f.price,
    location: f.location,
    votes_transform: f.votesTransform,
    votes_leave: f.votesLeave,
    is_active: true,
    created_at: "",
  }));

  const vote = (id: string, choice: "transform" | "leave") => {
    if (voted[id]) return;
    setVoted({ ...voted, [id]: choice });
    if (dbFinds && dbFinds.length > 0) {
      voteMutation.mutate({ id, choice });
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">DISCOVER THE HUNT</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Fresh Thrift Finds</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            These items were just pulled from the shelves. Should they become art?
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {finds.map((find) => {
            const total = (find.votes_transform || 0) + (find.votes_leave || 0);
            const pct = total > 0 ? Math.round(((find.votes_transform || 0) / total) * 100) : 50;
            const hasVoted = !!voted[find.id];

            return (
              <div key={find.id} className="border border-border rounded-sm bg-card overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img src={find.image_url} alt={find.caption} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-bold leading-tight mb-1">{find.caption}</p>
                  <p className="text-rust font-distressed text-xs mb-1">Found for {find.price}</p>
                  <p className="text-muted-foreground text-[10px] font-body mb-3">{find.location}</p>

                  {hasVoted ? (
                    <div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-rust rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">
                        {pct}% say transform · {total + 1} votes
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => vote(find.id, "transform")}
                        className="flex-1 text-[10px] font-heading uppercase tracking-wider py-1.5 border border-rust text-rust rounded-sm hover:bg-rust hover:text-primary-foreground transition-colors"
                      >
                        Transform It
                      </button>
                      <button
                        onClick={() => vote(find.id, "leave")}
                        className="flex-1 text-[10px] font-heading uppercase tracking-wider py-1.5 border border-border text-muted-foreground rounded-sm hover:bg-muted transition-colors"
                      >
                        Leave It
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiscoverHunt;
