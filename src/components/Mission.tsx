import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Flag } from "lucide-react";

const Mission = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative subtle background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--orange))]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />



            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))] border border-[hsl(var(--orange))]/20 rounded-full text-sm font-bold tracking-wider mb-4 uppercase">
                        Our Mission &amp; Vision
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Building a Stronger <span className="text-green">Community</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Dedicated to transforming the lives of street-connected children and youth through comprehensive care, rehabilitation, and community empowerment.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {/* Mission */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-[hsl(var(--orange))]/30 hover:shadow-2xl transition-all duration-500 group shadow-lg">
                        <div className="w-16 h-16 bg-[hsl(var(--orange))]/10 rounded-2xl flex items-center justify-center mb-8 text-[hsl(var(--orange))] group-hover:scale-110 group-hover:bg-[hsl(var(--orange))] group-hover:text-white transition-all duration-300">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To prevent children and youth from living and working on the streets and to rescue, rehabilitate, and reintegrate street-connected children through holistic, family-centred approaches.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-green/30 hover:shadow-2xl transition-all duration-500 group shadow-lg">
                        <div className="w-16 h-16 bg-green/10 rounded-2xl flex items-center justify-center mb-8 text-green group-hover:scale-110 group-hover:bg-green group-hover:text-white transition-all duration-300">
                            <Eye className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A society where street-connected children and youth live in a family setup, leading useful, healthy, and drug-free lives full of opportunities.
                        </p>
                    </div>

                    {/* Goal */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-[hsl(var(--orange))]/30 hover:shadow-2xl transition-all duration-500 group md:col-span-2 lg:col-span-1 shadow-lg">
                        <div className="w-16 h-16 bg-[hsl(var(--orange))]/10 rounded-2xl flex items-center justify-center mb-8 text-[hsl(var(--orange))] group-hover:scale-110 group-hover:bg-[hsl(var(--orange))] group-hover:text-white transition-all duration-300">
                            <Flag className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Goal</h3>
                        <div className="text-gray-600 leading-relaxed space-y-4">
                            <p>
                                Our primary goal is to rescue, rehabilitate, and reintegrate children annually. We aim to provide them with quality education, vocational skills, and support to ensure self-reliance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Volunteer Banner */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto bg-green">
                    {/* Decorative pattern for the banner */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)", backgroundSize: "32px 32px" }} />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    
                    <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white space-y-4 max-w-xl text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                                Become A Proud <br className="hidden md:block" /> Volunteer Today
                            </h3>
                            <p className="text-white/80 text-lg">
                                Join us in making a difference. Your time, skills, and compassion can help transform lives.
                            </p>
                        </div>
                        <Link to="/contact">
                            <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none">
                                Join Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
