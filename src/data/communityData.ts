import thumbHunt from "@/assets/thumb-hunt.jpg";
import thumbTransform from "@/assets/thumb-transform.jpg";
import thumbReveal from "@/assets/thumb-reveal.jpg";
import thumbGiveaway from "@/assets/thumb-giveaway.jpg";
import beforePiece from "@/assets/before-piece.jpg";
import short1 from "@/assets/short-1.jpg";
import short2 from "@/assets/short-2.jpg";

export interface ThriftFind {
  id: string;
  image: string;
  caption: string;
  price: string;
  location: string;
  votesTransform: number;
  votesLeave: number;
}

export interface VoteItem {
  id: string;
  image: string;
  caption: string;
  votes: number;
}

export interface CommunitySubmission {
  id: string;
  name: string;
  image: string;
  location: string;
  note?: string;
  approved: boolean;
}

export interface TimelineStage {
  label: string;
  description: string;
  image: string;
  link?: string;
}

export const thriftFinds: ThriftFind[] = [
  { id: "tf1", image: thumbHunt, caption: "Vintage ceramic planter", price: "$4", location: "Goodwill — Austin, TX", votesTransform: 87, votesLeave: 12 },
  { id: "tf2", image: beforePiece, caption: "Tarnished brass candlestick", price: "$2", location: "Salvation Army — Dallas, TX", votesTransform: 64, votesLeave: 31 },
  { id: "tf3", image: short1, caption: "Wooden cutting board with character", price: "$3", location: "Estate sale — Round Rock, TX", votesTransform: 103, votesLeave: 8 },
  { id: "tf4", image: short2, caption: "Chipped enamel bowl", price: "$1", location: "Garage sale find", votesTransform: 45, votesLeave: 52 },
];

export const voteItems: VoteItem[] = [
  { id: "vi1", image: thumbHunt, caption: "The brass candlestick set", votes: 142 },
  { id: "vi2", image: beforePiece, caption: "Cracked terracotta pot", votes: 98 },
  { id: "vi3", image: short1, caption: "Vintage tin lunchbox", votes: 217 },
  { id: "vi4", image: short2, caption: "Old wooden step stool", votes: 63 },
];

export const communitySubmissions: CommunitySubmission[] = [
  { id: "cs1", name: "Maria R.", image: thumbGiveaway, location: "Portland, OR", note: "Found this at a church sale!", approved: true },
  { id: "cs2", name: "Jake T.", image: thumbReveal, location: "Nashville, TN", note: "This mirror has great bones", approved: true },
  { id: "cs3", name: "Ava L.", image: thumbTransform, location: "Denver, CO", approved: true },
];

export const sampleTimeline: TimelineStage[] = [
  { label: "Thrift Find", description: "Spotted at Goodwill for $3. Dusty, overlooked, full of potential.", image: beforePiece },
  { label: "Studio Transformation", description: "6 hours of sanding, painting, and detailing in the studio.", image: thumbTransform },
  { label: "The Reveal", description: "Unveiled on Episode 47 to an audience of 120K viewers.", image: thumbReveal },
  { label: "Drop / Giveaway", description: "Released as a limited art drop. Sold within 48 hours.", image: thumbGiveaway },
];
