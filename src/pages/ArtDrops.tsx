import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DropsHero from "@/components/drops/DropsHero";
import DropsFilterBar from "@/components/drops/DropsFilterBar";
import DropsGrid from "@/components/drops/DropsGrid";
import DropsFeatured from "@/components/drops/DropsFeatured";
import DropsPreviousSold from "@/components/drops/DropsPreviousSold";
import DropsEmailCapture from "@/components/drops/DropsEmailCapture";

const ArtDrops = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <DropsHero />
      <DropsFilterBar filter={filter} onFilterChange={setFilter} />
      <DropsGrid filter={filter} />
      <DropsFeatured />
      <DropsPreviousSold />
      <DropsEmailCapture />
      <SiteFooter />
    </div>
  );
};

export default ArtDrops;
