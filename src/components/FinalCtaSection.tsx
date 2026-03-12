import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/thrift56-logo-clean.png";
import ShieldWatermark from "@/components/ShieldWatermark";

const FinalCtaSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-primary texture-paper overflow-hidden">
      {/* Shield watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground">
        <ShieldWatermark size={500} opacity={0.03} />
      </div>

      <div className="container relative z-10 text-center">
        <img src={logo} alt="Thrift 56" className="h-16 md:h-20 w-auto mx-auto mb-8 brightness-[1.8] contrast-[0.85]" />
        <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-4">DON'T MISS OUT</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-5">
          Don't Miss the Next Drop
        </h2>
        <p className="text-primary-foreground/50 mb-12 max-w-md mx-auto font-body">
          Every piece is one of a kind. Every episode is a new adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/episodes">
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-7 text-base gap-3"
            >
              <Play size={16} /> Watch Latest Transformation
            </Button>
          </Link>
          <a href="#email-capture">
            <Button variant="rust" size="lg" className="px-10 py-7 text-base">
              Join the Drop List
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
