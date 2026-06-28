import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { Heart, GraduationCap, Utensils, Home } from "lucide-react";

declare global {
  interface Window {
    IntaSend: any;
  }
}

const Donate = () => {
    const [amount, setAmount] = useState(1000);

    useEffect(() => {
        if (window.IntaSend) {
            new window.IntaSend({
                publicAPIKey: import.meta.env.VITE_INTASEND_PUBLIC_KEY,
                live: false // Test environment
            })
            .on("COMPLETE", (results: any) => {
                console.log("Success", results);
                toast.success("Donation successful! Thank you for your incredible support.");
            })
            .on("FAILED", (results: any) => {
                console.log("Failed", results);
                toast.error("Donation failed or was cancelled.");
            })
            .on("IN-PROGRESS", (results: any) => console.log("Payment in progress status", results));
        }
    }, []);

    const donationTiers = [
        { label: "🥉 Bronze", range: "Ksh.100 - 300", amount: 200 },
        { label: "🥈 Silver", range: "Ksh.400 - 500", amount: 500 },
        { label: "🥇 Gold", range: "Ksh.600 - 700", amount: 700 },
        { label: "💎 Platinum", range: "Ksh.800 - 900", amount: 900 },
        { label: "👑 Diamond", range: "Ksh.1000+", amount: 1000 }
    ];

    return (
        <div className="min-h-screen font-sans text-gray-800 flex flex-col">
            <SEO
                title="Donate | New Life Mwangaza Rehabilitation Centre"
                description="Your donation supports the rescue, rehabilitation, and reintegration of street-connected children."
                canonical="https://www.newlifemwangaza.org/donate"
            />
            <Navbar />

            {/* Hero Section with Split Layout */}
            <main className="flex-grow bg-slate-50 relative pt-6 pb-12 lg:pt-20 lg:pb-24">
                
                {/* Background Pattern / Decor */}
                <div className="absolute inset-0 bg-[hsl(var(--primary))]/5 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-x-12 gap-y-6 lg:gap-y-12 items-start relative z-10">
                    
                    <div className="contents lg:block lg:space-y-16 w-full">
                        {/* 1. Title & Intro */}
                        <div className="order-1 lg:order-none text-center lg:text-left">
                            <h1 className="text-[1.35rem] sm:text-3xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-3 lg:mb-8 whitespace-nowrap lg:whitespace-normal">
                                <span className="text-[#111827]">Become a </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[#475569] lg:to-[#f8fafc]">Friend of NLMRC</span>
                            </h1>
                            <p className="hidden md:block text-[1.35rem] text-[#475569] leading-relaxed max-w-lg font-normal">
                                New Life Mwangaza Rehabilitation Center (NLMRC) invites YOU to join a committed team of Friends of NLMRC — by giving monthly support to transform the lives of street-connected children.
                            </p>
                        </div>

                        {/* 3. Icon Grid (Moved below form on mobile) */}
                        <div className="order-3 lg:order-none w-full pt-8 lg:pt-0">
                            <h2 className="text-2xl font-bold text-[#0f172a] mb-8">How your donation supports the program</h2>
                            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                <div className="flex flex-col space-y-4">
                                    <div className="w-16 h-16 bg-[hsl(var(--orange))]/10 rounded-full flex items-center justify-center text-[hsl(var(--orange))]">
                                        <Utensils size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0f172a] mb-1">Nutrition</h3>
                                        <p className="text-[#64748b] text-[1.05rem]">Providing daily healthy meals.</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-4">
                                    <div className="w-16 h-16 flex items-center justify-start text-[hsl(var(--primary))]">
                                        <GraduationCap size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0f172a] mb-1">Education</h3>
                                        <p className="text-[#64748b] text-[1.05rem]">School fees & vocational skills.</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-4">
                                    <div className="w-16 h-16 bg-[hsl(var(--accent))]/10 rounded-full flex items-center justify-center text-[hsl(var(--accent))]">
                                        <Home size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0f172a] mb-1">Shelter</h3>
                                        <p className="text-[#64748b] text-[1.05rem]">A safe place off the streets.</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-4">
                                    <div className="w-16 h-16 bg-[hsl(var(--green))]/10 rounded-full flex items-center justify-center text-[hsl(var(--green))]">
                                        <Heart size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0f172a] mb-1">Care</h3>
                                        <p className="text-[#64748b] text-[1.05rem]">Medical and psychological support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Donation Card */}
                    <div className="order-2 lg:order-none relative w-full">
                        {/* Decorative image behind the card for modern feel */}
                        <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--orange))] opacity-20 blur-2xl rounded-3xl" />
                        
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative z-10">
                            
                            {/* Card Body */}
                            <div className="p-5 md:p-8 lg:p-12">
                                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 lg:mb-8 text-center">Secure Donation</h3>
                                
                                <div className="space-y-4 lg:space-y-8">
                                    <div>
                                        <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2 lg:mb-3 text-center">
                                            Choose your monthly support level:
                                        </label>
                                        <div className="grid grid-cols-1 gap-2 lg:gap-3 mb-4">
                                            {donationTiers.map(tier => (
                                                <button 
                                                    key={tier.label}
                                                    onClick={() => setAmount(tier.amount)}
                                                    className={`px-3 py-2 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl text-[0.8rem] lg:text-sm font-bold border-2 transition-all flex justify-between items-center ${
                                                        amount === tier.amount 
                                                        ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-md transform scale-[1.02]' 
                                                        : 'bg-white text-gray-700 border-gray-200 hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/5'
                                                    }`}
                                                >
                                                    <span>{tier.label}</span>
                                                    <span className={amount === tier.amount ? 'text-white/80' : 'text-gray-500'}>{tier.range}</span>
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">KES</span>
                                            <input 
                                                type="number" 
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                className="w-full pl-12 pr-3 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] outline-none transition font-semibold text-base lg:text-lg text-gray-900"
                                                placeholder="Custom Amount"
                                                min="10"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        className="intaSendPayButton w-full bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white font-bold py-3 lg:py-4 rounded-lg lg:rounded-xl transition-all shadow-lg shadow-[hsl(var(--orange))]/30 flex items-center justify-center gap-2 text-base lg:text-lg transform hover:-translate-y-0.5"
                                        data-amount={amount}
                                        data-currency="KES"
                                    >
                                        <Heart fill="currentColor" size={20} className="text-white/80" />
                                        Donate KES {amount.toLocaleString()}
                                    </button>

                                    <p className="text-[10px] lg:text-xs text-center text-gray-400 mt-2 flex justify-center items-center gap-1">
                                        <span className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-500 inline-block animate-pulse"></span>
                                        Secure Payments via IntaSend
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Donate;
