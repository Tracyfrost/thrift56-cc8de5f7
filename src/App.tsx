import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Episodes from "./pages/Episodes.tsx";
import EpisodeDetail from "./pages/EpisodeDetail.tsx";
import Livestream from "./pages/Livestream.tsx";
import ArtDrops from "./pages/ArtDrops.tsx";
import ArtPieceDetail from "./pages/ArtPieceDetail.tsx";
import AdminDrops from "./pages/AdminDrops.tsx";
import Community from "./pages/Community.tsx";
import NotFound from "./pages/NotFound.tsx";
import ReturnVisitBanner from "./components/ReturnVisitBanner.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:slug" element={<EpisodeDetail />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/drops" element={<ArtDrops />} />
          <Route path="/drops/:slug" element={<ArtPieceDetail />} />
          <Route path="/admin/drops" element={<AdminDrops />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
