import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { FileText } from "lucide-react";

const Resources = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="Resources & Addiction Recovery Guides | New Life Mwangaza Rehabilitation Centre"
                description="Access free addiction recovery guides, drug abuse prevention materials, family coping resources, and rehabilitation insights from New Life Mwangaza in Kenya."
                canonical="https://www.newlifemwangaza.org/resources"
                keywords="addiction therapy center, drug abuse in kenya, free rehabilitation, alcohol therapy near me, addiction rehabilitation center, detox program, addiction places"
            />
            <Navbar />
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground py-20">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    No resources available at the moment.
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Resources;
