import { Search, Paintbrush, Eye, Package } from "lucide-react";

const steps = [
  { icon: Search, label: "Find" },
  { icon: Paintbrush, label: "Transform" },
  { icon: Eye, label: "Reveal" },
  { icon: Package, label: "Drop" },
];

const EpisodeStorySteps = () => {
  return (
    <section className="py-16 md:py-24 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-serif italic text-stone-500 text-sm mb-2">The process</p>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-stone-950">
            FROM THRIFT TO ART
          </h2>
        </div>

        <div className="flex items-center justify-center max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-stone-950 rounded-none flex items-center justify-center bg-stone-50">
                  <step.icon size={24} className="text-stone-950" strokeWidth={1.5} />
                </div>
                <span className="font-sans font-black text-stone-950 text-xs uppercase tracking-widest mt-3">
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="h-[3px] w-8 md:w-16 lg:w-24 bg-stone-950 mx-1 md:mx-2 mb-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpisodeStorySteps;
