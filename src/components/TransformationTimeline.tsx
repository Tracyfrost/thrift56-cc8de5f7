import { sampleTimeline } from "@/data/communityData";

const TransformationTimeline = () => {
  return (
    <section className="py-16 md:py-20 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE JOURNEY</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">From Thrift to Art</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Every piece follows the same path — from forgotten shelf to finished artwork.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {sampleTimeline.map((stage, i) => (
            <div key={stage.label} className="flex gap-4 md:gap-6 mb-0 last:mb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-rust text-primary-foreground flex items-center justify-center font-heading text-sm font-bold">
                  {i + 1}
                </div>
                {i < sampleTimeline.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2 min-h-[40px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8 last:pb-0 flex-1">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden border border-border flex-shrink-0">
                    <img src={stage.image} alt={stage.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold mb-1">{stage.label}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationTimeline;
