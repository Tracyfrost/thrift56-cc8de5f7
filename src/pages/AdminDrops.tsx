import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { artPieces, type ArtPiece, type ArtStatus, statusConfig } from "@/data/artPieces";
import { Plus, Pencil, X } from "lucide-react";

const statusOptions: ArtStatus[] = ["available", "raffle", "giveaway", "auction", "archived"];

const emptyPiece: Omit<ArtPiece, "id" | "slug"> = {
  title: "",
  description: "",
  beforeImage: "",
  afterImage: "",
  createdAt: new Date().toISOString().split("T")[0],
  status: "available",
  price: undefined,
  dropDate: undefined,
  giveawayEndDate: undefined,
  auctionEndDate: undefined,
  episodeYoutubeId: undefined,
  materials: [],
};

const AdminDrops = () => {
  const [pieces, setPieces] = useState<ArtPiece[]>([...artPieces]);
  const [editing, setEditing] = useState<ArtPiece | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setEditing({
      id: `ap-${Date.now()}`,
      slug: "",
      ...emptyPiece,
    });
    setIsNew(true);
  };

  const startEdit = (piece: ArtPiece) => {
    setEditing({ ...piece });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const updated = { ...editing, slug };

    if (isNew) {
      setPieces([updated, ...pieces]);
    } else {
      setPieces(pieces.map((p) => (p.id === updated.id ? updated : p)));
    }
    setEditing(null);
    setIsNew(false);
  };

  const remove = (id: string) => {
    setPieces(pieces.filter((p) => p.id !== id));
  };

  const updateField = <K extends keyof ArtPiece>(field: K, value: ArtPiece[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-distressed text-rust text-sm tracking-widest mb-1">ADMIN</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Manage Drops</h1>
          </div>
          <Button variant="rust" onClick={startNew} className="gap-2">
            <Plus size={16} /> New Piece
          </Button>
        </div>

        {/* Edit panel */}
        {editing && (
          <div className="border border-border rounded-sm bg-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold">{isNew ? "New Art Piece" : "Edit Piece"}</h2>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
                <Input value={editing.title} onChange={(e) => updateField("title", e.target.value)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Status</label>
                <select
                  value={editing.status}
                  onChange={(e) => updateField("status", e.target.value as ArtStatus)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm font-body"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{statusConfig[s].label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body resize-none"
                />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Before Image URL</label>
                <Input value={editing.beforeImage} onChange={(e) => updateField("beforeImage", e.target.value)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">After Image URL</label>
                <Input value={editing.afterImage} onChange={(e) => updateField("afterImage", e.target.value)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Price ($)</label>
                <Input type="number" value={editing.price || ""} onChange={(e) => updateField("price", e.target.value ? Number(e.target.value) : undefined)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">YouTube Episode ID</label>
                <Input value={editing.episodeYoutubeId || ""} onChange={(e) => updateField("episodeYoutubeId", e.target.value || undefined)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Drop Date</label>
                <Input type="datetime-local" value={editing.dropDate?.slice(0, 16) || ""} onChange={(e) => updateField("dropDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)} className="font-body" />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Giveaway / Raffle End Date</label>
                <Input type="datetime-local" value={editing.giveawayEndDate?.slice(0, 16) || ""} onChange={(e) => updateField("giveawayEndDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)} className="font-body" />
              </div>
              <div className="md:col-span-2">
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Materials (comma separated)</label>
                <Input
                  value={editing.materials?.join(", ") || ""}
                  onChange={(e) => updateField("materials", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  className="font-body"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="rust" onClick={save}>Save Piece</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Pieces list */}
        <div className="space-y-3">
          {pieces.map((piece) => (
            <div key={piece.id} className="flex items-center gap-4 border border-border rounded-sm bg-card p-4">
              <img src={piece.afterImage} alt={piece.title} className="w-16 h-16 object-cover rounded-sm border border-border flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold truncate">{piece.title}</p>
                <span className={`inline-block px-2 py-0.5 text-[10px] font-heading uppercase tracking-widest rounded-sm mt-1 ${statusConfig[piece.status].badgeClass}`}>
                  {statusConfig[piece.status].label}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(piece)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(piece.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default AdminDrops;
