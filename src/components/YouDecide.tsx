import { useState } from "react";
import { useVotes, useCastVote } from "@/hooks/useSupabaseData";

const YouDecide = () => {
  const { data: items, isLoading } = useVotes();
  const castVote = useCastVote();
  const [votedFor, setVotedFor] = useState<string | null>(null);

  if (isLoading || !items || items.length === 0) return null;

  const totalVotes = items.reduce((sum, i) => sum + i.votes, 0);

  const handleVote = (id: string, currentVotes: number) => {
    if (votedFor) return;
    setVotedFor(id);
    castVote.mutate({ id, currentVotes });
  };

  return (
    <section className="py-20 md:py-28 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">YOU DECIDE</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">What Gets Transformed Next?</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Cast your vote. The winning item becomes the next transformation episode.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {items.map((item) => {
            const adjustedTotal = totalVotes + (votedFor ? 1 : 0);
            const adjustedVotes = item.votes + (votedFor === item.id ? 1 : 0);
            const pct = adjustedTotal > 0 ? Math.round((adjustedVotes / adjustedTotal) * 100) : 25;
            const isSelected = votedFor === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleVote(item.id, item.votes)}
                disabled={!!votedFor}
                className={`text-left border-2 rounded-sm bg-card overflow-hidden transition-all duration-300 ${
                  isSelected ? "border-rust shadow-lg scale-[1.02]" : "border-border hover:border-rust/40 hover:shadow-md"
                } ${votedFor && !isSelected ? "opacity-50" : ""}`}
              >
                {item.image_url && (
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image_url} alt={item.item_name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-heading text-sm font-bold leading-tight mb-3">{item.item_name}</p>
                  {votedFor ? (
                    <div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-rust rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">
                        {pct}% · {adjustedVotes} votes
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-rust font-semibold">
                      ↑ Vote
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouDecide;
