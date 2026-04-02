import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/thrift56-logo-clean.png";

const navLinks = [
  { to: "/episodes", label: "Episodes" },
  { to: "/drops", label: "Shop" },
  { to: "/livestream", label: "Live" },
  { to: "/community", label: "Community" },
];

const SiteNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-18">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Thrift 56" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-heading text-xs uppercase tracking-[0.2em] transition-colors hover:text-rust ${
                location.pathname === link.to || location.pathname.startsWith(link.to + "/") ? "text-rust" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/search" className="text-muted-foreground hover:text-rust transition-colors" aria-label="Search">
            <Search size={17} />
          </Link>
          <a
            href="https://www.youtube.com/@thrift56"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-xs uppercase tracking-[0.15em] bg-rust text-primary-foreground px-5 py-2 rounded-sm hover:bg-rust/85 transition-colors"
          >
            Subscribe
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background pb-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3.5 font-heading text-sm uppercase tracking-[0.15em] border-b border-border/50 ${
                location.pathname === link.to ? "text-rust bg-card" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/search" onClick={() => setOpen(false)} className="block px-6 py-3.5 font-heading text-sm uppercase tracking-[0.15em] border-b border-border/50 text-foreground">
            Search
          </Link>
          <div className="px-6 pt-4">
            <a
              href="https://www.youtube.com/@thrift56"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-heading text-sm uppercase tracking-[0.15em] bg-rust text-primary-foreground px-4 py-3 rounded-sm"
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
