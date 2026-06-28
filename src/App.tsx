import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import WhatsAppChat from "./components/WhatsAppChat";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

// Lazy load all page components
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Impact = lazy(() => import("./pages/Impact"));
const Career = lazy(() => import("./pages/Career"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Reports = lazy(() => import("./pages/Reports"));
const Newsletters = lazy(() => import("./pages/Newsletters"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Rescue = lazy(() => import("./pages/services/Rescue"));
const Rehabilitation = lazy(() => import("./pages/services/Rehabilitation"));
const Reintegration = lazy(() => import("./pages/services/Reintegration"));
const Prevention = lazy(() => import("./pages/services/Prevention"));
const CommunityEmpowerment = lazy(() => import("./pages/services/CommunityEmpowerment"));

const OurStory = lazy(() => import("./pages/about/OurStory"));
const OurTeam = lazy(() => import("./pages/about/OurTeam"));
const Resources = lazy(() => import("./pages/Resources"));
const GlobalImpact = lazy(() => import("./pages/about/GlobalImpact"));
const Donate = lazy(() => import("./pages/Donate"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Login = lazy(() => import("./pages/Login"));

// Admin Pages (Massive JS bundles, desperately need lazy loading)
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const StoriesAdmin = lazy(() => import("./pages/admin/StoriesAdmin"));
const EventsAdmin = lazy(() => import("./pages/admin/EventsAdmin"));
const TeamAdmin = lazy(() => import("./pages/admin/TeamAdmin"));
const GalleryAdmin = lazy(() => import("./pages/admin/GalleryAdmin"));
const HRAdmin = lazy(() => import("./pages/admin/HRAdmin"));
const ResourcesAdmin = lazy(() => import("./pages/admin/ResourcesAdmin"));
const GlobalImpactAdmin = lazy(() => import("./pages/admin/GlobalImpactAdmin"));
const NewslettersAdmin = lazy(() => import("./pages/admin/NewslettersAdmin"));
const ReportsAdmin = lazy(() => import("./pages/admin/ReportsAdmin"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const HeroAdmin = lazy(() => import("./pages/admin/HeroAdmin"));
const ImpactReportAdmin = lazy(() => import("./pages/admin/ImpactReportAdmin"));
const AlumniAdmin = lazy(() => import("./pages/admin/AlumniAdmin"));

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--primary))]" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <CookieConsent />
        <WhatsAppChat />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<Navigate to="/about/story" replace />} />
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />

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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
