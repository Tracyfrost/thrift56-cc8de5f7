import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/episodes", label: "Episodes" },
  { to: "/livestream", label: "Livestream" },
];

const SiteNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="font-heading text-xl uppercase tracking-[0.2em] font-bold">
          Thrift 56
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-heading text-sm uppercase tracking-wider transition-colors hover:text-rust ${
                location.pathname === link.to ? "text-rust" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.youtube.com/@thrift56"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm uppercase tracking-wider bg-primary text-primary-foreground px-4 py-1.5 rounded-sm hover:bg-primary/85 transition-colors"
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
        <div className="md:hidden border-t border-border bg-background pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 font-heading text-sm uppercase tracking-wider ${
                location.pathname === link.to ? "text-rust" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <a
              href="https://www.youtube.com/@thrift56"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-heading text-sm uppercase tracking-wider bg-primary text-primary-foreground px-4 py-2 rounded-sm"
            >
              Subscribe
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;
