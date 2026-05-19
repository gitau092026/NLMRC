import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Flag } from "lucide-react";
import missionBg from "@/assets/about-planting.jpg"; 

const Mission = () => {
    return (
        <section
            className="py-16 md:py-24 relative overflow-hidden"
            style={{
                backgroundImage: `url(${missionBg})`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark transparent overlay so background photo shows through */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Decorative dot pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />



            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 bg-[hsl(var(--orange))]/20 text-[hsl(var(--orange))] border border-[hsl(var(--orange))]/40 rounded-full text-sm font-semibold tracking-wide mb-4 uppercase backdrop-blur-sm">
                        Our Mission &amp; Vision
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                        We&apos;re Building Strong Reputation
                    </h2>
                    <p className="text-lg text-white/75">
                        Dedicated to transforming the lives of street-connected children and youth through comprehensive care and community empowerment.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {/* Mission */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-[hsl(var(--orange))]/50 transition-all duration-300 group shadow-xl">
                        <div className="w-16 h-16 bg-[hsl(var(--orange))]/20 border border-[hsl(var(--orange))]/40 rounded-2xl flex items-center justify-center mb-8 text-[hsl(var(--orange))] group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-white/80 leading-relaxed">
                            To prevent children and youth from living and working on the streets and to rescue, rehabilitate, and reintegrate street-connected children and youth through holistic, family- and community-centred approaches to child protection.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-[hsl(var(--orange))]/50 transition-all duration-300 group shadow-xl">
                        <div className="w-16 h-16 bg-[hsl(var(--orange))]/20 border border-[hsl(var(--orange))]/40 rounded-2xl flex items-center justify-center mb-8 text-[hsl(var(--orange))] group-hover:scale-110 transition-transform duration-300">
                            <Eye className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-white/80 leading-relaxed">
                            A society where street-connected children and youth live in a family setup, leading useful and drug-free lives.
                        </p>
                    </div>

                    {/* Goal */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-[hsl(var(--orange))]/50 transition-all duration-300 group md:col-span-2 lg:col-span-1 shadow-xl">
                        <div className="w-16 h-16 bg-[hsl(var(--orange))]/20 border border-[hsl(var(--orange))]/40 rounded-2xl flex items-center justify-center mb-8 text-[hsl(var(--orange))] group-hover:scale-110 transition-transform duration-300">
                            <Flag className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Goal</h3>
                        <div className="text-white/80 leading-relaxed space-y-4">
                            <p>
                                Our primary goal is to rescue, rehabilitate, and reintegrate street-connected children annually. We aim to provide them with quality education, vocational skills, and psychosocial support to ensure self-reliance.
                            </p>
                            <p>
                                Additionally, we seek to empower families and communities through capacity building and economic support to prevent the recurrence of children ending up on the streets.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Volunteer Banner */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto border border-white/20">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white space-y-4 max-w-xl text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow">
                                Become A Proud <br className="hidden md:block" /> Volunteer Now
                            </h3>
                            <p className="text-white/85 text-lg md:text-xl">
                                Join us in making a difference. Your time and skills can help transform lives.
                            </p>
                        </div>
                        <Link to="/contact">
                            <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/20">
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
