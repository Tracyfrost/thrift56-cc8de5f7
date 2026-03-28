import { useParams, Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getArtPieceBySlug } from "@/data/artPieces";
import { ArrowLeft } from "lucide-react";

const viewerReactions = [
  { name: "DIY_Sarah_2025", text: "I can't believe that was a $3 plant stand! This is gallery-level work." },
  { name: "thriftking_mike", text: "Dude I literally drove past that Goodwill. I could have had this 😭" },
  { name: "ArtCollector.J", text: "Just acquired one of Tracie's earlier pieces. The craftsmanship in person is unreal." },
  { name: "upcycle_nation", text: "This is what happens when someone actually has vision. Incredible transformation." },
  { name: "vintage.rachel", text: "The before/after on this one is absolutely insane. Following for the next drop." },
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const piece = getArtPieceBySlug(slug || "");

  if (!piece) {
    return (
      <div className="min-h-screen bg-stone-50">
        <SiteNav />
        <div className="container py-24 text-center">
          <h1 className="font-sans font-black text-3xl tracking-tighter mb-4">PIECE NOT FOUND</h1>
          <Link to="/drops">
            <Button variant="rust" className="rounded-none">BACK TO DROPS</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const isSold = piece.status === "archived";
  const originalPrice = 3;
  const finalPrice = piece.price || 185;

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <SiteNav />

      <div className="container py-8 md:py-16">
        {/* Back link */}
        <Link
          to="/drops"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-800 transition-colors font-sans text-xs font-bold uppercase tracking-[0.2em] mb-10 block"
        >
          <ArrowLeft size={14} /> Back to Drops
        </Link>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16">

          {/* COLUMN 1 — Visual Story */}
          <div className="space-y-0">
            {/* Hero shot */}
            <div className="border-b-4 border-stone-950">
              <img
                src={piece.afterImage}
                alt={piece.title}
                className="w-full object-cover"
              />
            </div>

            {/* Before shot */}
            <div className="border-b-4 border-stone-950 relative">
              <img
                src={piece.beforeImage}
                alt={`${piece.title} — Before`}
                className="w-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-stone-950 text-stone-50 px-4 py-1.5 text-[10px] font-sans font-black uppercase tracking-[0.3em]">
                BEFORE
              </span>
            </div>

            {/* Transformation video */}
            {piece.episodeYoutubeId && (
              <div className="border-b-4 border-stone-950">
                <div className="aspect-video border-4 border-stone-950 m-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${piece.episodeYoutubeId}`}
                    title="Transformation process"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Macro detail shot */}
            <div className="border-b-4 border-stone-950 relative">
              <img
                src={piece.afterImage}
                alt={`${piece.title} — Detail`}
                className="w-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-stone-950/80 text-stone-50 px-4 py-1.5 text-[10px] font-sans font-black uppercase tracking-[0.3em]">
                DETAIL
              </span>
            </div>

            {/* Viewer Reactions */}
            <div className="py-10 px-2">
              <h3 className="font-sans font-black text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
                VIEWER REACTIONS
              </h3>
              <div className="space-y-4">
                {viewerReactions.map((r, i) => (
                  <div key={i} className="border-l-4 border-stone-300 pl-4 py-1">
                    <p className="font-mono text-[11px] text-stone-400 mb-1">@{r.name}</p>
                    <p className="font-serif italic text-stone-700 text-sm leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2 — Brutalist Buy Box */}
          <div className="lg:sticky lg:top-8 self-start space-y-8 pt-8 lg:pt-0">
            {/* Exclusivity badge */}
            <div className="bg-stone-950 text-stone-50 py-3 px-6 text-center">
              <span className="font-sans font-black text-[11px] uppercase tracking-[0.4em]">
                1 OF 1 WORLDWIDE
              </span>
            </div>

            {/* Title */}
            <h1 className="font-sans font-black text-3xl md:text-4xl tracking-tighter leading-[0.95]">
              {piece.title}
            </h1>

            {/* Description */}
            <p className="font-serif italic text-stone-600 text-sm leading-relaxed">
              {piece.description}
            </p>

            {/* Value Stack */}
            <div className="space-y-2 border-t-2 border-b-2 border-stone-200 py-6">
              <p className="text-stone-400 line-through font-sans text-sm tracking-wide">
                Thrifted Origin: ${originalPrice}
              </p>
              <p className="font-serif italic text-stone-600 text-sm">
                Labor &amp; Vision: 4 Hours
              </p>
              <p className="font-sans font-black text-3xl text-orange-800 tracking-tight">
                Acquisition Price: ${finalPrice}
              </p>
            </div>

            {/* CTA */}
            <Button
              className={`w-full h-14 rounded-none text-base font-sans font-black uppercase tracking-[0.2em] ${
                isSold
                  ? "bg-stone-400 text-stone-200 cursor-not-allowed hover:bg-stone-400"
                  : "bg-orange-800 text-stone-50 hover:bg-orange-900"
              }`}
              disabled={isSold}
            >
              {isSold ? "SOLD" : "ACQUIRE THIS PIECE"}
            </Button>

            {/* Micro-tension */}
            <p className="font-serif italic text-stone-500 text-sm text-center">
              If you leave this page, it may be gone. No restocks. No duplicates.
            </p>

            {/* Artist's Manifest */}
            {piece.materials && piece.materials.length > 0 && (
              <Accordion type="single" collapsible className="border-t border-stone-200">
                <AccordionItem value="materials" className="border-b border-stone-200">
                  <AccordionTrigger className="font-sans font-black text-xs uppercase tracking-[0.3em] text-stone-700 hover:no-underline py-5">
                    ARTIST'S MANIFEST
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {piece.materials.map((m, i) => (
                        <li
                          key={i}
                          className="font-mono text-xs text-stone-600 tracking-wide border-l-2 border-stone-300 pl-3 py-1"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Back link */}
            <Link
              to="/drops"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-orange-800 transition-colors font-sans text-[10px] font-bold uppercase tracking-[0.2em] pt-4"
            >
              <ArrowLeft size={12} /> All Drops
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default ProductDetail;
