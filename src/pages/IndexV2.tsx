import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";
import HeroBrutalist from "@/components/v2/HeroBrutalist";
import MarqueeBrutalist from "@/components/v2/MarqueeBrutalist";
import BeforeAfterSlider from "@/components/v2/BeforeAfterSlider";
import LatestTransformationBrutalist from "@/components/v2/LatestTransformationBrutalist";
import AvailableNowGrid from "@/components/v2/AvailableNowGrid";
import EmailCaptureBrutalist from "@/components/v2/EmailCaptureBrutalist";
import EmailPopup from "@/components/EmailPopup";
import TraciesPicksStrip from "@/components/TraciesPicksStrip";

const IndexV2 = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Thrift 56 — Found. Transformed. Released."
        description="Tracie hunts thrift stores for forgotten objects, transforms them into one-of-a-kind art, and films every step. Shop drops and watch episodes."
        path="/"
      />
      <SiteNav />
      <HeroBrutalist />
      <MarqueeBrutalist />
      <BeforeAfterSlider />
      <LatestTransformationBrutalist
        youtubeId="HO3PITWWsh0"
        title="Thrift 56 Launch"
        watchHref="https://youtu.be/HO3PITWWsh0"
      />
      <AvailableNowGrid />
      <AvailableNowGrid />
      <TraciesPicksStrip />
      <EmailCaptureBrutalist />
      <SiteFooter />
      <EmailPopup />
    </div>
  );
};

export default IndexV2;
