import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tracie.jpg";
import logo from "@/assets/thrift56-logo-clean.png";
import ShieldWatermark from "@/components/ShieldWatermark";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center texture-paper overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tracie in her art studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/85 to-background/30 md:from-background/95 md:via-background/75 md:to-transparent" />
      </div>

      {/* Shield watermark — large faint motif behind content */}
      <div className="absolute right-[-5%] top-[10%] hidden md:block text-foreground">
        <ShieldWatermark size={600} opacity={0.03} />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <img
            src={logo}
            alt="Thrift 56"
            className="h-24 md:h-32 w-auto mb-8 drop-shadow-lg"
          />
          <h1 className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold leading-[0.88] mb-7 tracking-tight">
            Found.<br />
            Transformed.<br />
            Released.
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-md mb-12 leading-relaxed">
            Forgotten thrift store objects become one‑of‑a‑kind art — every transformation filmed, every piece released to the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/episodes">
              <Button variant="hero" size="lg" className="gap-3 px-10 py-7 text-base">
                <Play size={18} />
                Watch Latest Episode
              </Button>
            </Link>
            <a href="#email-capture">
              <Button variant="hero-outline" size="lg" className="px-10 py-7 text-base">
                Join the Drop List
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
