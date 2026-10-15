import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  CheckCircle2,
  Mail,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getJobBySlug, getJobs } from "@/lib/adminData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const job = useMemo(() => {
    if (!slug) return undefined;
    return getJobBySlug(slug) || getJobs().find((j) => j.id === slug);
  }, [slug]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-4">
          <Badge variant="outline" className="text-destructive border-destructive/30">
            404 Not Found
          </Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Position Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The job posting you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate("/career")} className="bg-[hsl(var(--green))] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse responsibilities and requirements from line-separated strings
  const responsibilitiesList = job.responsibilities
    ? job.responsibilities.split("\n").filter((r) => r.trim().length > 0)
    : [];

  const requirementsList = job.requirements
    ? job.requirements.split("\n").filter((r) => r.trim().length > 0)
    : [];

  const mailtoSubject = encodeURIComponent(`Application: ${job.title} - [Your Name]`);
  const mailtoBody = encodeURIComponent(
    `Dear NLMRC Recruitment Team,\n\nI am writing to express my interest in the position of "${job.title}" (Ref: /career/${job.slug}).\n\nPlease find attached my updated Curriculum Vitae and Cover Letter for your consideration.\n\nSincerely,\n[Your Name]\n[Your Phone Number]`
  );
  const applicationMailto = `mailto:office@newlifemwangaza.org?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground flex flex-col">
      <SEO
        title={`${job.title} - Education & Teaching Jobs in Kenya | NLMRC`}
        description={`${job.title} vacancy at NLMRC in Katani, Kenya. ${job.description.slice(0, 120)}... Apply now.`}
        keywords={`${job.title}, education jobs kenya, english teaching jobs in kenya, teaching jobs near me, current job vacancies, nlmrc careers, ${job.department}`}
        canonical={`https://www.newlifemwangaza.org/career/${job.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": job.title,
          "description": job.description,
          "datePosted": "2026-01-01",
          "employmentType": job.type === "Full-time" ? "FULL_TIME" : job.type === "Part-time" ? "PART_TIME" : "VOLUNTEER",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "New Life Mwangaza Rehabilitation Centre",
            "sameAs": "https://www.newlifemwangaza.org"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Katani Road",
              "addressLocality": job.location || "Katani, Machakos",
              "addressCountry": "KE"
            }
          }
        }}
      />
      <Navbar />

      {/* ─── Breadcrumb Bar ─────────────────────────────────────────────────── */}
      <div className="bg-muted/40 border-b border-border/50 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/career" className="hover:text-foreground">
            Careers
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] text-foreground font-medium">
            {job.title}
          </span>
        </div>
      </div>

      {/* ─── Job Content ────────────────────────────────────────────────────── */}
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/career")}
            className="text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to All Positions
          </Button>

          {/* Job Header Card */}
          <div className="bg-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`text-xs ${
                  job.status === "active"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {job.status === "active" ? "Accepting Applications" : "Position Closed"}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {job.type}
              </Badge>
              {job.department && (
                <span className="text-xs text-muted-foreground font-medium">
                  {job.department}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
              {job.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/60 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="font-semibold text-foreground">Deadline</p>
                  <p>{job.deadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="font-semibold text-foreground">Employment Type</p>
                  <p>{job.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Overview */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Role Overview</h2>
            <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {responsibilitiesList.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Key Responsibilities & Duties</h2>
              <ul className="space-y-2.5">
                {responsibilitiesList.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {requirementsList.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Required Qualifications & Skills</h2>
              <ul className="space-y-2.5">
                {requirementsList.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Apply Box */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-zinc-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-700" />
              How to Apply
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {job.howToApply ||
                "Interested candidates who meet the above criteria should submit their Cover Letter and detailed CV including names and contacts of 3 referees to office@newlifemwangaza.org."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={applicationMailto}
                className="inline-flex items-center gap-2 bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                Submit Application via Email
              </a>
              <span className="text-xs text-muted-foreground">
                Email: <strong className="text-foreground">office@newlifemwangaza.org</strong>
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetailPage;
