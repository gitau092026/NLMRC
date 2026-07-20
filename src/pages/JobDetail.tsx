import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/integrations/supabase/hooks/useJobs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Clock, Briefcase, ArrowLeft, Calendar, Loader2 } from "lucide-react";

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const JobDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: jobs, isLoading, error } = useJobs();
    const job = jobs?.find(j => slugify(j.title) === slug || j.id === slug);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold ">Job Not Found</h1>
                    <p className="text-muted-foreground mb-8">The job posting you are looking for does not exist or has been removed.</p>
                    <Button onClick={() => navigate("/career")}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const jobSchema = job ? {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "identifier": {
            "@type": "PropertyValue",
            "name": "NLMRC",
            "value": job.id
        },
        "datePosted": job.created_at,
        "employmentType": job.type === "Full-time" ? "FULL_TIME" : job.type === "Part-time" ? "PART_TIME" : job.type === "Volunteer" ? "VOLUNTEER" : job.type === "Contract" ? "CONTRACT" : "OTHER",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "New Life Mwangaza Rehabilitation Centre",
            "sameAs": "https://www.newlifemwangaza.org"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location,
                "addressCountry": "KE"
            }
        }
    } : undefined;

    const canonicalUrl = job ? `https://www.newlifemwangaza.org/career/${slugify(job.title)}` : undefined;
    const seoKeywords = job ? `${job.title}, ${job.category}, jobs in ${job.location}, career at NLMRC, New Life Mwangaza Rehabilitation Centre jobs, NGO jobs in Kenya` : "jobs, career, NLMRC";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO 
                title={`${job.title} - Career | NLMRC`} 
                description={job.description ? job.description.substring(0, 150) + "..." : "Join our team at New Life Mwangaza Rehabilitation Centre."}
                schema={jobSchema}
                keywords={seoKeywords}
                canonical={canonicalUrl}
            />
            <Navbar />

            <main className="flex-1 pt-16 pb-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button variant="ghost" onClick={() => navigate("/career")} className="mb-8 hover:bg-transparent hover:text-primary pl-0">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold text-foreground ">{job.title}</h1>
                                <div className="flex flex-wrap gap-4 text-muted-foreground">
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {job.type}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        Posted {new Date(job.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none dark:prose-invert">
                                <h3 className="text-2xl font-semibold ">Description</h3>
                                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                    {job.description}
                                </p>
                            </div>

                            {job.requirements && (
                                <div className="prose max-w-none dark:prose-invert">
                                    <h3 className="text-2xl font-semibold ">Requirements</h3>
                                    <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                        {job.requirements}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 border-2">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Job Overview</h3>

                                        <div className="flex items-start gap-3">
                                            <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Department</p>
                                                <p className="text-sm text-muted-foreground">{job.department}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-muted-foreground">{job.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Employment Type</p>
                                                <p className="text-sm text-muted-foreground">{job.type}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full text-lg py-6" size="lg">
                                                Apply for this Job
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>How to Apply</DialogTitle>
                                                <DialogDescription>
                                                    Interested in this role? We'd love to hear from you!
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <p>Please send your <strong>CV</strong> and <strong>Cover Letter</strong> to:</p>
                                                <a href="mailto:director.mwangazarc@gmail.com" className="text-primary text-lg font-semibold hover:underline block">
                                                    director.mwangazarc@gmail.com
                                                </a>
                                                <p className="text-sm text-muted-foreground">
                                                    Use the subject line: <span className="font-mono bg-muted px-1 rounded">Application: {job.title}</span>
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <p className="text-xs text-center text-muted-foreground">
                                        Please include your CV and Cover Letter in your application.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default JobDetail;
