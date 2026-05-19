import { Heart, Users, Shield, Scale, Briefcase } from "lucide-react";

const Values = () => {
    const values = [
        {
            icon: Heart,
            title: "Compassion",
            description: "Treating all clients with love, empathy, and dignity."
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Upholding honesty and trust in all dealings."
        },
        {
            icon: Briefcase,
            title: "Professionalism",
            description: "Delivering services in accordance with the highest standards and ethics."
        },
        {
            icon: Scale,
            title: "Non-discrimination",
            description: "Serving all beneficiaries impartially."
        },
        {
            icon: Users,
            title: "Teamwork",
            description: "Collaborating effectively across all stakeholders."
        }
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">
                        What Drives Us
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Our Core Values
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-muted/30 rounded-xl p-8 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-lg"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Values;
