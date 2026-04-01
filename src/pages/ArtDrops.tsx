import { useState, useRef, useCallback } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = useCallback((value: string) => {
    setIsTransitioning(true);
    // Brief fade-out, swap filter, fade-in, scroll to filter bar
    setTimeout(() => {
      setStatusFilter(value);
      setIsTransitioning(false);
      filterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />
      <DropsHero />
      <div ref={filterRef}>
        <DropsStatusFilter active={statusFilter} onChange={handleFilterChange} />
      </div>
      <div
        className={`transition-all duration-200 ease-out ${
          isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <DropsCurrentRelease statusFilter={statusFilter} />
        <DropsResurrected statusFilter={statusFilter} />
        <DropsCurated statusFilter={statusFilter} />
        <DropsVault statusFilter={statusFilter} />
        <DropsArchive statusFilter={statusFilter} />
      </div>
      <DropsEmailCapture />
      <SiteFooter />
    </div>
  );
};

export default ArtDrops;
