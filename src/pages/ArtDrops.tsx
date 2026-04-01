import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DropsHero from "@/components/drops/DropsHero";
import DropsCurrentRelease from "@/components/drops/DropsCurrentRelease";
import DropsResurrected from "@/components/drops/DropsResurrected";
import DropsCurated from "@/components/drops/DropsCurated";
import DropsVault from "@/components/drops/DropsVault";
import DropsArchive from "@/components/drops/DropsArchive";
import DropsEmailCapture from "@/components/drops/DropsEmailCapture";

const ArtDrops = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <DropsHero />
      <DropsCurrentRelease />
      <DropsResurrected />
      <DropsCurated />
      <DropsVault />
      <DropsArchive />
      <DropsEmailCapture />
      <SiteFooter />
    </div>
  );
};

export default ArtDrops;
