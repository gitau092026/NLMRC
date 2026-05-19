import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, GraduationCap, Home, HeartHandshake, Wrench, Users, LineChart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import reintegrationSuccess from "@/assets/20230725_153032.webp";
import educationSupport from "@/assets/20230828_145422.webp";
import teamBuilding from "@/assets/IMG_20250822_113410_394.webp";

const Reintegration = () => {
    return (
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
                                    A Path to Independence
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Reintegration is a crucial phase where former street-connected children and youth are supported to return to their families and communities and build sustainable futures. Our reintegration services focus on empowering individuals to become self-reliant and contributing members of society.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Family Reunification",
                                        text: "Reconnecting children with their families through mediation and support.",
                                        icon: Home
                                    },
                                    {
                                        title: "Learning Institutions",
                                        text: "Placement and support in schools and educational programs.",
                                        icon: GraduationCap
                                    },
                                    {
                                        title: "Vocational Training",
                                        text: "Placement in skills training centers for practical career development.",
                                        icon: Wrench
                                    },
                                    {
                                        title: "Apprenticeship",
                                        text: "Opportunities to learn trades through hands-on experience.",
                                        icon: Briefcase
                                    },
                                    {
                                        title: "Sponsorship Support",
                                        text: "Financial assistance for education and skills development.",
                                        icon: HeartHandshake
                                    },
                                    {
                                        title: "Job Placement",
                                        text: "Assistance in finding sustainable employment opportunities.",
                                        icon: Briefcase
                                    },
                                    {
                                        title: "Trade Tools",
                                        text: "Provision of equipment and tools to start businesses or trades.",
                                        icon: Wrench
                                    },
                                    {
                                        title: "Psychosocial Follow-up",
                                        text: "Continuous support and monitoring to ensure long-term stability.",
                                        icon: LineChart
                                    },
                                    {
                                        title: "Relapse Mitigation",
                                        text: "Strategies and support to prevent return to street life.",
                                        icon: ShieldCheck
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
                                        src={educationSupport}
                                        alt="Education and learning"
                                        loading="eager"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white font-medium">Alumni on Training</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        src={teamBuilding}
                                        alt="Young people working together"
                                        loading="eager"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white font-medium">Alumni Team Building</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 mt-12 border border-primary/10">
                                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 ">
                                            Partner in Their Success
                                        </h3>
                                        <p className="text-gray-600 mb-0">
                                            Help provide a starter kit for a young person starting a business or school fees for a returning student.
                                        </p>
                                    </div>
                                    <Link to="/contact">
                                        <Button size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8">
                                            Support Reintegration
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
                                    src={reintegrationSuccess}
                                    alt="Reintegration Success"
                                    loading="eager"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="flex items-center gap-2 text-white/80 mb-2">
                                        <Users className="w-4 h-4 text-[hsl(var(--orange))]" />
                                        <span className="text-sm font-medium">Community Economic Training</span>
                                    </div>
                                    <p className="text-white font-medium italic border-l-2 border-[hsl(var(--orange))] pl-4">
                                        "With my own tools and training, I can now support myself and help my family."
                                    </p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Reintegration;
