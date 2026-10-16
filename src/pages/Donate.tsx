import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import {
  Heart,
  Utensils,
  GraduationCap,
  Home,
  ShieldCheck,
} from "lucide-react";

declare global {
  interface Window {
    IntaSend: any;
  }
}

type Frequency = "monthly" | "once";

const PRESET_AMOUNTS: Record<Frequency, number[]> = {
  monthly: [500, 1000, 2500, 5000],
  once: [1000, 2500, 5000, 10000],
};

const IMPACT_ITEMS = [
  {
    icon: Utensils,
    color: "bg-orange/10 text-orange",
    title: "Daily Meals",
    desc: "3 warm, balanced meals every day for every child in our care.",
  },
  {
    icon: GraduationCap,
    color: "bg-green/10 text-green",
    title: "Education",
    desc: "Accelerated literacy programmes, textbooks, and vocational skills.",
  },
  {
    icon: Home,
    color: "bg-amber-500/10 text-amber-700",
    title: "Safe Shelter",
    desc: "Clean dormitories, medical care, and a 24/7 secure environment.",
  },
  {
    icon: Heart,
    color: "bg-emerald-500/10 text-emerald-700",
    title: "Reintegration",
    desc: "Psychosocial counselling, family tracing, and reunification.",
  },
];

const donateSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  name: "Donate to New Life Mwangaza Rehabilitation Centre",
  description:
    "Support street-connected boys aged 14–17 in Katani, Machakos County, Kenya with meals, shelter, education, and family reintegration.",
  recipient: {
    "@type": "NGO",
    name: "New Life Mwangaza Rehabilitation Centre",
    url: "https://www.newlifemwangaza.org",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Katani",
      addressRegion: "Machakos County",
      addressCountry: "KE",
    },
  },
};

const Donate = () => {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [amount, setAmount] = useState<number>(1000);
  const [customInput, setCustomInput] = useState<string>("");

  const presets = PRESET_AMOUNTS[frequency];

  useEffect(() => {
    const initIntaSend = () => {
      if (typeof window !== "undefined" && window.IntaSend) {
        try {
          new window.IntaSend({
            publicAPIKey:
              import.meta.env.VITE_INTASEND_PUBLIC_KEY || "ISPubKey_live_...",
            live: false,
          })
            .on("COMPLETE", (results: any) => {
              console.log("Success", results);
              toast.success("Thank you for your generous donation!");
            })
            .on("FAILED", (results: any) => {
              console.log("Failed", results);
              toast.error("Donation cancelled or failed. Please try again.");
            })
            .on("IN-PROGRESS", (results: any) =>
              console.log("Payment in progress", results)
            );
          return true;
        } catch (err) {
          console.error("IntaSend init error:", err);
        }
      }
      return false;
    };

    if (!initIntaSend()) {
      const timer = setInterval(() => {
        if (initIntaSend()) clearInterval(timer);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [amount]);

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomInput("");
  };

  const handleCustomChange = (val: string) => {
    setCustomInput(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) setAmount(num);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 flex flex-col">
      <SEO
        title="Donate to NLMRC | Support Street Boys in Kenya"
        description="Your donation to New Life Mwangaza Rehabilitation Centre funds meals, safe shelter, education, and family reintegration for street-connected boys aged 14–17 in Katani, Machakos, Kenya."
        keywords="donate Kenya NGO, support street children Kenya, Machakos charity, rehabilitation centre donation, M-Pesa NGO donation, NLMRC"
        canonical="https://www.newlifemwangaza.org/donate"
        ogType="website"
        schema={donateSchema}
      />
      <Navbar />

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-grow pt-24 lg:pt-44 py-12 lg:py-20" id="main-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* ── Left Column ──────────────────────────────────────────────── */}
            <div className="lg:col-span-7 space-y-10">

              {/* What Your Gift Provides */}
              <section aria-labelledby="impact-heading">
                <h2
                  id="impact-heading"
                  className="text-xl font-black text-slate-900 mb-1"
                >
                  What Your Gift Provides
                </h2>
                <p className="text-sm text-slate-500 mb-5">
                  100% of online donations fund direct programme delivery.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {IMPACT_ITEMS.map(({ icon: Icon, color, title, desc }) => (
                    <div
                      key={title}
                      className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* ── Right Column: Donation Form ──────────────────────────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-[164px]">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">

                {/* Card header */}
                <div className="bg-green px-6 py-5 text-center">
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Make a Donation
                  </h2>
                </div>

                <div className="p-6 sm:p-8 space-y-6">

                  {/* Frequency toggle */}
                  <fieldset>
                    <legend className="sr-only">Donation frequency</legend>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                      {(["monthly", "once"] as Frequency[]).map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          aria-pressed={frequency === freq}
                          onClick={() => {
                            setFrequency(freq);
                            setAmount(freq === "monthly" ? 1000 : 2500);
                            setCustomInput("");
                          }}
                          className={`py-2.5 px-3 rounded-md text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green ${
                            frequency === freq
                              ? "bg-green text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {freq === "monthly" ? "Give Monthly" : "One-Time"}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Preset amounts */}
                  <div>
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Amount (KES)
                    </p>
                    <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Preset donation amounts">
                      {presets.map((val) => {
                        const isSelected = amount === val && !customInput;
                        return (
                          <button
                            key={val}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => handleSelectPreset(val)}
                            className={`py-3 px-4 rounded-xl border-2 font-black text-sm sm:text-base transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green ${
                              isSelected
                                ? "border-green bg-green/5 text-green shadow-sm"
                                : "border-slate-200 text-slate-700 hover:border-green/40"
                            }`}
                          >
                            KES {val.toLocaleString()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom amount */}
                  <div>
                    <label
                      htmlFor="custom-amount"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                    >
                      Or Enter Custom Amount
                    </label>
                    <div className="relative">
                      <span
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm"
                        aria-hidden="true"
                      >
                        KES
                      </span>
                      <input
                        id="custom-amount"
                        type="number"
                        value={customInput}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        placeholder="Any amount"
                        min="50"
                        className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-base focus:outline-none focus:border-green focus:ring-2 focus:ring-green/20 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Donate button */}
                  <button
                    type="button"
                    className="intaSendPayButton w-full bg-orange hover:bg-orange/90 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-orange/20 transition-all text-base sm:text-lg flex items-center justify-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange cursor-pointer"
                    data-amount={amount}
                    data-currency="KES"
                    aria-label={`Donate KES ${amount.toLocaleString()} ${frequency === "monthly" ? "monthly" : "one time"}`}
                  >
                    <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
                    Donate
                  </button>

                  {/* Security note */}
                  <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green shrink-0" aria-hidden="true" />
                    Secured by IntaSend · SSL encrypted
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
