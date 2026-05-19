import { HandHeart, Users, FolderHeart } from "lucide-react";

const Stats = () => {
    const stats = [
        { icon: HandHeart, value: "2,500+", label: "RESCUED" },
        { icon: Users, value: "1,000+", label: "STREET VISITS" },
        { icon: FolderHeart, value: "1,000+", label: "REFERRED" },
    ];

    return (
        <section className="py-20 relative bg-[#2a2a2a] text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/80 z-0" />
            {/* Use a simple dark background for now as we don't have the specific image */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="space-y-2 group">
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-10 h-10 text-[hsl(var(--orange))] opacity-80 group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-[hsl(var(--orange))] font-medium uppercase tracking-wider text-sm">
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
