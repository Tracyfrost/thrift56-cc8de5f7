import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const About = () => (
  <div className="min-h-screen bg-stone-950">
    <SiteNav />

    <section className="container py-16 md:py-24 max-w-3xl">
      <p className="font-serif italic text-stone-500 text-sm mb-3">The story behind the studio</p>
      <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter text-stone-100 leading-[0.9] mb-8">
        From Forgotten
        <br />
        <span className="text-rust">to Featured.</span>
      </h1>

      <div className="space-y-6 text-stone-400 text-sm leading-relaxed">
        <p>
          THRIFT 56 started in the back of a truck at a flea market in the Deep South. Tracie saw what nobody else did — potential in the discarded, beauty in the broken, value in the overlooked. What began as a weekend hobby became a full-blown creative movement.
        </p>
        <p>
          Every piece that passes through the studio gets the same treatment: discovered, documented, transformed, and released. We film the entire process — from the moment of discovery at the thrift store to the final reveal. Nothing is hidden. Nothing is faked.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-stone-800 my-10">
          {[
            { label: "Discovery", desc: "We hunt thrift stores, estate sales, and flea markets across the South." },
            { label: "Transformation", desc: "Every piece is hand-restored in our studio. No shortcuts." },
            { label: "Story", desc: "The entire journey is filmed and shared on our YouTube channel." },
            { label: "Release", desc: "Finished pieces drop exclusively here. Once they're gone, they're gone." },
          ].map((p, i) => (
            <div key={p.label} className={`p-4 ${i < 3 ? "border-r border-stone-800" : ""}`}>
              <h3 className="font-heading text-[10px] uppercase tracking-wider text-rust mb-1">{p.label}</h3>
              <p className="text-[11px] text-stone-500">{p.desc}</p>
            </div>
          ))}
        </div>

        <p>
          We believe that sustainability isn't a trend — it's a responsibility. Every item we rescue is one less thing in a landfill. Every transformation proves that "worthless" is just a failure of imagination.
        </p>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default About;
