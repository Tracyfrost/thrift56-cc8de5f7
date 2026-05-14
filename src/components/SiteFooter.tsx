import { Link } from "react-router-dom";
import logo from "@/assets/thrift56-logo-clean.png";
import ShieldWatermark from "@/components/ShieldWatermark";

const SiteFooter = () => {
  return (
    <footer className="relative py-14 md:py-20 bg-stone-100 film-grain border-t border-stone-300 overflow-hidden">
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent, transparent 4px, hsl(16 70% 38% / 0.04) 4px, hsl(16 70% 38% / 0.04) 8px)",
        }}
      />

      {/* Shield watermark background */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 z-[2]">
        <ShieldWatermark size={320} opacity={0.06} />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link to="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Thrift 56" className="h-20 w-auto" />
            </Link>
            <p className="text-sm text-stone-600 font-serif leading-relaxed">
              Found objects, transformed art.<br />Every piece tells a story.
            </p>
          </div>
          <div>
            <p className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-stone-600 mb-3">Explore</p>
            <div className="space-y-2">
              <Link to="/episodes" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Episodes</Link>
              <Link to="/drops" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Art Drops</Link>
              <Link to="/community" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Community</Link>
              <Link to="/livestream" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Livestream</Link>
            </div>
          </div>
          <div>
            <p className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-stone-600 mb-3">Connect</p>
            <div className="space-y-2">
              <a href="https://www.youtube.com/@thrift56" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">YouTube</a>
              <a href="https://www.facebook.com/thrift56/" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Facebook</a>
              <a href="https://www.instagram.com/thriftfiftysix/" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">Instagram</a>
              <a href="https://www.tiktok.com/@thriftfiftysix" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="block text-sm text-stone-600 hover:text-orange-800 transition-colors font-serif">TikTok</a>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600 font-serif">
            © {new Date().getFullYear()} Thrift 56. All rights reserved.
          </p>
          <img src={logo} alt="" className="h-6 w-auto opacity-30" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
