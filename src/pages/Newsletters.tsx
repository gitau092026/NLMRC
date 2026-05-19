import { Mail, FileText } from "lucide-react";
import { useNewsletters } from "@/integrations/supabase/hooks/useNewsletters";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Newsletters = () => {
    const { data: newsletters, isLoading } = useNewsletters();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Newsletters List */}
            <section className="py-16 md:py-20 bg-background flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="text-center py-20 text-muted-foreground">Loading newsletters...</div>
                    ) : newsletters?.length === 0 ? (
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[hsl(var(--orange))]/10 mb-8">
                                <FileText className="w-12 h-12 text-[hsl(var(--orange))]" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Newsletters Coming Soon
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                We're currently updating our newsletter archive.
                                Check back soon for the latest updates.
                            </p>
                            <div className="bg-secondary/20 rounded-2xl p-8 md:p-12">
                                <h3 className="text-xl font-semibold ">
                                    Stay Connected
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    In the meantime, you can subscribe to receive our newsletters directly to your inbox.
                                </p>
                                <a href="/contact">
                                    <Button variant="default" size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90">
                                        Subscribe Now
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsletters?.map((newsletter) => (
                                <div key={newsletter.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all p-6 flex flex-col">
                                    <div className="flex items-start justify-between ">
                                        <div className="p-3 bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))] rounded-xl">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm text-gray-400">{newsletter.date_str}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{newsletter.title}</h3>
                                    <p className="text-gray-500 mb-6 flex-grow">{newsletter.description}</p>
                                    <Button asChild className="w-full bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90">
                                        <a href={newsletter.file_url} target="_blank" rel="noopener noreferrer">
                                            Read Newsletter
                                        </a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="mt-20 bg-secondary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold ">
                            Looking for More Information?
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Visit our Reports page for detailed annual reports, financial statements,
                            and comprehensive program evaluations.
                        </p>
                        <a href="/impact/reports">
                            <Button variant="outline" size="lg">
                                View Reports
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Newsletters;
