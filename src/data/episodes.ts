import thumbHunt from "@/assets/thumb-hunt.jpg";
import thumbTransform from "@/assets/thumb-transform.jpg";
import thumbReveal from "@/assets/thumb-reveal.jpg";
import thumbGiveaway from "@/assets/thumb-giveaway.jpg";
import short1 from "@/assets/short-1.jpg";
import short2 from "@/assets/short-2.jpg";
import beforePiece from "@/assets/before-piece.jpg";
import afterPiece from "@/assets/after-piece.jpg";
import featuredDrop from "@/assets/featured-drop.jpg";

export type EpisodeCategory = "thrift-hunt" | "transformation" | "giveaway" | "livestream" | "studio";

export interface Episode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: EpisodeCategory;
  episodeNumber: number;
  thumbnail: string;
  youtubeId: string;
  views: number;
  publishedAt: string;
  beforeImage?: string;
  afterImage?: string;
  transformationStory?: string;
  relatedPieceTitle?: string;
  relatedPieceLink?: string;
}

export interface ShortVideo {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
}

export interface LivestreamEvent {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  youtubeId?: string;
  isLive: boolean;
  isReplay: boolean;
  thumbnail: string;
}

export const categoryLabels: Record<EpisodeCategory, string> = {
  "thrift-hunt": "Thrift Hunt",
  transformation: "Transformation",
  giveaway: "Giveaway",
  livestream: "Livestream Replay",
  studio: "Studio Work",
};

export const categoryColors: Record<EpisodeCategory, string> = {
  "thrift-hunt": "bg-secondary text-secondary-foreground",
  transformation: "bg-rust text-primary-foreground",
  giveaway: "bg-primary text-primary-foreground",
  livestream: "bg-muted text-muted-foreground",
  studio: "bg-bone text-foreground",
};

export const episodes: Episode[] = [
  {
    id: "1", slug: "3-dollar-vase", title: "The $3 Vase That Became a $200 Art Piece",
    summary: "A dusty ceramic vase from Goodwill becomes a hand-painted botanical masterpiece.",
    category: "transformation", episodeNumber: 47, thumbnail: thumbTransform,
    youtubeId: "dQw4w9WgXcQ", views: 124000, publishedAt: "2026-03-01",
    beforeImage: beforePiece, afterImage: afterPiece,
    transformationStory: "I walked past this vase three times before picking it up. It was caked in dust, tucked behind a pile of old magazines. Something about the shape spoke to me. Back in the studio, I spent 6 hours hand-painting a botanical garden scene inspired by Victorian wallpaper. The petals alone took two hours. When I revealed the finished piece to my audience, the response was electric. It sold within 48 hours.",
    relatedPieceTitle: "The Botanical Vase", relatedPieceLink: "#",
  },
  {
    id: "2", slug: "thrift-run-episode-46", title: "I Found 7 Hidden Gems at One Store",
    summary: "One of the best thrift runs ever — a treasure trove of potential art pieces.",
    category: "thrift-hunt", episodeNumber: 46, thumbnail: thumbHunt,
    youtubeId: "dQw4w9WgXcQ", views: 98000, publishedAt: "2026-02-22",
  },
  {
    id: "3", slug: "big-giveaway-45", title: "HUGE Art Giveaway — 5 Pieces, 5 Winners",
    summary: "Giving away five transformed pieces to five lucky subscribers.",
    category: "giveaway", episodeNumber: 45, thumbnail: thumbGiveaway,
    youtubeId: "dQw4w9WgXcQ", views: 210000, publishedAt: "2026-02-15",
  },
  {
    id: "4", slug: "frame-transformation", title: "From Broken Frame to Gallery Art",
    summary: "A cracked picture frame gets a second life as a stunning piece of wall art.",
    category: "transformation", episodeNumber: 44, thumbnail: thumbReveal,
    youtubeId: "dQw4w9WgXcQ", views: 87000, publishedAt: "2026-02-08",
    beforeImage: beforePiece, afterImage: featuredDrop,
    transformationStory: "This frame was literally in the trash pile outside a thrift store. The glass was shattered, and one corner was chipped. I saw potential in the ornate molding. After sanding, filling, and 8 hours of detail painting, it became one of my favorite pieces ever.",
  },
  {
    id: "5", slug: "live-studio-session", title: "Live Studio Session — Painting a Thrifted Tray",
    summary: "Watch the full 2-hour transformation live from the studio.",
    category: "livestream", episodeNumber: 43, thumbnail: thumbTransform,
    youtubeId: "dQw4w9WgXcQ", views: 45000, publishedAt: "2026-02-01",
  },
  {
    id: "6", slug: "wooden-box-magic", title: "This Wooden Box Had a Secret Compartment",
    summary: "An ordinary thrift store box reveals a hidden drawer — and becomes a painted treasure chest.",
    category: "transformation", episodeNumber: 42, thumbnail: thumbReveal,
    youtubeId: "dQw4w9WgXcQ", views: 156000, publishedAt: "2026-01-25",
    beforeImage: beforePiece, afterImage: afterPiece,
    transformationStory: "When I bought this box for $2, I thought it was just a simple jewelry box. Then I found the secret compartment. That discovery changed the entire design direction — I painted an adventure map theme with hidden symbols that correspond to each secret drawer.",
  },
  {
    id: "7", slug: "thrift-haul-january", title: "January Thrift Haul — So Many Possibilities",
    summary: "A massive haul of 12 pieces from three different stores.",
    category: "thrift-hunt", episodeNumber: 41, thumbnail: thumbHunt,
    youtubeId: "dQw4w9WgXcQ", views: 72000, publishedAt: "2026-01-18",
  },
  {
    id: "8", slug: "studio-vlog-40", title: "A Day in the Studio — Behind the Scenes",
    summary: "What a typical studio day looks like when working on three pieces at once.",
    category: "studio", episodeNumber: 40, thumbnail: thumbTransform,
    youtubeId: "dQw4w9WgXcQ", views: 61000, publishedAt: "2026-01-11",
  },
];

export const shortVideos: ShortVideo[] = [
  { id: "s1", title: "30-second thrift find", thumbnail: short1, youtubeId: "dQw4w9WgXcQ" },
  { id: "s2", title: "Quick frame transformation", thumbnail: short2, youtubeId: "dQw4w9WgXcQ" },
  { id: "s3", title: "$1 bowl becomes art", thumbnail: short1, youtubeId: "dQw4w9WgXcQ" },
  { id: "s4", title: "The reveal moment", thumbnail: short2, youtubeId: "dQw4w9WgXcQ" },
  { id: "s5", title: "Studio time-lapse", thumbnail: short1, youtubeId: "dQw4w9WgXcQ" },
  { id: "s6", title: "Painting in real time", thumbnail: short2, youtubeId: "dQw4w9WgXcQ" },
];

export const livestreamEvents: LivestreamEvent[] = [
  {
    id: "l1", title: "Live Thrift Hunt — Saturday Edition",
    description: "Join Tracie as she hunts for hidden gems at a new store, live on camera. Vote on what she picks up!",
    scheduledAt: "2026-03-15T14:00:00Z", isLive: false, isReplay: false, thumbnail: thumbHunt,
  },
  {
    id: "l2", title: "Studio Session — Painting the Antique Mirror",
    description: "Watch the full transformation of an antique mirror found last week. Chat live and suggest colors!",
    scheduledAt: "2026-03-22T18:00:00Z", isLive: false, isReplay: false, thumbnail: thumbTransform,
  },
  {
    id: "l3", title: "Live Giveaway Drawing — March Edition",
    description: "Three transformed pieces, three winners. Must be subscribed and present to win!",
    scheduledAt: "2026-03-29T19:00:00Z", isLive: false, isReplay: false, thumbnail: thumbGiveaway,
  },
  {
    id: "l4", title: "Replay: Live Studio Session — The Tray",
    description: "Missed the live session? Watch the full 2-hour tray transformation replay.",
    scheduledAt: "2026-02-01T18:00:00Z", youtubeId: "dQw4w9WgXcQ", isLive: false, isReplay: true, thumbnail: thumbTransform,
  },
];

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getRelatedEpisodes(currentId: string, count = 3): Episode[] {
  return episodes.filter((e) => e.id !== currentId).slice(0, count);
}

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}
