import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResources } from "@/integrations/supabase/hooks/useResources";

const Resources = () => {
    const { data: resources, isLoading } = useResources();
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Resources List */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="text-center py-20 text-muted-foreground">Loading resources...</div>
                        ) : resources?.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">No resources available at the moment.</div>
                        ) : (
                            resources?.map((resource) => (
                                <div key={resource.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{resource.title}</h3>
                                            <p className="text-sm text-gray-500">{resource.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Preview
                                            </a>
                                        </Button>
                                        <Button size="sm" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90" asChild>
                                            <a href={resource.file_url} download>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Resources;
