import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroBrutalist from "@/components/v2/HeroBrutalist";
import MarqueeBrutalist from "@/components/v2/MarqueeBrutalist";
import BeforeAfterSlider from "@/components/v2/BeforeAfterSlider";
import LatestTransformationBrutalist from "@/components/v2/LatestTransformationBrutalist";
import AvailableNowGrid from "@/components/v2/AvailableNowGrid";
import EmailCaptureBrutalist from "@/components/v2/EmailCaptureBrutalist";

const IndexV2 = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <HeroBrutalist />
      <MarqueeBrutalist />
      <BeforeAfterSlider />
      <LatestTransformationBrutalist />
      <AvailableNowGrid />
      <EmailCaptureBrutalist />
      <SiteFooter />
    </div>
  );
};

export default IndexV2;
