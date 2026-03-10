import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArtPieceCard from "@/components/ArtPieceCard";
import DropHistory from "@/components/DropHistory";
import DropCountdown from "@/components/DropCountdown";
import { artPieces, type ArtStatus, getFeaturedPiece } from "@/data/artPieces";

const filters: { label: string; value: ArtStatus | "all" }[] = [
  { label: "All Drops", value: "all" },
  { label: "Available", value: "available" },
  { label: "Raffle", value: "raffle" },
  { label: "Giveaway", value: "giveaway" },
  { label: "Auction", value: "auction" },
];

const ArtDrops = () => {
  const [filter, setFilter] = useState<ArtStatus | "all">("all");
  const featured = getFeaturedPiece();

  const activePieces = artPieces.filter((p) => p.status !== "archived");
  const filtered = filter === "all" ? activePieces : activePieces.filter((p) => p.status === filter);

  // Find the next upcoming drop date
  const nextDrop = activePieces
    .filter((p) => p.dropDate && new Date(p.dropDate).getTime() > Date.now())
    .sort((a, b) => new Date(a.dropDate!).getTime() - new Date(b.dropDate!).getTime())[0];

  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Header */}
      <section className="py-16 md:py-20 texture-paper text-center">
        <div className="container">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE COLLECTION</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Art Drops</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-body leading-relaxed">
            Each piece started as a forgotten thrift store find. Each one was transformed on camera. Once they drop, they're gone forever.
          </p>

          {nextDrop?.dropDate && (
            <div className="mt-10">
              <DropCountdown targetDate={nextDrop.dropDate} label="Next Drop" />
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <div className="container py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 text-xs font-heading uppercase tracking-widest rounded-sm border transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground border-border hover:border-rust hover:text-rust"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="container pb-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12 font-body">
            No drops in this category right now. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((piece) => (
              <ArtPieceCard key={piece.id} piece={piece} />
            ))}
          </div>
        )}
      </section>

      {/* Drop History */}
      <div className="texture-paper">
        <DropHistory />
      </div>

      {/* Email CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <p className="font-distressed text-sm tracking-widest mb-2 opacity-70">NEVER MISS A DROP</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Get First Access</h2>
          <p className="opacity-70 mb-6 font-body text-sm">
            New drops, giveaways, and raffles — straight to your inbox.
          </p>
          <a href="/#email-capture">
            <button className="bg-rust text-primary-foreground font-heading uppercase tracking-widest text-sm px-8 py-3 rounded-sm hover:bg-rust/85 transition-colors">
              Join the Drop List
            </button>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ArtDrops;
