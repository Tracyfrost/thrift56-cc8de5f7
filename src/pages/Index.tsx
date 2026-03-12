import HeroSection from "@/components/HeroSection";
import ConceptStrip from "@/components/ConceptStrip";
import BingeWatchStrip from "@/components/BingeWatchStrip";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import LatestEpisodeSection from "@/components/LatestEpisodeSection";
import SubscribePrompt from "@/components/SubscribePrompt";
import FeaturedDropSection from "@/components/FeaturedDropSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ShortFormSection from "@/components/ShortFormSection";
import TransformationShowcase from "@/components/TransformationShowcase";
import EmailCaptureSection from "@/components/EmailCaptureSection";
import SocialSection from "@/components/SocialSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DiscoverHunt from "@/components/DiscoverHunt";
import YouDecide from "@/components/YouDecide";
import ShieldDivider from "@/components/ShieldDivider";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <HeroSection />
      <ConceptStrip />
      <LatestEpisodeSection />
      <BingeWatchStrip />
      <BeforeAfterSection />
      <div className="container py-8">
        <SubscribePrompt />
      </div>
      <ShieldDivider className="container" />
      <FeaturedDropSection />
      <TransformationShowcase />
      <ShieldDivider className="container" />
      <HowItWorksSection />
      <ShortFormSection />
      <DiscoverHunt />
      <YouDecide />
      <EmailCaptureSection />
      <SocialSection />
      <FinalCtaSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
