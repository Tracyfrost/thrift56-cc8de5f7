import { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSupabaseData";
import { Search as SearchIcon } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearch(query);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2 text-center">FIND SOMETHING</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center">Search</h1>

          <div className="relative mb-10">
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search episodes, art pieces, transformations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 font-body text-base bg-card"
            />
          </div>

          {query.length >= 2 && isLoading && (
            <p className="text-muted-foreground text-center font-body">Searching...</p>
          )}

          {data && query.length >= 2 && (
            <div className="space-y-8">
              {data.episodes.length > 0 && (
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-3">Episodes</p>
                  <div className="space-y-2">
                    {data.episodes.map((ep) => (
                      <Link key={ep.id} to={`/episodes/${ep.slug}`} className="flex items-center gap-3 p-3 border border-border rounded-sm bg-card hover:border-rust transition-colors">
                        {ep.thumbnail_url && <img src={ep.thumbnail_url} alt="" className="w-12 h-12 object-cover rounded-sm" />}
                        <div>
                          <p className="font-heading font-bold text-sm">{ep.title}</p>
                          <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">{ep.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {data.artPieces.length > 0 && (
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-3">Art Pieces</p>
                  <div className="space-y-2">
                    {data.artPieces.map((piece) => (
                      <Link key={piece.id} to={`/drops/${piece.slug}`} className="flex items-center gap-3 p-3 border border-border rounded-sm bg-card hover:border-rust transition-colors">
                        {piece.after_image_url && <img src={piece.after_image_url} alt="" className="w-12 h-12 object-cover rounded-sm" />}
                        <div>
                          <p className="font-heading font-bold text-sm">{piece.title}</p>
                          <p className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">{piece.status}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {data.episodes.length === 0 && data.artPieces.length === 0 && (
                <p className="text-muted-foreground text-center font-body py-8">No results found for "{query}"</p>
              )}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default SearchPage;
