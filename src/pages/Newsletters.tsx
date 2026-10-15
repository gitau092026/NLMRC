import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Newsletters = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Newsletters & Community Updates | NLMRC Kenya"
                description="Subscribe to the New Life Mwangaza Rehabilitation Centre newsletter for monthly updates on youth rehabilitation, graduation ceremonies, and community outreach in Kenya."
                keywords="nlmrc newsletter, street children rehabilitation updates, youth recovery newsletter kenya"
                canonical="https://www.newlifemwangaza.org/impact/newsletters"
            />
            <Navbar />

            {/* Newsletters List */}
            <section className="py-16 md:py-20 bg-background flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
