import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import logo from "@/assets/thrift56-logo-clean.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/episodes", label: "Episodes" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/drops", label: "Drops" },
  { to: "/contact", label: "Contact" },
];

const SiteNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="sticky top-0 z-50">
      <div className="relative bg-grunge film-grain shadow-[inset_0_-4px_20px_rgba(140,60,20,0.15)]">
        <div
          className={`container flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-18"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity relative z-10">
            <img
              src={logo}
              alt="Thrift 56"
              className={`w-auto transition-all duration-300 drop-shadow-[0_0_8px_rgba(180,100,40,0.3)] ${
                scrolled ? "h-10 md:h-12" : "h-14 md:h-16"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map((link, i) => (
              <div key={link.to} className="flex items-center">
                {i > 0 && (
                  <span className="font-distressed text-rust text-xs mx-2 opacity-80 select-none">◆</span>
                )}
                <Link
                  to={link.to}
                  className={`relative font-heading text-xs uppercase tracking-[0.2em] transition-colors hover:text-rust ${
                    isActive(link.to) ? "text-rust" : "text-stone-200"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-rust -rotate-2 rounded-full animate-stamp" />
                  )}
                </Link>
              </div>
            ))}

            {/* Search */}
            <span className="font-distressed text-rust text-xs mx-2 opacity-80 select-none">◆</span>
            <Link to="/search" className="text-stone-300 hover:text-rust transition-colors" aria-label="Search">
              <Search size={17} />
            </Link>

            {/* Cart */}
            <span className="font-distressed text-rust text-xs mx-2 opacity-80 select-none">◆</span>
            <CartDrawer />

            {/* Subscribe tag */}
            <a
              href="https://www.youtube.com/@thrift56"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 nav-tag-clip -rotate-1 bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] px-5 py-2 hover:bg-rust/85 transition-colors"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile: cart + toggle */}
          <div className="md:hidden flex items-center gap-2 relative z-10">
            <CartDrawer />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-stone-300 hover:text-rust transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-950 pb-5">
          <div
            className="h-2"
            style={{
              background:
                "repeating-linear-gradient(135deg, transparent, transparent 4px, hsl(var(--rust) / 0.15) 4px, hsl(var(--rust) / 0.15) 8px)",
            }}
          />
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3.5 font-heading text-sm uppercase tracking-[0.15em] border-b border-stone-800/50 ${
                isActive(link.to)
                  ? "text-rust bg-stone-900 border-l-4 border-l-rust"
                  : "text-stone-300"
              }`}
            >
              <span className="font-distressed text-rust text-xs mr-3 opacity-60">◆</span>
              {link.label}
            </Link>
          ))}
          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className="block px-6 py-3.5 font-heading text-sm uppercase tracking-[0.15em] border-b border-stone-800/50 text-stone-300"
          >
            <span className="font-distressed text-rust text-xs mr-3 opacity-60">◆</span>
            Search
          </Link>
          <div className="px-6 pt-4">
            <a
              href="https://www.youtube.com/@thrift56"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-heading text-sm uppercase tracking-[0.15em] bg-rust text-cream px-4 py-3 nav-tag-clip -rotate-1"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;
