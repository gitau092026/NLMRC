import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Clock, Briefcase, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "@/integrations/supabase/hooks/useJobs";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

const CareerPage = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const activeJobs = jobs?.filter(job => job.is_active) || [];

  const filteredJobs = activeJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    return matchesSearch && matchesCategory && matchesType && matchesLocation;
  });

  const categories = ["all", ...Array.from(new Set(activeJobs.map((job) => job.category)))];
  const types = ["all", ...Array.from(new Set(activeJobs.map((job) => job.type)))];
  const locations = ["all", ...Array.from(new Set(activeJobs.map((job) => job.location)))];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Careers & Volunteer Jobs in Kenya | NLMRC - Teaching Jobs, Paid Volunteer Opportunities"
        description="Join New Life Mwangaza Rehabilitation Center (NLMRC). Find volunteer jobs in Kenya, paid volunteer opportunities, teaching jobs, part-time jobs, and NGO positions in Nairobi, Machakos, Kajiado, and Kiambu. Make a difference in rehabilitation and community empowerment."
        keywords="volunteer jobs in kenya, paid volunteer jobs in kenya, teaching jobs kenya, teacher jobs in kenya, nlmrc jobs, volunteer opportunities in kenya, ngo volunteer jobs in kenya, teaching job vacancies, part time jobs kenya, teaching vacancies in private schools in kenya, paid volunteer jobs in kenya for students, ngo teaching jobs, volunteer teacher jobs, english teacher jobs in kenya, life skills teacher jobs, rehabilitation center jobs, ngo jobs nairobi, part time teaching jobs in kenya, volunteer programs in kenya, teaching opportunities in kenya, education jobs kenya"
        canonical="https://www.newlifemwangaza.org/career"
      />
      <Navbar />

      {/* Search and Filters */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Job Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Job Category" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Job Type" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Job Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Job Location" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="pb-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="group hover:shadow-2xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 bg-card border-2 cursor-pointer"
                    onClick={() => navigate(`/career/${slugify(job.title)}`)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                          {job.title}
                        </CardTitle>
                        <Badge variant="outline" className="shrink-0 border-accent text-accent font-semibold">
                          {job.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{job.type}</span>
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {job.description}
                      </p>

                      <div className="pt-4 border-t">
                        <Button variant="green" className="w-full group">
                          View Details & Apply
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-2">
                <CardContent className="p-12 text-center">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-lg text-muted-foreground font-medium">
                    No active job openings found matching your criteria.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later or adjust your filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerPage;
