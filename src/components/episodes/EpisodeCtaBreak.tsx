const EpisodeCtaBreak = () => {
  return (
    <>
      <section className="bg-[#F9F6F0] py-20 md:py-28">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-stone-950 mb-8 leading-[0.95]">
            DON'T MISS THE NEXT
            <br />
            TRANSFORMATION
          </h2>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-stone-950 text-[#F9F6F0] font-sans font-black uppercase tracking-widest text-sm rounded-none hover:bg-stone-800 transition-colors"
          >
            SUBSCRIBE ON YOUTUBE
          </a>
        </div>
      </section>

      {/* Floating urgency badge */}
      <div className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-orange-800 text-white text-xs font-sans font-black uppercase tracking-widest rounded-none shadow-lg">
        Next drop in 3 days
      </div>
    </>
  );
};

export default EpisodeCtaBreak;
