import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";
import EpisodeHero from "@/components/episodes/EpisodeHero";
import EpisodeCategoryFilter from "@/components/episodes/EpisodeCategoryFilter";
import EpisodeGrid from "@/components/episodes/EpisodeGrid";
import EpisodeBingeReel from "@/components/episodes/EpisodeBingeReel";
import EpisodeStorySteps from "@/components/episodes/EpisodeStorySteps";
import EpisodeCtaBreak from "@/components/episodes/EpisodeCtaBreak";

const EpisodesPage = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <Seo title="Episodes — Every Thrift 56 Transformation" description="Watch every Thrift 56 transformation. Forgotten thrift store finds restored on camera, from discovery to final reveal." path="/episodes" />
      <EpisodeHero />
      <div className="container">
        <EpisodeCategoryFilter filter={filter} onFilterChange={setFilter} />
        <EpisodeGrid filter={filter} />
      </div>
      <EpisodeBingeReel />
      <EpisodeStorySteps />
      <EpisodeCtaBreak />
      <SiteFooter />
    </div>
  );
};

export default EpisodesPage;
