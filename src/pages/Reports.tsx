import { FileText } from "lucide-react";
import { useReports } from "@/integrations/supabase/hooks/useReports";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Reports = () => {
    const { data: reports, isLoading } = useReports();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Reports List */}
            <section className="py-16 md:py-20 bg-background flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="text-center py-20 text-muted-foreground">Loading reports...</div>
                    ) : reports?.length === 0 ? (
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
                                    Transparency & Accountability
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    We are committed to transparency. Our annual reports, financial statements,
                                    and program evaluations will be available here.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reports?.map((report) => (
                                <div key={report.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all p-6 flex flex-col">
                                    <div className="flex items-start justify-between ">
                                        <div className="p-3 bg-green/10 text-green rounded-xl">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm text-gray-400">{report.year}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                                    <p className="text-gray-500 mb-6 flex-grow">{report.description}</p>
                                    <Button asChild variant="outline" className="w-full">
                                        <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                                            View Report
                                        </a>
                                    </Button>
                                    <Button asChild className="w-full mt-2 bg-green hover:bg-green/90">
                                        <a href={report.file_url} download>
                                            Download PDF
                                        </a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

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
