import beforePiece from "@/assets/before-piece.jpg";
import afterPiece from "@/assets/after-piece.jpg";
import featuredDrop from "@/assets/featured-drop.jpg";
import thumbReveal from "@/assets/thumb-reveal.jpg";
import thumbTransform from "@/assets/thumb-transform.jpg";
import thumbGiveaway from "@/assets/thumb-giveaway.jpg";

export type ArtStatus = "available" | "raffle" | "giveaway" | "auction" | "archived";
export type ArtCategory = "resurrected" | "curated" | "vault";

export interface ArtPiece {
  id: string;
  slug: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  episodeYoutubeId?: string;
  episodeSlug?: string;
  createdAt: string;
  status: ArtStatus;
  category: ArtCategory;
  price?: number;
  dropDate?: string;
  giveawayEndDate?: string;
  auctionEndDate?: string;
  materials?: string[];
  studioPhotos?: string[];
  isFeatured?: boolean;
}

export const statusConfig: Record<ArtStatus, { label: string; cta: string; badgeClass: string }> = {
  available: { label: "Available", cta: "Buy Now", badgeClass: "bg-secondary text-secondary-foreground" },
  raffle: { label: "Raffle Open", cta: "Join Raffle", badgeClass: "bg-rust text-primary-foreground" },
  giveaway: { label: "Giveaway", cta: "Enter Giveaway", badgeClass: "bg-primary text-primary-foreground" },
  auction: { label: "Auction Live", cta: "Bid Now", badgeClass: "bg-secondary text-secondary-foreground" },
  archived: { label: "Sold", cta: "View Story", badgeClass: "bg-muted text-muted-foreground" },
};

export const artPieces: ArtPiece[] = [
  {
    id: "ap1",
    slug: "botanical-vase",
    title: "The Botanical Vase",
    description: "A dusty $3 ceramic vase from Goodwill became a hand-painted botanical masterpiece. Each petal was painted live on camera during Episode 47. One of a kind—once it's gone, it's gone.",
    beforeImage: beforePiece,
    afterImage: featuredDrop,
    episodeYoutubeId: "dQw4w9WgXcQ",
    episodeSlug: "3-dollar-vase",
    createdAt: "2026-03-01",
    status: "available",
    category: "resurrected",
    price: 200,
    dropDate: "2026-03-10T19:00:00Z",
    materials: ["Ceramic", "Acrylic paint", "Sealant glaze", "Gold leaf accent"],
    isFeatured: true,
  },
  {
    id: "ap2",
    slug: "gallery-frame",
    title: "The Gallery Frame",
    description: "A cracked picture frame found outside a thrift store got new life as stunning gallery wall art. 8 hours of sanding, filling, and detailed painting transformed it completely.",
    beforeImage: beforePiece,
    afterImage: afterPiece,
    episodeYoutubeId: "dQw4w9WgXcQ",
    episodeSlug: "frame-transformation",
    createdAt: "2026-02-08",
    status: "raffle",
    category: "resurrected",
    dropDate: "2026-03-14T19:00:00Z",
    giveawayEndDate: "2026-03-20T23:59:00Z",
    materials: ["Wood frame", "Wood filler", "Oil paint", "Antiquing wax"],
  },
  {
    id: "ap3",
    slug: "treasure-chest-box",
    title: "The Treasure Chest",
    description: "An ordinary $2 wooden box with a secret compartment became an adventure-themed treasure chest with hand-painted maps and hidden symbols corresponding to each secret drawer.",
    beforeImage: beforePiece,
    afterImage: thumbReveal,
    episodeYoutubeId: "dQw4w9WgXcQ",
    episodeSlug: "wooden-box-magic",
    createdAt: "2026-01-25",
    status: "giveaway",
    category: "resurrected",
    giveawayEndDate: "2026-03-18T23:59:00Z",
    materials: ["Pine wood", "Acrylic paint", "Brass hardware", "Leather accents"],
  },
  {
    id: "ap4",
    slug: "sunset-tray",
    title: "The Sunset Serving Tray",
    description: "A beat-up metal tray from a garage sale was sanded down and hand-painted with a vibrant desert sunset scene. Sealed for daily use.",
    beforeImage: beforePiece,
    afterImage: thumbTransform,
    episodeYoutubeId: "dQw4w9WgXcQ",
    episodeSlug: "live-studio-session",
    createdAt: "2026-02-01",
    status: "auction",
    category: "curated",
    price: 75,
    auctionEndDate: "2026-03-16T20:00:00Z",
    materials: ["Metal tray", "Primer", "Acrylic paint", "Polyurethane seal"],
  },
  {
    id: "ap5",
    slug: "vintage-mirror",
    title: "The Victorian Mirror",
    description: "A tarnished vanity mirror from a church rummage sale. The frame was restored and embellished with hand-painted floral details inspired by Victorian wallpaper.",
    beforeImage: beforePiece,
    afterImage: thumbGiveaway,
    episodeYoutubeId: "dQw4w9WgXcQ",
    createdAt: "2025-12-15",
    status: "archived",
    category: "vault",
    materials: ["Wood frame", "Mirror glass", "Gesso", "Oil paint"],
  },
  {
    id: "ap6",
    slug: "mosaic-bowl",
    title: "The Mosaic Bowl",
    description: "A chipped ceramic bowl became a stunning mosaic art piece using broken tile fragments found at the same thrift store. Beauty from brokenness.",
    beforeImage: beforePiece,
    afterImage: afterPiece,
    episodeYoutubeId: "dQw4w9WgXcQ",
    createdAt: "2025-11-20",
    status: "archived",
    category: "resurrected",
    materials: ["Ceramic bowl", "Broken tiles", "Grout", "Epoxy resin"],
  },
];

export function getArtPieceBySlug(slug: string): ArtPiece | undefined {
  return artPieces.find((p) => p.slug === slug);
}

export function getFeaturedPiece(): ArtPiece | undefined {
  return artPieces.find((p) => p.isFeatured) || artPieces.find((p) => p.status !== "archived");
}

export function getActivePieces(): ArtPiece[] {
  return artPieces.filter((p) => p.status !== "archived");
}

export function getArchivedPieces(): ArtPiece[] {
  return artPieces.filter((p) => p.status === "archived");
}
