import heroTracie from "@/assets/hero-tracie-disco.jpg";

const HeroBrutalist = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={heroTracie}
          alt="Tracie working on a thrift store transformation"
          className="w-full h-full object-cover contrast-125 saturate-50 sepia-[.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F6F0]/98 via-[#F9F6F0]/85 to-[#F9F6F0]/30 md:from-[#F9F6F0]/95 md:via-[#F9F6F0]/75 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-orange-800 font-sans text-xs font-bold uppercase tracking-[0.35em] mb-6 animate-stamp">
            THRIFT 56
          </p>
          <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-stone-950 mb-6">
            FOUND.<br />
            TRANSFORMED.<br />
            RELEASED.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-stone-800 mb-5">
            This was $3. It deserved better.
          </p>
          <p className="text-stone-600 font-serif text-sm leading-relaxed max-w-md mb-8">
            We find overlooked objects and turn them into one-of-one art pieces.
            Nothing is staged. Nothing is precious. Everything is transformed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <a
              href="#latest-transformation"
              className="inline-flex items-center justify-center bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors"
            >
              Watch the Transformation
            </a>
            <a
              href="#available-now"
              className="inline-flex items-center justify-center bg-transparent border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors"
            >
              See What's for Sale
            </a>
          </div>

          <p className="text-sm text-stone-500 font-serif italic">
            Most of these pieces were headed for the trash.
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F9F6F0] to-transparent" />
    </section>
  );
};

export default HeroBrutalist;
