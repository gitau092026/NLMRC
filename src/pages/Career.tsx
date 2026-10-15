import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getJobs, Job } from "@/lib/adminData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JOB_TYPES = ["All", "Full-time", "Volunteer", "Part-time", "Internship"];

const CareerPage = () => {
  const [jobs] = useState<Job[]>(() => getJobs());
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const activeJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchStatus = j.status === "active";
      const matchType =
        selectedType === "All" ||
        j.type.toLowerCase().includes(selectedType.toLowerCase());
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchType && matchSearch;
    });
  }, [jobs, selectedType, searchQuery]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground flex flex-col">
      <SEO
        title="Education Jobs & English Teaching Vacancies in Kenya | NLMRC Careers"
        description="Explore current education jobs, English teaching jobs in Kenya, and community work vacancies at NLMRC. Part-time, full-time, and teaching opportunities in Katani, Machakos near Nairobi."
        keywords="education jobs, education jobs in kenya, education jobs kenya, english teaching jobs in kenya, english teacher jobs, english teaching jobs, english teaching jobs kenya, english teacher jobs in kenya, available teaching jobs, available teaching vacancies, available part time jobs near me, career opportunities for teachers, community work jobs, current job vacancies, english teacher job vacancies, does it have vacancies"
        canonical="https://www.newlifemwangaza.org/career"
      />
      <Navbar />

      {/* ─── Job Listings Section ───────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-border/60">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedType === type
                      ? "bg-[hsl(var(--orange))] text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search openings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-full bg-card"
              />
            </div>
          </div>

          {/* Job Cards */}
          {activeJobs.length > 0 ? (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 text-xs">
                        Active Opening
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

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      <Link to={`/career/${job.slug}`}>{job.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        Deadline: <strong className="text-foreground">{job.deadline}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Button
                      asChild
                      className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white font-semibold text-xs h-10 px-5"
                    >
                      <Link to={`/career/${job.slug}`}>
                        View Details & Apply
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border max-w-lg mx-auto">
              <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">No current openings</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are no active openings matching your filters right now. You can still reach out to enquire or volunteer!
              </p>
              <Button asChild className="mt-4 bg-[hsl(var(--green))] text-white" size="sm">
                <Link to="/volunteer">Apply as General Volunteer</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Speculative Applications Callout ───────────────────────────────── */}
      <section className="py-16 bg-muted/40 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Don't see an exact match?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We are always happy to hear from qualified counsellors, social workers, and passionate volunteers who share our vision of transforming vulnerable children's lives.
          </p>
          <div className="pt-2">
            <a
              href="mailto:office@newlifemwangaza.org?subject=General%20Career%20or%20Volunteer%20Inquiry"
              className="inline-flex items-center gap-2 bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
            >
              Email General Inquiry
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerPage;
