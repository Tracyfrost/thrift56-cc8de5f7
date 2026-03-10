import { Search, Paintbrush, Gift } from "lucide-react";

const concepts = [
  { icon: Search, label: "Thrifted Finds", desc: "Overlooked objects rescued from thrift stores" },
  { icon: Paintbrush, label: "Art Transformations", desc: "Turned into original works of art on camera" },
  { icon: Gift, label: "Drops, Giveaways & Episodes", desc: "Released to collectors, fans, and subscribers" },
];

const ConceptStrip = () => {
  return (
    <section className="bg-bone border-y border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {concepts.map((item) => (
            <div key={item.label} className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary flex items-center justify-center">
                <item.icon size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptStrip;
