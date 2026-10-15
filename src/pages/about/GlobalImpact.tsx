import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const GlobalImpact = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="Global Partnerships & Child Protection Impact | NLMRC Kenya"
                description="Collaborating with global partners, international NGOs, and governments to advance child rights, addiction rehabilitation, and street youth empowerment in Kenya."
                keywords="global child protection, international partners street children kenya, nlmrc global impact, unicef kenya partners"
                canonical="https://www.newlifemwangaza.org/about/global-impact"
            />
            <Navbar />
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20 text-muted-foreground">No impact data available yet.</div>
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
