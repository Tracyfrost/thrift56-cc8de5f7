import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DiscoverHunt from "@/components/DiscoverHunt";
import YouDecide from "@/components/YouDecide";
import CommunitySubmissions from "@/components/CommunitySubmissions";
import TransformationTimeline from "@/components/TransformationTimeline";
import CommunityFeedback from "@/components/CommunityFeedback";
import SubscribePrompt from "@/components/SubscribePrompt";

const Community = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Header */}
      <section className="py-16 md:py-20 texture-paper text-center">
        <div className="container">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE COMMUNITY</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Be Part of the Process</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-body leading-relaxed">
            Vote on what gets transformed. Submit your own finds. Shape the next episode. This is your studio too.
          </p>
        </div>
      </section>

      <DiscoverHunt />
      <YouDecide />
      <CommunitySubmissions />
      <TransformationTimeline />
      <CommunityFeedback />

      <div className="container py-8">
        <SubscribePrompt variant="banner" />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Community;
