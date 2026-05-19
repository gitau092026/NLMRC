import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Brain, Home, Leaf, BookOpen, HeartPulse, UserPlus, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import familyTherapy from "@/assets/IMG_20251111_145011_837.webp";
import spiritualCare from "@/assets/IMG_20251205_123203_760@128432812.webp";
import clientHomeVisit from "@/assets/IMG_20251015_124252_441.webp";

const Rehabilitation = () => {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background font-sans">
                <Navbar />

                {/* Main Content */}
                <section className="py-12 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">

                            {/* Content Column */}
                            <div className="flex-1 space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Comprehensive Rehabilitation
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Our residential rehabilitation program provides a unique and holistic approach to the recovery and transformation of street-connected boys aged 14-18 years. Located in a serene environment in Katani, Machakos County, our program utilizes a therapeutic community model where clients and staff live together as a 'mini community'. The 6-month program is based on a 12-step approach and includes:
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    {[
                                        {
                                            title: "Continuous Assessments",
                                            text: "Regular evaluation of progress and needs throughout the program.",
                                            icon: Star
                                        },
                                        {
                                            title: "Group Therapy",
                                            text: "Peer support and shared healing experiences in a safe environment.",
                                            icon: Users
                                        },
                                        {
                                            title: "One-on-One Counseling",
                                            text: "Individual therapeutic sessions addressing personal challenges.",
                                            icon: Brain
                                        },
                                        {
                                            title: "Literacy and Numeracy Learning",
                                            text: "Educational support to bridge learning gaps and build foundations.",
                                            icon: BookOpen
                                        },
                                        {
                                            title: "Home Visits",
                                            text: "Reconnecting with families and preparing for eventual reunification.",
                                            icon: Home
                                        },
                                        {
                                            title: "Reintegration Planning",
                                            text: "Developing personalized plans for successful return to community.",
                                            icon: UserPlus
                                        },
                                        {
                                            title: "Aftercare Support",
                                            text: "Continued guidance and monitoring after program completion.",
                                            icon: HeartPulse
                                        },
                                        {
                                            title: "Natural Detoxification",
                                            text: "Medical support for safe substance withdrawal and recovery.",
                                            icon: Leaf
                                        },
                                        {
                                            title: "Spiritual Care",
                                            text: "Nurturing spiritual growth as part of holistic healing.",
                                            icon: Leaf
                                        },
                                        {
                                            title: "Family Therapy",
                                            text: "Counseling for both children and families to rebuild relationships.",
                                            icon: Users
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                            <div className="w-12 h-12 rounded-xl bg-[hsl(var(--orange))]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <item.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Images Grid */}
                                <div className="grid sm:grid-cols-2 gap-6 mt-12">
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                        <img
                                            src={spiritualCare}
                                            alt="Spiritual Care"
                                            loading="eager"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white font-medium">Spiritual Care</p>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                        <img
                                            src={clientHomeVisit}
                                            alt="Client Home Visit"
                                            loading="eager"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white font-medium">Client Home Visit</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 mt-12 border border-primary/10">
                                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 ">
                                                Sponsor a Child's Recovery
                                            </h3>
                                            <p className="text-gray-600 mb-0">
                                                Your contribution provides food, shelter, therapy, and education for a recovering child.
                                            </p>
                                        </div>
                                        <Link to="/contact">
                                            <Button size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8">
                                                Donate Today
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Image Column */}
                            <div className="w-full lg:w-[400px] space-y-8 sticky top-32">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    <img
                                        src={familyTherapy}
                                        alt="Family Therapy"
                                        loading="eager"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                        <div className="flex items-center gap-2 text-white/80 mb-2">
                                            <Users className="w-4 h-4 text-[hsl(var(--orange))]" />
                                            <span className="text-sm font-medium">Therapeutic Focus</span>
                                        </div>
                                        <p className="text-white text-2xl font-bold">
                                            Family Therapy
                                        </p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </PageTransition>
    );
};

export default Rehabilitation;
