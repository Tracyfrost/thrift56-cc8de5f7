import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useThriftItem, useThriftItems } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import SquarePaymentForm from "@/components/shop/SquarePaymentForm";

const ShopItemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: item, isLoading } = useThriftItem(slug || "");
  const { data: allItems } = useThriftItems();
  const qc = useQueryClient();

  // Realtime subscription for this item's sold status
  useEffect(() => {
    if (!item?.id) return;
    const channel = supabase
      .channel(`thrift-item-${item.id}`)
      .on("postgres_changes" as any, {
        event: "UPDATE",
        schema: "public",
        table: "thrift_items",
        filter: `id=eq.${item.id}`,
      }, () => {
        qc.invalidateQueries({ queryKey: ["thrift-item", slug] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [item?.id, slug, qc]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-24 text-center">
          <div className="w-10 h-10 border-2 border-orange-800 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-24 text-center">
          <h1 className="font-sans font-black text-3xl tracking-tighter text-stone-950 mb-4">Piece Not Found</h1>
          <Link to="/" className="inline-flex items-center justify-center bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors">
            Back Home
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    resurrected: "Resurrected",
    curated: "Curated",
    vault: "Vault",
  };

  const related = allItems?.filter((p: any) => p.id !== item.id && !p.is_sold).slice(0, 3) || [];

  // Parse markdown story into simple HTML paragraphs / headings
  const renderStory = (story: string) => {
    return story.split("\n").map((line: string, i: number) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={i} className="font-sans font-black text-sm uppercase tracking-[0.15em] text-stone-950 mt-8 mb-2">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      return (
        <p key={i} className="font-serif text-stone-600 leading-relaxed mb-3">
          {trimmed}
        </p>
      );
    });
  };

  // Extract YouTube embed URL from watch URL
  const getYoutubeEmbed = (url: string) => {
    if (url.includes("/embed/")) return url;
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />

      <div className="container py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-800 transition-colors font-sans font-bold text-xs uppercase tracking-[0.15em] mb-8"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-5">
            {item.after_image_url ? (
              <div className="relative">
                <img
                  src={item.after_image_url}
                  alt={item.title}
                  className="w-full border-4 border-stone-950 rounded-none"
                />
                <span className="absolute top-4 right-4 bg-stone-950 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                  1 of 1
                </span>
              </div>
            ) : (
              <div className="w-full aspect-square bg-stone-200 border-4 border-stone-950 flex items-center justify-center text-stone-400 font-sans font-bold text-sm uppercase">
                No Image
              </div>
            )}

            {item.before_image_url && (
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                  Before
                </p>
                <img
                  src={item.before_image_url}
                  alt="Before"
                  className="w-full aspect-square object-cover border-4 border-stone-300 rounded-none"
                />
              </div>
            )}

            {item.youtube_episode_url && (
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                  Watch the Transformation
                </p>
                <div className="aspect-video border-4 border-stone-950 bg-stone-900">
                  <iframe
                    src={getYoutubeEmbed(item.youtube_episode_url)}
                    title="Transformation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Category badge */}
            <span className="inline-block bg-orange-800 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 mb-4">
              {categoryLabels[item.category] || item.category}
            </span>

            <h1 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl tracking-tighter text-stone-950 mb-2">
              {item.title}
            </h1>

            <p className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-6">
              1 OF 1 WORLDWIDE
            </p>

            {item.episode_number && (
              <p className="font-serif italic text-stone-500 text-sm mb-6">
                From Episode {item.episode_number}
              </p>
            )}

            {/* Story */}
            {item.story && (
              <div className="mb-8 border-l-4 border-stone-300 pl-6">
                {renderStory(item.story)}
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-stone-950 text-stone-950 font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            {item.is_sold ? (
              <div className="border-4 border-stone-300 p-8 text-center">
                <p className="font-sans font-black text-xl tracking-tighter text-stone-400 mb-1">
                  SOLD — VIEW STORY
                </p>
                <p className="font-serif italic text-stone-400 text-sm">
                  {item.price ? `Acquired for $${item.price}` : "This piece has found its home."}
                </p>
              </div>
            ) : item.price ? (
              <SquarePaymentForm
                itemId={item.id}
                itemTitle={item.title}
                price={item.price}
              />
            ) : (
              <div className="border-4 border-stone-950 p-8 text-center">
                <p className="font-sans font-black text-lg tracking-tighter text-stone-950">
                  INQUIRE FOR PRICING
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related items */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tighter text-stone-950 mb-8">
              MORE PIECES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p: any) => (
                <Link key={p.id} to={`/shop/${p.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-stone-200">
                    {p.after_image_url ? (
                      <img src={p.after_image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-sans text-sm">No Image</div>
                    )}
                    <span className="absolute top-3 right-3 bg-stone-950 text-stone-50 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10">
                      1 of 1
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="font-sans font-bold text-sm uppercase tracking-wide text-stone-950">{p.title}</p>
                    {p.price && (
                      <p className="font-serif text-sm mt-1 text-orange-800">${p.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  );
};

export default ShopItemDetail;
