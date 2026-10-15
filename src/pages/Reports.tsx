import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Reports = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Impact Reports & Financial Transparency | NLMRC Kenya"
                description="View annual reports, financial transparency statements, and impact evaluations of New Life Mwangaza Rehabilitation Centre in Kenya."
                keywords="nlmrc impact reports, rehabilitation centres in kenya reports, street children impact evaluation, ngo transparency kenya"
                canonical="https://www.newlifemwangaza.org/about/reports"
            />
            <Navbar />

            {/* Reports List */}
            <section className="py-16 md:py-20 bg-background flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green/10 mb-8">
                            <FileText className="w-12 h-12 text-green" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Reports Coming Soon
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            We're currently updating our reports archive.
                        </p>
                        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12">
                            <h3 className="text-xl font-semibold ">
                                Transparency &amp; Accountability
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                We are committed to transparency. Our annual reports, financial statements,
                                and program evaluations will be available here.
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-20 bg-secondary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold ">
                            Need More Information?
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            If you require additional reports or have specific questions about our work,
                            please don't hesitate to contact us.
                        </p>
                        <a href="/contact">
                            <Button variant="default" size="lg" className="bg-green hover:bg-green/90">
                                Contact Us
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Reports;
