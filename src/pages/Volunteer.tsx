import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { HeartHandshake, Users, GraduationCap, CalendarHeart, Activity, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Volunteer = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="Volunteer | New Life Mwangaza Rehabilitation Centre"
                description="Join our dedicated team of volunteers and make a real difference in the lives of street-connected children."
                canonical="https://www.newlifemwangaza.org/volunteer"
            />
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Become a Volunteer</h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Your time and skills can transform a child's life. Join our community of passionate individuals dedicated to rescuing and rehabilitating street-connected children.
                    </p>
                </div>
            </section>

            {/* Opportunities Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Volunteer Opportunities</h2>
                        <p className="text-gray-600 text-lg">We welcome volunteers across various programs. Find where your skills can make the biggest impact.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Mentorship & Counseling",
                                description: "Provide guidance, emotional support, and serve as a positive role model for youth undergoing rehabilitation.",
                                icon: HeartHandshake,
                                color: "bg-blue-100 text-blue-600"
                            },
                            {
                                title: "Education & Tutoring",
                                description: "Assist with literacy, numeracy, and vocational skills training for children transitioning back to formal education.",
                                icon: GraduationCap,
                                color: "bg-green-100 text-green-600"
                            },
                            {
                                title: "Community Outreach",
                                description: "Help our team in the streets to identify children in need, distribute meals, and build trust.",
                                icon: Users,
                                color: "bg-yellow-100 text-yellow-600"
                            },
                            {
                                title: "Events & Fundraising",
                                description: "Support the planning and execution of awareness campaigns, charity runs, and community engagement events.",
                                icon: CalendarHeart,
                                color: "bg-purple-100 text-purple-600"
                            },
                            {
                                title: "Social Workers",
                                description: "Work directly with children and families to provide critical psychosocial support, case management, and rehabilitation care.",
                                icon: Activity,
                                color: "bg-red-100 text-red-600"
                            },
                            {
                                title: "Community Empowerment Officer",
                                description: "Lead initiatives that empower local families economically and socially, promoting sustainable community development and child welfare.",
                                icon: Sprout,
                                color: "bg-teal-100 text-teal-600"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex gap-6 hover:shadow-md transition-all duration-300">
                                <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-green/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900">Ready to Make an Impact?</h2>
                    <p className="text-lg text-gray-700">
                        Whether you can commit to a few hours a week or a full-time internship, we would love to have you on board.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/contact">
                            <Button size="lg" className="bg-green hover:bg-green/90 text-white px-8 py-6 text-lg rounded shadow-lg transition-all hover:scale-105">
                                Contact Us to Apply
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Volunteer;
