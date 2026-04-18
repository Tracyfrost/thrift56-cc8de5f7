const EpisodeHero = () => {
  return (
    <section className="bg-[#F9F6F0] texture-grain py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-stone-950 leading-[0.9] mb-4">
            EVERY PIECE HAS A STORY
          </h1>
          <p className="font-serif italic text-stone-500 text-lg md:text-xl max-w-xl mx-auto">
            From thrift shelf to finished art — watch the full transformation.
          </p>
        </div>

        {/* Featured video */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video border-4 border-orange-800 bg-stone-200 relative overflow-hidden shadow-[0_0_30px_rgba(180,80,20,0.15)]">
            <iframe
              src="https://www.youtube.com/embed/3iDnecn4E60"
              title="Featured Episode"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Title & stats */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-sans font-black tracking-tighter text-stone-950 mb-4">
            I Turned a $7 Vase Into This
          </h2>

          <div className="grid grid-cols-3 divide-x divide-stone-300 border-2 border-stone-300 mb-6">
            <div className="px-4 py-3 text-center">
              <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Original Price</p>
              <p className="font-sans font-black text-orange-800 text-xl md:text-2xl">$7</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Transformation Time</p>
              <p className="font-sans font-black text-stone-950 text-xl md:text-2xl">6 Hours</p>
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Final Result</p>
              <p className="font-sans font-black text-stone-950 text-xl md:text-2xl">Botanical Art Piece</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-800 text-[#F9F6F0] font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-orange-900 transition-colors min-h-[48px]"
            >
              WATCH FULL EPISODE ON YOUTUBE
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-stone-950 text-stone-950 font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-stone-950 hover:text-[#F9F6F0] transition-colors min-h-[48px]"
            >
              VIEW THIS PIECE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpisodeHero;
