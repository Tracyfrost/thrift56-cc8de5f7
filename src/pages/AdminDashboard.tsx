import { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEpisodes, useArtPieces, useContentCalendar, useUpsertEpisode, useDeleteEpisode, useUpsertArtPiece, useDeleteArtPiece, useUpsertCalendarEvent } from "@/hooks/useSupabaseData";
import { Pencil, Plus, Trash2, X, Calendar, Film, Palette, Search } from "lucide-react";

type Tab = "episodes" | "art-pieces" | "calendar";

const eventTypeLabels: Record<string, string> = {
  episode: "Episode",
  "art-drop": "Art Drop",
  giveaway: "Giveaway",
  livestream: "Livestream",
  raffle: "Raffle",
};

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("episodes");

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-distressed text-rust text-sm tracking-widest mb-1">CREATOR DASHBOARD</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Media Operating System</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-3">
          {([
            { key: "episodes" as Tab, label: "Episodes", icon: Film },
            { key: "art-pieces" as Tab, label: "Art Pieces", icon: Palette },
            { key: "calendar" as Tab, label: "Calendar", icon: Calendar },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-heading uppercase tracking-wider rounded-sm transition-colors ${
                tab === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {tab === "episodes" && <EpisodesTab />}
        {tab === "art-pieces" && <ArtPiecesTab />}
        {tab === "calendar" && <CalendarTab />}
      </div>
      <SiteFooter />
    </div>
  );
};

// ─── EPISODES TAB ───────────────────────────────────────

function EpisodesTab() {
  const { data: episodes, isLoading } = useEpisodes();
  const upsert = useUpsertEpisode();
  const remove = useDeleteEpisode();
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setEditing({ title: "", slug: "", youtube_id: "", description: "", category: "transformation", episode_number: null, thrift_store_location: "", purchase_price: "", before_image_url: "", after_image_url: "", is_featured: false });
    setIsNew(true);
  };

  const save = async () => {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    await upsert.mutateAsync({ ...editing, slug, published_at: editing.published_at || new Date().toISOString() });
    setEditing(null);
    setIsNew(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-heading text-lg font-bold">{episodes?.length || 0} Episodes</p>
        <Button variant="rust" onClick={startNew} className="gap-2"><Plus size={16} /> New Episode</Button>
      </div>

      {editing && (
        <div className="border border-border rounded-sm bg-card p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-heading text-xl font-bold">{isNew ? "New Episode" : "Edit Episode"}</h2>
            <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="transformation">Transformation</option>
                <option value="thrift-hunt">Thrift Hunt</option>
                <option value="giveaway">Giveaway</option>
                <option value="livestream">Livestream</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">YouTube ID</label>
              <Input value={editing.youtube_id || ""} onChange={(e) => setEditing({ ...editing, youtube_id: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Episode #</label>
              <Input type="number" value={editing.episode_number || ""} onChange={(e) => setEditing({ ...editing, episode_number: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Before Image URL</label>
              <Input value={editing.before_image_url || ""} onChange={(e) => setEditing({ ...editing, before_image_url: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">After Image URL</label>
              <Input value={editing.after_image_url || ""} onChange={(e) => setEditing({ ...editing, after_image_url: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
              <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Thrift Store Location</label>
              <Input value={editing.thrift_store_location || ""} onChange={(e) => setEditing({ ...editing, thrift_store_location: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Purchase Price</label>
              <Input value={editing.purchase_price || ""} onChange={(e) => setEditing({ ...editing, purchase_price: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" checked={editing.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} id="ep-featured" />
              <label htmlFor="ep-featured" className="font-heading text-xs uppercase tracking-widest text-muted-foreground">Featured Episode</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="rust" onClick={save} disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground py-8 text-center font-body">Loading episodes...</p>
      ) : (
        <div className="space-y-2">
          {episodes?.map((ep) => (
            <div key={ep.id} className="flex items-center gap-4 border border-border rounded-sm bg-card p-3">
              {ep.thumbnail_url && <img src={ep.thumbnail_url} alt="" className="w-14 h-14 object-cover rounded-sm border border-border flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm truncate">{ep.title}</p>
                <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">{ep.category} · Ep {ep.episode_number}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditing({ ...ep }); setIsNew(false); }} className="p-2 text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
                <button onClick={() => remove.mutate(ep.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ART PIECES TAB ─────────────────────────────────────

function ArtPiecesTab() {
  const { data: pieces, isLoading } = useArtPieces();
  const { data: episodes } = useEpisodes();
  const upsert = useUpsertArtPiece();
  const remove = useDeleteArtPiece();
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setEditing({ title: "", slug: "", description: "", status: "available", before_image_url: "", after_image_url: "", price: null, episode_id: null, materials: [], is_featured: false });
    setIsNew(true);
  };

  const save = async () => {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const materials = typeof editing.materials === "string" ? editing.materials.split(",").map((s: string) => s.trim()).filter(Boolean) : editing.materials;
    await upsert.mutateAsync({ ...editing, slug, materials });
    setEditing(null);
    setIsNew(false);
  };

  const statusBadge: Record<string, string> = {
    available: "bg-secondary text-secondary-foreground",
    raffle: "bg-rust text-primary-foreground",
    giveaway: "bg-primary text-primary-foreground",
    auction: "bg-secondary text-secondary-foreground",
    archived: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-heading text-lg font-bold">{pieces?.length || 0} Art Pieces</p>
        <Button variant="rust" onClick={startNew} className="gap-2"><Plus size={16} /> New Piece</Button>
      </div>

      {editing && (
        <div className="border border-border rounded-sm bg-card p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-heading text-xl font-bold">{isNew ? "New Art Piece" : "Edit Piece"}</h2>
            <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Status</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="available">Available</option>
                <option value="raffle">Raffle</option>
                <option value="giveaway">Giveaway</option>
                <option value="auction">Auction</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Price ($)</label>
              <Input type="number" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Linked Episode</label>
              <select value={editing.episode_id || ""} onChange={(e) => setEditing({ ...editing, episode_id: e.target.value || null })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">None</option>
                {episodes?.map((ep) => <option key={ep.id} value={ep.id}>{ep.title}</option>)}
              </select>
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Before Image URL</label>
              <Input value={editing.before_image_url || ""} onChange={(e) => setEditing({ ...editing, before_image_url: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">After Image URL</label>
              <Input value={editing.after_image_url || ""} onChange={(e) => setEditing({ ...editing, after_image_url: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Drop Date</label>
              <Input type="datetime-local" value={editing.drop_date?.slice(0, 16) || ""} onChange={(e) => setEditing({ ...editing, drop_date: e.target.value ? new Date(e.target.value).toISOString() : null })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">End Date (Raffle/Giveaway)</label>
              <Input type="datetime-local" value={editing.giveaway_end_date?.slice(0, 16) || ""} onChange={(e) => setEditing({ ...editing, giveaway_end_date: e.target.value ? new Date(e.target.value).toISOString() : null })} />
            </div>
            <div className="md:col-span-2">
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
              <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Materials (comma separated)</label>
              <Input value={Array.isArray(editing.materials) ? editing.materials.join(", ") : editing.materials || ""} onChange={(e) => setEditing({ ...editing, materials: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" checked={editing.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} id="ap-featured" />
              <label htmlFor="ap-featured" className="font-heading text-xs uppercase tracking-widest text-muted-foreground">Featured Piece</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="rust" onClick={save} disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground py-8 text-center font-body">Loading art pieces...</p>
      ) : (
        <div className="space-y-2">
          {pieces?.map((piece) => (
            <div key={piece.id} className="flex items-center gap-4 border border-border rounded-sm bg-card p-3">
              {piece.after_image_url && <img src={piece.after_image_url} alt="" className="w-14 h-14 object-cover rounded-sm border border-border flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm truncate">{piece.title}</p>
                <span className={`inline-block px-2 py-0.5 text-[9px] font-heading uppercase tracking-widest rounded-sm mt-1 ${statusBadge[piece.status] || ""}`}>
                  {piece.status}
                </span>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditing({ ...piece }); setIsNew(false); }} className="p-2 text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
                <button onClick={() => remove.mutate(piece.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CALENDAR TAB ───────────────────────────────────────

function CalendarTab() {
  const { data: events, isLoading } = useContentCalendar();
  const { data: episodes } = useEpisodes();
  const { data: artPieces } = useArtPieces();
  const upsert = useUpsertCalendarEvent();
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setEditing({ title: "", event_type: "episode", scheduled_at: "", description: "", linked_episode_id: null, linked_art_piece_id: null, is_published: false });
    setIsNew(true);
  };

  const save = async () => {
    if (!editing) return;
    await upsert.mutateAsync({ ...editing, scheduled_at: new Date(editing.scheduled_at).toISOString() });
    setEditing(null);
    setIsNew(false);
  };

  const typeColors: Record<string, string> = {
    episode: "bg-secondary text-secondary-foreground",
    "art-drop": "bg-rust text-primary-foreground",
    giveaway: "bg-primary text-primary-foreground",
    livestream: "bg-muted text-muted-foreground",
    raffle: "bg-secondary text-secondary-foreground",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-heading text-lg font-bold">Content Calendar</p>
        <Button variant="rust" onClick={startNew} className="gap-2"><Plus size={16} /> New Event</Button>
      </div>

      {editing && (
        <div className="border border-border rounded-sm bg-card p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-heading text-xl font-bold">{isNew ? "New Event" : "Edit Event"}</h2>
            <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Event Type</label>
              <select value={editing.event_type} onChange={(e) => setEditing({ ...editing, event_type: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="episode">Episode</option>
                <option value="art-drop">Art Drop</option>
                <option value="giveaway">Giveaway</option>
                <option value="livestream">Livestream</option>
                <option value="raffle">Raffle</option>
              </select>
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Scheduled Date</label>
              <Input type="datetime-local" value={editing.scheduled_at?.slice(0, 16) || ""} onChange={(e) => setEditing({ ...editing, scheduled_at: e.target.value })} />
            </div>
            <div>
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Link Episode</label>
              <select value={editing.linked_episode_id || ""} onChange={(e) => setEditing({ ...editing, linked_episode_id: e.target.value || null })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">None</option>
                {episodes?.map((ep) => <option key={ep.id} value={ep.id}>{ep.title}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
              <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="rust" onClick={save} disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground py-8 text-center font-body">Loading calendar...</p>
      ) : (
        <div className="space-y-2">
          {events?.map((event) => (
            <div key={event.id} className="flex items-center gap-4 border border-border rounded-sm bg-card p-3">
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm truncate">{event.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-heading uppercase tracking-widest rounded-sm ${typeColors[event.event_type] || ""}`}>
                    {eventTypeLabels[event.event_type] || event.event_type}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-body">
                    {new Date(event.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
              </div>
              <button onClick={() => { setEditing({ ...event }); setIsNew(false); }} className="p-2 text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
            </div>
          ))}
          {(!events || events.length === 0) && (
            <p className="text-muted-foreground text-center py-8 font-body">No events scheduled. Add your first one!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
