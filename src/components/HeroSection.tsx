import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tracie.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center texture-paper overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tracie in her art studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <p className="font-distressed text-rust text-lg mb-4 tracking-wider">
            THRIFT 56
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] mb-6">
            Found.<br />
            Transformed.<br />
            Released.
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
            Tracie hunts thrift stores for forgotten objects, turns them into art, and shares the full transformation on video.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="gap-3 px-8 py-6">
              <Play size={18} />
              Watch Latest Episode
            </Button>
            <Button variant="hero-outline" size="lg" className="px-8 py-6">
              Join the Drop List
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom distressed edge */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
