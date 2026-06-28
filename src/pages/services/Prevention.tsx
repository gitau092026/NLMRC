import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Heart, Baby, Users, Wallet, Megaphone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import parentEmpowered from "@/assets/IMG_20240925_171410_201.webp";
import caregiversCapacity from "@/assets/IMG_20251028_130558_922.webp";

const Prevention = () => {
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
                                    Proactive Intervention
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We believe that the most effective way to address the issue of street-connected children is to prevent them from ending up on the streets in the first place. Our prevention strategies focus on empowering families and communities to create a nurturing environment for children.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "Caregiver Capacity",
                                        text: "Training and support to improve the ability of guardians to care for children.",
                                        icon: Heart
                                    },
                                    {
                                        title: "Parenting Skills",
                                        text: "Workshops on positive parenting and child development.",
                                        icon: Baby
                                    },
                                    {
                                        title: "Economic Welfare",
                                        text: "Economic empowerment programs to improve household stability.",
                                        icon: Wallet
                                    },
                                    {
                                        title: "Community Engagement",
                                        text: "Mobilizing local communities to protect their children.",
                                        icon: Users
                                    },
                                    {
                                        title: "Girl's Empowerment",
                                        text: "Specific programs for vulnerable teenage girls and young mothers.",
                                        icon: Lock
                                    },
                                    {
                                        title: "Advocacy",
                                        text: "Promoting children's rights and welfare at all levels.",
                                        icon: Megaphone
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--orange))]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="w-6 h-6 text-[hsl(var(--orange))]" />
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
                                    <img loading="lazy"
                                        src={caregiversCapacity}
                                        alt="Caregivers Capacity Building"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white font-medium">Caregivers Capacity Building</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 group relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img loading="lazy"
                                        src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=1000&auto=format&fit=crop"
                                        alt="Children playing safely"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 mt-12 border border-primary/10">
                                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 ">
                                            Strengthen a Family Today
                                        </h3>
                                        <p className="text-gray-600 mb-0">
                                            Your support helps us keep families together and children off the streets.
                                        </p>
                                    </div>
                                    <Link to="/contact">
                                        <Button size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8">
                                            Support Prevention
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
                                <img loading="lazy"
                                    src={parentEmpowered}
                                    alt="Parent empowered economically"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <p className="text-white text-xl font-bold">
                                        Parent empowered economically with a grocery kiosk
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

export default Prevention;
