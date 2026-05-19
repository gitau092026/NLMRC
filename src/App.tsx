import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";

import Impact from "./pages/Impact";
import Career from "./pages/Career";
import JobDetail from "./pages/JobDetail";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import Newsletters from "./pages/Newsletters";
import NotFound from "./pages/NotFound";
import Rescue from "./pages/services/Rescue";
import Rehabilitation from "./pages/services/Rehabilitation";
import Reintegration from "./pages/services/Reintegration";
import Prevention from "./pages/services/Prevention";
import CommunityEmpowerment from "./pages/services/CommunityEmpowerment";

import OurStory from "./pages/about/OurStory";
import OurHistory from "./pages/about/OurHistory";
import OurTeam from "./pages/about/OurTeam";
import Resources from "./pages/Resources";
import GlobalImpact from "./pages/about/GlobalImpact";
import Donate from "./pages/Donate";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import StoriesAdmin from "./pages/admin/StoriesAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import HRAdmin from "./pages/admin/HRAdmin";
import ResourcesAdmin from "./pages/admin/ResourcesAdmin";
import GlobalImpactAdmin from "./pages/admin/GlobalImpactAdmin";
import NewslettersAdmin from "./pages/admin/NewslettersAdmin";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import HeroAdmin from "./pages/admin/HeroAdmin";
import ImpactReportAdmin from "./pages/admin/ImpactReportAdmin";
import AlumniAdmin from "./pages/admin/AlumniAdmin";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import CookieConsent from "./components/CookieConsent";
import WhatsAppChat from "./components/WhatsAppChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <CookieConsent />
        <WhatsAppChat />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Navigate to="/about/history" replace />} />
          <Route path="/about/history" element={<OurHistory />} />
          <Route path="/about/reports" element={<Reports />} />
          <Route path="/about/story" element={<OurStory />} />
          <Route path="/about/team" element={<OurTeam />} />
          <Route path="/about/global-impact" element={<GlobalImpact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/rescue" element={<Rescue />} />
          <Route path="/services/rehabilitation" element={<Rehabilitation />} />
          <Route path="/services/reintegration" element={<Reintegration />} />
          <Route path="/services/prevention" element={<Prevention />} />
          <Route path="/services/community-empowerment" element={<CommunityEmpowerment />} />

          <Route path="/impact" element={<Impact />} />
          <Route path="/impact/reports" element={<Reports />} />
          <Route path="/impact/newsletters" element={<Newsletters />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:id" element={<JobDetail />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="stories" element={<StoriesAdmin />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="hr" element={<HRAdmin />} />
              <Route path="resources" element={<ResourcesAdmin />} />
              <Route path="global-impact" element={<GlobalImpactAdmin />} />
              <Route path="newsletters" element={<NewslettersAdmin />} />
              <Route path="reports" element={<ReportsAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
              <Route path="hero" element={<HeroAdmin />} />
              <Route path="impact-report" element={<ImpactReportAdmin />} />
              <Route path="alumni" element={<AlumniAdmin />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
