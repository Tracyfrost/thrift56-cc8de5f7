import { Search, Paintbrush, Gift } from "lucide-react";

const concepts = [
  { icon: Search, label: "Hunt", desc: "Overlooked objects rescued from thrift stores across the country" },
  { icon: Paintbrush, label: "Transform", desc: "Each piece reimagined and painted on camera as a YouTube episode" },
  { icon: Gift, label: "Release", desc: "Finished art sold, raffled, or given away to the community" },
];

const ConceptStrip = () => {
  return (
    <section className="bg-primary py-10 md:py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {concepts.map((item, i) => (
            <div key={item.label} className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-11 h-11 rounded-sm bg-rust flex items-center justify-center">
                <item.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-0.5 text-primary-foreground tracking-wider">{item.label}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed font-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptStrip;
