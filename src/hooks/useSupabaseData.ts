import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Episode = Database["public"]["Tables"]["episodes"]["Row"];
type EpisodeInsert = Database["public"]["Tables"]["episodes"]["Insert"];
type ArtPiece = Database["public"]["Tables"]["art_pieces"]["Row"];
type ArtPieceInsert = Database["public"]["Tables"]["art_pieces"]["Insert"];
type ShortClip = Database["public"]["Tables"]["short_clips"]["Row"];
type ContentCalendar = Database["public"]["Tables"]["content_calendar"]["Row"];
type ContentCalendarInsert = Database["public"]["Tables"]["content_calendar"]["Insert"];
type DropEntry = Database["public"]["Tables"]["drop_entries"]["Insert"];
type Vote = Database["public"]["Tables"]["votes"]["Row"];
type VoteInsert = Database["public"]["Tables"]["votes"]["Insert"];
type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];
type SubscriberInsert = Database["public"]["Tables"]["subscribers"]["Insert"];
type Submission = Database["public"]["Tables"]["submissions"]["Row"];
type SubmissionInsert = Database["public"]["Tables"]["submissions"]["Insert"];

export type { Episode, ArtPiece, ShortClip, ContentCalendar, Vote, Subscriber, Submission };

// ─── EPISODES ───────────────────────────────────────────

export function useEpisodes(category?: string) {
  return useQuery({
    queryKey: ["episodes", category],
    queryFn: async () => {
      let q = supabase.from("episodes").select("*").order("published_at", { ascending: false });
      if (category && category !== "all") q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return data as Episode[];
    },
  });
}

export function useEpisode(slug: string) {
  return useQuery({
    queryKey: ["episode", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("episodes").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data as Episode;
    },
    enabled: !!slug,
  });
}

export function useFeaturedEpisode() {
  return useQuery({
    queryKey: ["featured-episode"],
    queryFn: async () => {
      const { data, error } = await supabase.from("episodes").select("*").eq("is_featured", true).limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data as Episode;
      const { data: latest } = await supabase.from("episodes").select("*").order("published_at", { ascending: false }).limit(1).single();
      return latest as Episode | null;
    },
  });
}

export function useUpsertEpisode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ep: EpisodeInsert & { id?: string }) => {
      if (ep.id) {
        const { data, error } = await supabase.from("episodes").update(ep).eq("id", ep.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from("episodes").insert(ep).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["episodes"] }),
  });
}

export function useDeleteEpisode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("episodes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["episodes"] }),
  });
}

// ─── ART PIECES ─────────────────────────────────────────

export function useArtPieces(status?: string) {
  return useQuery({
    queryKey: ["art-pieces", status],
    queryFn: async () => {
      let q = supabase.from("art_pieces").select("*, episodes(title, slug, youtube_id)").order("created_at", { ascending: false });
      if (status && status !== "all") q = q.eq("status", status);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}

export function useArtPiece(slug: string) {
  return useQuery({
    queryKey: ["art-piece", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("art_pieces").select("*, episodes(title, slug, youtube_id)").eq("slug", slug).single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useFeaturedArtPiece() {
  return useQuery({
    queryKey: ["featured-art-piece"],
    queryFn: async () => {
      const { data, error } = await supabase.from("art_pieces").select("*").eq("is_featured", true).limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data as ArtPiece;
      const { data: fallback } = await supabase.from("art_pieces").select("*").neq("status", "archived").order("created_at", { ascending: false }).limit(1).maybeSingle();
      return fallback as ArtPiece | null;
    },
  });
}

export function useUpsertArtPiece() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (piece: ArtPieceInsert & { id?: string }) => {
      if (piece.id) {
        const { data, error } = await supabase.from("art_pieces").update(piece).eq("id", piece.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from("art_pieces").insert(piece).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["art-pieces"] }),
  });
}

export function useDeleteArtPiece() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("art_pieces").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["art-pieces"] }),
  });
}

// ─── SHORT CLIPS ────────────────────────────────────────

export function useShortClips() {
  return useQuery({
    queryKey: ["short-clips"],
    queryFn: async () => {
      const { data, error } = await supabase.from("short_clips").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as ShortClip[];
    },
  });
}

// ─── CONTENT CALENDAR ───────────────────────────────────

export function useContentCalendar() {
  return useQuery({
    queryKey: ["content-calendar"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content_calendar").select("*, episodes(title), art_pieces(title)").order("scheduled_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpsertCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (event: ContentCalendarInsert & { id?: string }) => {
      if (event.id) {
        const { data, error } = await supabase.from("content_calendar").update(event).eq("id", event.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from("content_calendar").insert(event).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["content-calendar"] }),
  });
}

// ─── DROP ENTRIES ───────────────────────────────────────

export function useSubmitEntry() {
  return useMutation({
    mutationFn: async (entry: DropEntry) => {
      const { data, error } = await supabase.from("drop_entries").insert(entry).select().single();
      if (error) throw error;
      return data;
    },
  });
}

// ─── VOTES (You Decide) ────────────────────────────────

export function useVotes() {
  return useQuery({
    queryKey: ["votes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("votes").select("*").eq("is_active", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data as Vote[];
    },
  });
}

export function useAllVotes() {
  return useQuery({
    queryKey: ["votes-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("votes").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Vote[];
    },
  });
}

export function useCastVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { error } = await supabase.rpc("increment_vote", { vote_id: id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["votes"] }),
  });
}

export function useUpsertVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vote: VoteInsert & { id?: string }) => {
      if (vote.id) {
        const { data, error } = await supabase.from("votes").update(vote).eq("id", vote.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase.from("votes").insert(vote).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["votes"] });
      qc.invalidateQueries({ queryKey: ["votes-all"] });
    },
  });
}

export function useDeleteVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("votes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["votes"] });
      qc.invalidateQueries({ queryKey: ["votes-all"] });
    },
  });
}

// ─── SUBSCRIBERS ────────────────────────────────────────

export function useSubscribe() {
  return useMutation({
    mutationFn: async (sub: SubscriberInsert) => {
      const { data, error } = await supabase.from("subscribers").insert(sub).select().single();
      if (error) throw error;
      return data;
    },
  });
}

export function useSubscribers() {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Subscriber[];
    },
  });
}

// ─── SUBMISSIONS ────────────────────────────────────────

export function useSubmitFind() {
  return useMutation({
    mutationFn: async (s: SubmissionInsert) => {
      const { error } = await supabase.from("submissions").insert(s);
      if (error) throw error;
    },
  });
}

export function useApprovedSubmissions() {
  return useQuery({
    queryKey: ["submissions-approved"],
    queryFn: async () => {
      const { data, error } = await supabase.from("approved_submissions_public" as any).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Omit<Submission, "email">[];
    },
  });
}

export function useAllSubmissions() {
  return useQuery({
    queryKey: ["submissions-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Submission[];
    },
  });
}

export function useUpdateSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_approved }: { id: string; is_approved: boolean }) => {
      const { error } = await supabase.from("submissions").update({ is_approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useDeleteSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

// ─── SEARCH ─────────────────────────────────────────────

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query || query.length < 2) return { episodes: [], artPieces: [] };
      const pattern = `%${query}%`;
      const [epRes, apRes] = await Promise.all([
        supabase.from("episodes").select("id, title, slug, category, thumbnail_url").ilike("title", pattern).limit(10),
        supabase.from("art_pieces").select("id, title, slug, status, after_image_url").ilike("title", pattern).limit(10),
      ]);
      return {
        episodes: (epRes.data || []) as Pick<Episode, "id" | "title" | "slug" | "category" | "thumbnail_url">[],
        artPieces: (apRes.data || []) as Pick<ArtPiece, "id" | "title" | "slug" | "status" | "after_image_url">[],
      };
    },
    enabled: query.length >= 2,
  });
}

// ─── STORAGE HELPERS ────────────────────────────────────

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}
