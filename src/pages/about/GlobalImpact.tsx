import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe } from "lucide-react";
import { useGlobalImpact } from "@/integrations/supabase/hooks/useGlobalImpact";

const GlobalImpact = () => {
    const { data: impacts, isLoading } = useGlobalImpact();
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Impact Stats */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="text-center py-20 text-muted-foreground">Loading impact data...</div>
                    ) : impacts?.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">No impact data available yet.</div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
                            {impacts?.map((impact) => (
                                <div key={impact.id} className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
                                    {impact.image_url ? (
                                        <img loading="lazy" src={impact.image_url} alt={impact.country} className="w-16 h-16 rounded-full object-cover " />
                                    ) : (
                                        <Globe className="w-12 h-12 text-[hsl(var(--orange))] mx-auto " />
                                    )}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{impact.country}</h3>
                                    <h4 className="text-4xl font-bold text-[hsl(var(--orange))] mb-2">{impact.stats}</h4>
                                    <p className="text-gray-600">{impact.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-primary/5 rounded-3xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Partnering for Change</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We work with international organizations, governments, and NGOs to share best practices, influence policy, and secure resources for child protection initiatives.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GlobalImpact;
