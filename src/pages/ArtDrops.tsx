import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArtPieceCard from "@/components/ArtPieceCard";
import DropCountdown from "@/components/DropCountdown";
import ShieldWatermark from "@/components/ShieldWatermark";
import ShieldDivider from "@/components/ShieldDivider";
import logo from "@/assets/thrift56-logo-clean.png";
import { useArtPieces } from "@/hooks/useSupabaseData";

const filters = [
  { label: "All Drops", value: "all" },
  { label: "Available", value: "available" },
  { label: "Raffle", value: "raffle" },
  { label: "Giveaway", value: "giveaway" },
  { label: "Auction", value: "auction" },
];

const ArtDrops = () => {
  const [filter, setFilter] = useState("all");
  const { data: pieces, isLoading } = useArtPieces(filter === "all" ? undefined : filter);

  const activePieces = pieces?.filter((p) => p.status !== "archived") || [];
  const nextDrop = activePieces
    .filter((p) => p.drop_date && new Date(p.drop_date).getTime() > Date.now())
    .sort((a, b) => new Date(a.drop_date!).getTime() - new Date(b.drop_date!).getTime())[0];

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="relative py-16 md:py-20 texture-paper text-center overflow-hidden">
        {/* Shield watermark */}
        <div className="absolute right-[-2%] top-[15%] text-foreground hidden md:block">
          <ShieldWatermark size={350} opacity={0.03} />
        </div>
        <div className="container relative z-10">
          <img src={logo} alt="" className="h-14 w-auto mx-auto mb-5 opacity-20" aria-hidden="true" />
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE COLLECTION</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Art Drops</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-body leading-relaxed">
            Each piece started as a forgotten thrift store find. Each one was transformed on camera. Once they drop, they're gone forever.
          </p>
          {nextDrop?.drop_date && (
            <div className="mt-10">
              <DropCountdown targetDate={nextDrop.drop_date} label="Next Drop" />
            </div>
          )}
        </div>
      </section>

      <div className="container py-6">
        <ShieldDivider className="mb-6" />
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

      <section className="container pb-16">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-12 font-body">Loading art drops...</p>
        ) : activePieces.length === 0 ? (
          <p className="text-center text-muted-foreground py-12 font-body">No drops in this category right now. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {activePieces.map((piece) => (
              <ArtPieceCard key={piece.id} piece={piece} />
            ))}
          </div>
        )}
      </section>

      <section className="relative py-16 bg-primary text-primary-foreground text-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground">
          <ShieldWatermark size={300} opacity={0.04} />
        </div>
        <div className="container relative z-10">
          <p className="font-distressed text-sm tracking-widest mb-2 opacity-70">NEVER MISS A DROP</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Get First Access</h2>
          <p className="opacity-70 mb-6 font-body text-sm">New drops, giveaways, and raffles — straight to your inbox.</p>
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
