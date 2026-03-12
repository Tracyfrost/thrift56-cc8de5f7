import { Link } from "react-router-dom";
import logo from "@/assets/thrift56-logo-clean.png";
import ShieldWatermark from "@/components/ShieldWatermark";

const SiteFooter = () => {
  return (
    <footer className="relative py-14 md:py-20 bg-primary border-t border-border overflow-hidden">
      {/* Shield watermark background */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary-foreground">
        <ShieldWatermark size={320} opacity={0.04} />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link to="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Thrift 56" className="h-20 w-auto brightness-[1.8] contrast-[0.85]" />
            </Link>
            <p className="text-sm text-primary-foreground/50 font-body leading-relaxed">
              Found objects, transformed art.<br />Every piece tells a story.
            </p>
          </div>
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-3">Explore</p>
            <div className="space-y-2">
              <Link to="/episodes" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">Episodes</Link>
              <Link to="/drops" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">Art Drops</Link>
              <Link to="/community" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">Community</Link>
              <Link to="/livestream" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">Livestream</Link>
            </div>
          </div>
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-3">Connect</p>
            <div className="space-y-2">
              <a href="https://www.youtube.com/@thrift56" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">YouTube</a>
              <a href="#" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">Instagram</a>
              <a href="#" className="block text-sm text-primary-foreground/50 hover:text-rust transition-colors font-body">TikTok</a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/30 font-body">
            © {new Date().getFullYear()} Thrift 56. All rights reserved.
          </p>
          <img src={logo} alt="" className="h-6 w-auto brightness-[1.8] contrast-[0.85] opacity-30" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
