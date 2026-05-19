import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useTeamMembers } from "@/integrations/supabase/hooks/useTeamMembers";

const OurTeam = () => {
    const { data: team, isLoading } = useTeamMembers();

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />



            {/* Team Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {team?.map((member) => (
                                <div key={member.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex items-start gap-6">
                                    {/* Circular Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden relative">
                                            {member.image_url ? (
                                                <img
                                                    src={member.image_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                                                    No Photo
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-[hsl(var(--orange))] text-sm font-medium mb-3">{member.position}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurTeam;
