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
  Phone,
  Mail,
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

const Donate = () => {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [amount, setAmount] = useState<number>(1000);
  const [customInput, setCustomInput] = useState<string>("");

  const presets = PRESET_AMOUNTS[frequency];

  // IntaSend payment gateway initialization
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
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handlePayPalDonate = () => {
    const usdAmount = Math.max(1, Math.round(amount / 130));
    toast.info("Opening PayPal secure checkout...");
    const paypalUrl = `https://www.paypal.com/donate?business=office@newlifemwangaza.org&item_name=Support+NLMRC+Rehabilitation+Centre&amount=${usdAmount}&currency_code=USD`;
    window.open(paypalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 flex flex-col">
      <SEO
        title="Donate | New Life Mwangaza Rehabilitation Centre"
        description="Support vulnerable street-connected children in Kenya with nutritious meals, safe shelter, education, and family reintegration."
        canonical="https://www.newlifemwangaza.org/donate"
      />
      <Navbar />

      {/* Main Container with generous clearance below fixed navbar */}
      <main className="flex-grow pt-24 lg:pt-44 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── Left Column: NGO Mission & Impact ─────────────────────── */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-green/10 text-green font-bold text-xs uppercase tracking-wider rounded-sm mb-4">
                  Accredited Non-Profit Centre • Kenya
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  Become a <span className="text-green">Friend of NLMRC</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Join our committed community of supporters transforming the
                  lives of street-connected boys in Katani, Machakos. Your gift
                  provides immediate rescue, holistic rehabilitation, and a second
                  chance at life.
                </p>
              </div>

              {/* 4 Clean Impact Points */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Daily Meals</h3>
                    <p className="text-xs text-slate-600 mt-0.5">3 warm, balanced meals daily for every child.</p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green/10 text-green flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Education</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Accelerated literacy, books, and vocational skills.</p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Safe Shelter</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Clean beds, medical care, and 24/7 safe haven.</p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Reintegration</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Counselling, family tracing, and reunification.</p>
                  </div>
                </div>
              </div>

              {/* Direct Inquiries & Transparency Box */}
              <div className="p-5 bg-white rounded-xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Direct Inquiries & In-Kind Donations</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To give directly via M-Pesa Paybill, bank wire, or drop off dry food, clothing, or books at our Katani centre, contact us:
                </p>
                <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700 pt-1">
                  <a href="tel:+254795822903" className="flex items-center gap-1.5 hover:text-green transition-colors">
                    <Phone className="w-4 h-4 text-orange" />
                    +254 795 822 903
                  </a>
                  <a href="mailto:office@newlifemwangaza.org" className="flex items-center gap-1.5 hover:text-green transition-colors">
                    <Mail className="w-4 h-4 text-orange" />
                    office@newlifemwangaza.org
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right Column: Simple NGO Donation Form ─────────────────── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
                
                {/* Header */}
                <div className="text-center pb-5 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Make a Donation</h2>
                  <p className="text-xs text-slate-500 mt-1">Secure payment via M-Pesa & Cards</p>
                </div>

                <div className="pt-6 space-y-5">
                  {/* Frequency: Monthly vs One-Time */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setFrequency("monthly");
                        setAmount(1000);
                        setCustomInput("");
                      }}
                      className={`py-2 px-3 rounded-md text-xs sm:text-sm font-bold transition-all ${
                        frequency === "monthly"
                          ? "bg-green text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Give Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFrequency("once");
                        setAmount(2500);
                        setCustomInput("");
                      }}
                      className={`py-2 px-3 rounded-md text-xs sm:text-sm font-bold transition-all ${
                        frequency === "once"
                          ? "bg-green text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      One-Time
                    </button>
                  </div>

                  {/* Preset Amount Grid */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Amount (KES)
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {presets.map((val) => {
                        const isSelected = amount === val && !customInput;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelectPreset(val)}
                            className={`py-3 px-4 rounded-xl border-2 font-black text-sm sm:text-base transition-all text-center ${
                              isSelected
                                ? "border-green bg-green/5 text-green shadow-sm"
                                : "border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            KES {val.toLocaleString()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Amount Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Or Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                        KES
                      </span>
                      <input
                        type="number"
                        value={customInput}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        placeholder="Other amount"
                        min="50"
                        className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-base focus:outline-none focus:border-green focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-3 pt-1">
                    {/* IntaSend M-Pesa & Card */}
                    <button
                      type="button"
                      className="intaSendPayButton w-full bg-orange hover:bg-orange/95 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-orange/20 transition-all text-base sm:text-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      data-amount={amount}
                      data-currency="KES"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                      Donate KES {amount.toLocaleString()} with M-Pesa / Card
                    </button>

                    {/* Or Divider */}
                    <div className="relative flex items-center justify-center my-1">
                      <div className="border-t border-slate-200 w-full" />
                      <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase">
                        or
                      </span>
                    </div>

                    {/* PayPal Option */}
                    <button
                      type="button"
                      onClick={handlePayPalDonate}
                      aria-label="Donate with PayPal"
                      className="w-full bg-[#ffc439] hover:bg-[#f4bb33] h-[52px] px-6 rounded-xl shadow-md transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 124 33"
                        className="h-7 w-auto select-none"
                        aria-hidden="true"
                      >
                        <path
                          fill="#253B80"
                          d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
                        />
                        <path
                          fill="#253B80"
                          d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
                        />
                        <path
                          fill="#253B80"
                          d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z"
                        />
                        <path
                          fill="#179BD7"
                          d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704C95.809,11.668,95.918,12.292,95.781,13.154z"
                        />
                        <path
                          fill="#179BD7"
                          d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
                        />
                        <path
                          fill="#179BD7"
                          d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
                        />
                        <path
                          fill="#253B80"
                          d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
                        />
                        <path
                          fill="#179BD7"
                          d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622C24.022,8.286,23.573,7.945,23.048,7.667z"
                        />
                        <path
                          fill="#222D65"
                          d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
                        />
                        <path
                          fill="#253B80"
                          d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791l1.454-9.225L9.614,7.699z"
                        />
                      </svg>
                    </button>
                  </div>

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
