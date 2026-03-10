import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCtaSection = () => {
  return (
    <section className="py-20 bg-primary texture-paper">
      <div className="container text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Don't Miss the Next Drop
        </h2>
        <p className="text-primary-foreground/70 mb-10 max-w-md mx-auto font-body">
          Every piece is one of a kind. Every episode is a new adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="hero-outline"
            size="lg"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-6 gap-2"
          >
            <Play size={16} />
            Watch Latest Transformation
          </Button>
          <Button
            variant="rust"
            size="lg"
            className="px-8 py-6"
          >
            Join the Drop List
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
