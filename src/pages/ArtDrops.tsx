import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DropsHero from "@/components/drops/DropsHero";
import DropsStatusFilter from "@/components/drops/DropsStatusFilter";
import DropsCurrentRelease from "@/components/drops/DropsCurrentRelease";
import DropsResurrected from "@/components/drops/DropsResurrected";
import DropsCurated from "@/components/drops/DropsCurated";
import DropsVault from "@/components/drops/DropsVault";
import DropsArchive from "@/components/drops/DropsArchive";
import DropsEmailCapture from "@/components/drops/DropsEmailCapture";

const ArtDrops = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <DropsHero />
      <DropsStatusFilter active={statusFilter} onChange={setStatusFilter} />
      <DropsCurrentRelease statusFilter={statusFilter} />
      <DropsResurrected statusFilter={statusFilter} />
      <DropsCurated statusFilter={statusFilter} />
      <DropsVault statusFilter={statusFilter} />
      <DropsArchive statusFilter={statusFilter} />
      <DropsEmailCapture />
      <SiteFooter />
    </div>
  );
};

export default ArtDrops;
