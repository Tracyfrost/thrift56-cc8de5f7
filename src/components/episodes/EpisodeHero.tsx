import thumbTransform from "@/assets/thumb-transform.jpg";

const EpisodeHero = () => {
  return (
    <section className="texture-paper py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-stone-950 leading-[0.9] mb-4">
            EVERY PIECE HAS A STORY
          </h1>
          <p className="font-serif italic text-stone-600 text-lg md:text-xl max-w-xl mx-auto">
            From thrift shelf to finished art — watch the full transformation.
          </p>
        </div>

        {/* Directional arrow */}
        <div className="flex justify-center mb-6 animate-bounce">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "16px solid transparent",
              borderRight: "16px solid transparent",
              borderTop: "20px solid #1c1917",
            }}
          />
        </div>

        {/* Featured video */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video border-4 border-stone-950 bg-stone-900 relative overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
            I Turned a $3 Vase Into This
          </h2>

          <div className="grid grid-cols-3 divide-x divide-stone-300 border-2 border-stone-950 mb-6">
            <div className="px-4 py-3 text-center">
              <p className="font-serif italic text-stone-500 text-xs uppercase tracking-wider">Original Price</p>
              <p className="font-sans font-black text-stone-950 text-xl md:text-2xl">$3</p>
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
              className="inline-flex items-center justify-center px-8 py-3 bg-stone-950 text-stone-50 font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-stone-800 transition-colors"
            >
              WATCH FULL EPISODE ON YOUTUBE
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-stone-950 text-stone-950 font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors"
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
