
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VotingDashboard from "./pages/dashboard";
import CastVotePage from "./pages/cast-vote";
import ResultsPage from "./pages/results";
import AdminDashboard from "./pages/admin";
import AdminProposals from "./pages/admin/proposals";
import AdminUsers from "./pages/admin/users";
import AdminAnalytics from "./pages/admin/analytics";
import AdminSettings from "./pages/admin/settings";
import AdminEmergency from "./pages/admin/emergency";
import UserProfile from "./pages/profile";
import FAQPage from "./pages/help";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<VotingDashboard />} />
            <Route path="/cast-vote" element={<CastVotePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/proposals" element={<AdminProposals />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/emergency" element={<AdminEmergency />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/help" element={<FAQPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
