import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Heart, HandHeart, School, Users } from "lucide-react";
import mpesaPaybill from "@/assets/mpesa-paybill.webp";

const Donate = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="Donate | New Life Mwangaza Rehabilitation Centre"
                description="Your donation supports the rescue, rehabilitation, and reintegration of street-connected children."
                canonical="https://www.newlifemwangaza.org/donate"
            />
            <Navbar />

            {/* Combined Section: Impact & Payment Sidebar */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">

                        {/* Main Content: How Donation is Used */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How Your Donation is Used</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We ensure transparency and efficiency. Your funds are directly allocated to our core programs to maximize impact. Every shilling goes towards changing a life.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Rescue Operations",
                                        description: "Street outreach, emergency transport, initial medical checkups, and temporary shelter.",
                                        icon: HandHeart,
                                        color: "bg-blue-100 text-blue-600"
                                    },
                                    {
                                        title: "Rehabilitation",
                                        description: "Food, full-time shelter, psychosocial counseling, medical care, and clothing.",
                                        icon: Heart,
                                        color: "bg-green-100 text-green-600"
                                    },
                                    {
                                        title: "Education & Skills",
                                        description: "School fees, uniforms, vocational training materials, and learning resources.",
                                        icon: School,
                                        color: "bg-yellow-100 text-yellow-600"
                                    },
                                    {
                                        title: "Family Prevention",
                                        description: "Economic empowerment for families, reintegration follow-ups, and community awareness.",
                                        icon: Users,
                                        color: "bg-purple-100 text-purple-600"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center gap-4">
                                        <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar: Payment Methods */}
                        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-8">
                            <div className="bg-white p-6 rounded-3xl shadow-xl border border-[hsl(var(--orange))]/20">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">Make a Donation</h3>
                                    <p className="text-gray-500 text-sm mt-1">Simple. Fast. Secure.</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-center transform hover:scale-[1.02] transition-transform duration-300">
                                    <img loading="lazy"
                                        src={mpesaPaybill}
                                        alt="LIPA NA M-PESA: Paybill 400200, Account 58992"
                                        className="w-full h-auto rounded-xl shadow-sm "
                                    />

                                    <div className="text-left space-y-2 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-100">
                                        <p className="font-bold text-gray-900 mb-2">Instructions:</p>
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Go to <span className="font-semibold text-[hsl(var(--orange))]">M-PESA Menu</span></li>
                                            <li>Select <span className="font-semibold">Lipa na M-PESA</span></li>
                                            <li>Select <span className="font-semibold">Paybill</span></li>
                                            <li>Business No: <span className="font-mono font-bold">400200</span></li>
                                            <li>Account No: <span className="font-mono font-bold">58992</span></li>
                                            <li>Enter Amount & PIN</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="mt-8 text-center pt-8 border-t border-gray-100">
                                    <p className="text-gray-600 text-sm mb-2">Need help?</p>
                                    <a href="mailto:office@newlifemwangaza.org" className="text-primary font-bold hover:underline text-sm">
                                        office@newlifemwangaza.org
                                    </a>
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

export default Donate;
