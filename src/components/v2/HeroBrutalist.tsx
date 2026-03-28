import heroTracie from "@/assets/hero-tracie.jpg";

const HeroBrutalist = () => {
  return (
    <section className="bg-[#F9F6F0] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[85vh] items-center">
          {/* Text — appears second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 py-12 lg:py-20 pr-0 lg:pr-12">
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

          {/* Image — appears first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center lg:justify-end py-8 lg:py-0">
            <div className="relative lg:-mr-12 xl:-mr-20 w-full max-w-md lg:max-w-none">
              <div className="film-grain relative shadow-2xl shadow-stone-900/30 rounded-none overflow-hidden">
                <img
                  src={heroTracie}
                  alt="Tracie working on a thrift store transformation"
                  className="w-full h-auto object-cover contrast-125 saturate-50 sepia-[.25]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBrutalist;
