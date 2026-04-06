import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/thrift56-logo-clean.png";

const navLinks = [
  { to: "/episodes", label: "Episodes" },
  { to: "/drops", label: "Shop" },
  { to: "/livestream", label: "Live" },
  { to: "/community", label: "Community" },
];

const WavyEdge = ({ className = "", thick = false }: { className?: string; thick?: boolean }) => (
  <svg
    viewBox="0 0 1200 20"
    preserveAspectRatio="none"
    className={`w-full ${thick ? "h-[14px]" : "h-[10px]"} ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow/glow layer */}
    <path
      d="M0,10 C40,3 80,16 130,8 C170,1 220,17 270,10 C320,3 360,15 420,7 C460,1 510,18 560,10 C610,2 650,16 710,9 C750,2 800,17 850,10 C900,3 940,15 1000,8 C1040,2 1090,16 1140,9 C1170,4 1190,14 1200,10"
      fill="none"
      stroke="hsl(var(--rust) / 0.3)"
      strokeWidth={thick ? "6" : "4"}
      strokeLinecap="round"
    />
    {/* Main wavy line */}
    <path
      d="M0,10 C40,3 80,16 130,8 C170,1 220,17 270,10 C320,3 360,15 420,7 C460,1 510,18 560,10 C610,2 650,16 710,9 C750,2 800,17 850,10 C900,3 940,15 1000,8 C1040,2 1090,16 1140,9 C1170,4 1190,14 1200,10"
      fill="none"
      stroke="hsl(var(--rust))"
      strokeWidth={thick ? "3.5" : "2.5"}
      strokeLinecap="round"
    />
    {/* Thin highlight */}
    <path
      d="M0,10 C40,3 80,16 130,8 C170,1 220,17 270,10 C320,3 360,15 420,7 C460,1 510,18 560,10 C610,2 650,16 710,9 C750,2 800,17 850,10 C900,3 940,15 1000,8 C1040,2 1090,16 1140,9 C1170,4 1190,14 1200,10"
      fill="none"
      stroke="hsl(var(--cream) / 0.15)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const SiteNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wavyOffset, setWavyOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setWavyOffset(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="sticky top-0 z-50">
      {/* Main bar */}
      <div className="relative bg-grunge film-grain shadow-[inset_0_-4px_20px_rgba(140,60,20,0.15)]">
        <div
          className={`container flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-18"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity relative z-10"
          >
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
                <span className="font-distressed text-rust text-xs mx-3 opacity-80 select-none">
                    ◆
                  </span>
                )}
                <Link
                  to={link.to}
                  className={`relative font-heading text-xs uppercase tracking-[0.2em] transition-colors hover:text-rust ${
                    isActive(link.to)
                      ? "text-rust"
                    : "text-stone-200"
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
            <span className="font-distressed text-rust text-xs mx-3 opacity-80 select-none">
              ◆
            </span>
            <Link
              to="/search"
              className="text-stone-300 hover:text-rust transition-colors"
              aria-label="Search"
            >
              <Search size={17} />
            </Link>

            {/* Subscribe tag */}
            <a
              href="https://www.youtube.com/@thrift56"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-5 nav-tag-clip -rotate-1 bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] px-6 py-2 hover:bg-rust/85 transition-colors"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-stone-300 hover:text-rust transition-colors relative z-10"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Wavy bottom edge with parallax */}
      <div
        className="relative -mt-[1px] transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${wavyOffset % 30 - 15}px)` }}
      >
        <WavyEdge thick />
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-950 pb-5">
          {/* Wavy top divider */}
          <WavyEdge className="opacity-50" />

          {/* Diagonal stripe accent */}
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
              <span className="font-distressed text-rust text-xs mr-3 opacity-60">
                ◆
              </span>
              {link.label}
            </Link>
          ))}
          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className="block px-6 py-3.5 font-heading text-sm uppercase tracking-[0.15em] border-b border-stone-800/50 text-stone-300"
          >
            <span className="font-distressed text-rust text-xs mr-3 opacity-60">
              ◆
            </span>
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
