import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Rescue = () => {
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
                                    Our Rescue Approach
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our rescue efforts are the first crucial step in our commitment to transforming the lives of street-connected children and youth in Nairobi, Machakos, Kiambu, and Kajiado. We actively reach out to individuals living and working on the streets through a structured and compassionate process.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Street Visits",
                                        text: "Regular outreach to identify and build trust with children in need."
                                    },
                                    {
                                        title: "Mapping",
                                        text: "Identifying locations and understanding the dynamics of street populations."
                                    },
                                    {
                                        title: "Collaboration",
                                        text: "Working with existing actors, networks, and authorities for coordinated action."
                                    },
                                    {
                                        title: "Preparation",
                                        text: "Psychological and physical preparation of clients for the rescue process."
                                    },
                                    {
                                        title: "Recruitment",
                                        text: "Through interviews and assessment to understand individual needs."
                                    },
                                    {
                                        title: "Linkage",
                                        text: "Connecting children with appropriate care centers and medical facilities."
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--orange))]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <div className="w-2 h-2 rounded-full bg-[hsl(var(--orange))]" />
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
                                        src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop"
                                        alt="Safe shelter environment"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop"
                                        alt="Counseling and support"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 mt-12 border border-primary/10">
                                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 ">
                                            Every child deserves a safe home
                                        </h3>
                                        <p className="text-gray-600 mb-0">
                                            Help us rescue more children from the dangers of street life. Your support makes our outreach possible.
                                        </p>
                                    </div>
                                    <Link to="/contact">
                                        <Button size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8">
                                            Support Rescue Mission
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
                                    src="https://images.unsplash.com/photo-1739506314315-c7aff0d98d55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Rescue Mission"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="flex items-center gap-2 text-white/80 mb-2">
                                        <Heart className="w-4 h-4 fill-[hsl(var(--orange))] text-[hsl(var(--orange))]" />
                                        <span className="text-sm font-medium">Impact Story</span>
                                    </div>
                                    <p className="text-white font-medium italic border-l-2 border-[hsl(var(--orange))] pl-4">
                                        "I never thought I would leave the streets, but they found me and gave me a reason to hope again."
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

export default Rescue;
