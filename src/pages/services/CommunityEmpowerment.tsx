import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Users, Globe, Handshake, TrendingUp, Mic, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityTraining from "@/assets/community-training.webp";

const CommunityEmpowerment = () => {
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
                                    Sustainable Community Impact
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    True sustainability comes from within the community. We work tirelessly to build the capacity of local stakeholders, empowering them to take ownership of their development and create safety nets that prevent children from resorting to street life.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Capacity Building",
                                        text: "Training for community structures and local leaders on child protection.",
                                        icon: Users
                                    },
                                    {
                                        title: "Advocacy",
                                        text: "Influencing policy and practice at local and county levels.",
                                        icon: Mic
                                    },
                                    {
                                        title: "Economic Groups",
                                        text: "Supporting Village Savings and Loan Associations (VSLA) for economic resilience.",
                                        icon: TrendingUp
                                    },
                                    {
                                        title: "Child Protection",
                                        text: "Establishing and strengthening community-based Child Protection Committees.",
                                        icon: Handshake
                                    },
                                    {
                                        title: "Leadership",
                                        text: "Youth mentorship and leadership programs to nurture the next generation.",
                                        icon: School
                                    },
                                    {
                                        title: "Dialogues",
                                        text: "Facilitating community dialogues and sensitization on children's rights.",
                                        icon: Globe
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
                                        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop"
                                        alt="Skills training workshop"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        src={communityTraining}
                                        alt="Community training session"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white font-medium">Community Training Session</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 mt-12 border border-primary/10">
                                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 ">
                                            Join the Movement
                                        </h3>
                                        <p className="text-gray-600 mb-0">
                                            Your partnership helps us empower entire communities to protect their children.
                                        </p>
                                    </div>
                                    <Link to="/contact">
                                        <Button size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8">
                                            Partner With Us
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
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                                    alt="Community Meeting"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="flex items-center gap-2 text-white/80 mb-2">
                                        <Globe className="w-4 h-4 text-[hsl(var(--orange))]" />
                                        <span className="text-sm font-medium">Vision</span>
                                    </div>
                                    <p className="text-white font-medium italic border-l-2 border-[hsl(var(--orange))] pl-4">
                                        "An empowered community is a safe haven for every child."
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

export default CommunityEmpowerment;
