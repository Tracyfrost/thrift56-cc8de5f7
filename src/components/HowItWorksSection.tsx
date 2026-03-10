import { Search, Paintbrush, Eye, Rocket } from "lucide-react";

const steps = [
  { icon: Search, title: "Hunt", desc: "Tracie scours thrift stores for overlooked treasures with hidden potential." },
  { icon: Paintbrush, title: "Transform", desc: "Each object gets a full artistic makeover—painted, reimagined, and made new." },
  { icon: Eye, title: "Reveal", desc: "The entire process is filmed and shared as a YouTube episode." },
  { icon: Rocket, title: "Release", desc: "Finished pieces are sold, raffled, or given away to the community." },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 bg-bone">
      <div className="container">
        <div className="text-center mb-16">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">THE PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">How It Works</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center group">
              <div className="relative mb-6 mx-auto w-20 h-20">
                <div className="w-20 h-20 rounded-sm bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                  <step.icon size={28} className="text-primary-foreground" />
                </div>
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-rust rounded-full flex items-center justify-center text-primary-foreground font-heading text-sm font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 uppercase tracking-wider">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
