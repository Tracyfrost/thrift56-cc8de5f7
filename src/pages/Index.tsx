import HeroSection from "@/components/HeroSection";
import ConceptStrip from "@/components/ConceptStrip";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import LatestEpisodeSection from "@/components/LatestEpisodeSection";
import FeaturedDropSection from "@/components/FeaturedDropSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import EmailCaptureSection from "@/components/EmailCaptureSection";
import SocialSection from "@/components/SocialSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ConceptStrip />
      <BeforeAfterSection />
      <LatestEpisodeSection />
      <FeaturedDropSection />
      <HowItWorksSection />
      <EmailCaptureSection />
      <SocialSection />
      <FinalCtaSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
