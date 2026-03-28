const LatestTransformationBrutalist = () => {
  return (
    <section id="latest-transformation" className="bg-[#F9F6F0] py-20 md:py-28">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 mb-10">
          LATEST TRANSFORMATION
        </h2>

        <div className="max-w-4xl">
          <div className="aspect-video border-4 border-stone-950 bg-stone-900">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Latest Thrift 56 Transformation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-6 mb-8">
            <p className="text-stone-500 font-serif text-sm line-through">
              Original price: $3 thrift vase
            </p>
            <p className="font-sans font-bold text-orange-800 text-sm uppercase tracking-wide">
              Transformed: $200 art piece
            </p>
          </div>

          <a
            href="/episodes"
            className="inline-flex items-center justify-center bg-stone-950 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-none hover:bg-stone-800 transition-colors"
          >
            Watch Full Episode
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestTransformationBrutalist;
