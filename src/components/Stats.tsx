import { HandHeart, Users, FolderHeart } from "lucide-react";

const Stats = () => {
    const stats = [
        { icon: HandHeart, value: "2,500+", label: "RESCUED" },
        { icon: Users, value: "1,000+", label: "STREET VISITS" },
        { icon: FolderHeart, value: "1,000+", label: "REFERRED" },
    ];

    return (
        <section className="py-10 md:py-14 relative bg-[#2a2a2a] text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/80 z-0" />
            {/* Use a simple dark background for now as we don't have the specific image */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <span className="inline-block px-3 py-1 bg-[hsl(var(--orange))]/20 text-[hsl(var(--orange))] border border-[hsl(var(--orange))]/40 rounded-full text-xs md:text-sm font-semibold tracking-wide mb-3 uppercase backdrop-blur-sm">
                        Real Results
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                        Our Impact in Numbers
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-8 text-center">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="space-y-1 group">
                                <div className="flex justify-center mb-1 md:mb-2">
                                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-[hsl(var(--orange))] opacity-80 group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-[hsl(var(--orange))] font-medium uppercase tracking-wider text-[10px] sm:text-xs md:text-sm leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;
