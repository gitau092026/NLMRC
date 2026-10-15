import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Clock, ChevronRight, Heart, Phone, Mail, FileText, Target } from "lucide-react";
import rescueImg1 from "@/assets/RESUE1.jpg";
import rescueImg2 from "@/assets/RESCUE2.jpg";
import rescueImg3 from "@/assets/RESCUE3.jpg";

// ─── Data from NLMRC Strategic Plan 2022-2027 ───────────────────────────────

const steps = [
  {
    num: "01",
    title: "Street Visits & Outreach",
    desc: "Our social workers conduct regular, systematic visits to known street locations across Nairobi, Machakos, Kiambu, and Kajiado. The first visits are purely about presence and visibility - no pressure, no promises, only consistency. We build familiarity over weeks or months before any formal recruitment begins.",
  },
  {
    num: "02",
    title: "Mapping & Client Identification",
    desc: "We develop a database of areas with potential clients. Through careful observation and community engagement we map street populations, identify boys aged 14–18 with drug and substance abuse challenges, and document individual circumstances to match each child with the right level of care.",
  },
  {
    num: "03",
    title: "Relationship Building",
    desc: "Trust is the foundation of rescue. Our workers share information about the rehabilitation programme openly - its daily schedule, rules, duration, and what life at the Centre looks like - and address fears honestly. Alumni who have been through the programme are often involved at this stage as peer advocates.",
  },
  {
    num: "04",
    title: "Client Preparation",
    desc: "Before any admission, each willing client is psychologically prepared. We explain what rehabilitation involves, explore family situations, and initiate home tracing where applicable. Families and caregivers are engaged from this early stage to lay the groundwork for eventual reintegration.",
  },
  {
    num: "05",
    title: "Recruitment Interview & Assessment",
    desc: "Prospective clients undergo a structured recruitment interview based on set criteria. We assess readiness, substance use history, family background, and individual needs. From this assessment, a preliminary Individual Treatment Plan (ITP) is developed before admission.",
  },
  {
    num: "06",
    title: "Legal Documentation & Court Committals",
    desc: "In line with Kenya's Children's Act, all children residing in transition centres require court committals. We work closely with the Department of Children Services (DCS) to obtain OB numbers, referral letters, and formal legal documentation - ensuring every admission is legally sound and rights-compliant.",
  },
  {
    num: "07",
    title: "Linkage, Referral & Admission",
    desc: "After thorough medical and psychological screening, clients are admitted to NLMRC's residential programme or referred to partner service providers if they exhibit high-level or severe symptoms requiring specialist intervention. Inward and outward referral pathways are maintained with a network of collaborating actors.",
  },
  {
    num: "08",
    title: "Collaboration with Existing Actors & Networks",
    desc: "We do not work alone. NLMRC collaborates with the Department of Children Services, local administration, churches, Nyumba Kumi initiatives, NGO peers, and community leaders - coordinating referrals, sharing information, and avoiding duplication to ensure every child reaches the best available support.",
  },
];

const kpis = [
  { label: "Target rescues (2022–2027)", value: "420" },
  { label: "Counties of operation",       value: "4" },
  { label: "Age group targeted",          value: "14–18 yrs" },
  { label: "Rehabilitation capacity/yr",  value: "64 boys" },
];

const criteria = [
  "Male, aged 14–18 years",
  "Living or working on the streets",
  "Affected by drug and substance abuse",
  "Willing to undergo rehabilitation",
  "From Nairobi, Machakos, Kiambu, or Kajiado",
  "Able to obtain legal documentation (OB number / court committal)",
];

const otherProgrammes = [
  { label: "Rehabilitation",       href: "/services/rehabilitation" },
  { label: "Reintegration",        href: "/services/reintegration" },
  { label: "Prevention",           href: "/services/prevention" },
  { label: "Community Empowerment",href: "/services/community-empowerment" },
];

const Rescue = () => {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <SEO
        title="Street Children Rescue & Emergency Care in Kenya | NLMRC Programmes"
        description="Frontline street children rescue, drug abuse intervention, and emergency medical care across Nairobi, Machakos, Kiambu, and Kajiado by New Life Mwangaza Rehabilitation Centre."
        keywords="drug abuse in kenya, drug abuse rehab near me, street children rescue kenya, addiction centre near me, child rescue machakos, child protection nairobi, emergency street outreach"
        canonical="https://www.newlifemwangaza.org/services/rescue"
      />
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-[340px] overflow-hidden bg-green">
        <img
          src={rescueImg1}
          alt="NLMRC social worker on street outreach"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green via-green/80 to-green/40" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-white transition-colors">Programmes</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Rescue</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-[0.2em]">Programme 01 of 05</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Rescue - Finding Children<br className="hidden md:block" /> Before the Streets Claim Them
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            The first step in NLMRC's P&3R model - patient, relationship-based outreach across four counties of Kenya.
          </p>
        </div>
      </div>

      {/* ── Page body ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-16 items-start">

          {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-16">

            {/* ── Overview ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Overview</h2>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-5">
                Rescue is the first and most critical phase of NLMRC's Prevention, Rescue, Rehabilitation &amp; Reintegration (P&amp;3R) model - the nationally recognised framework guided by Kenya's National Policy on Rehabilitation of Street Families. Before any rehabilitation can begin, a child must first be found, trusted, and willing to come.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                NLMRC's rescue process is built on patient, consistent relationship-building with street-connected boys aged 14–18 across <strong className="text-foreground">Nairobi, Machakos, Kiambu, and Kajiado</strong>. It is never coercive, always child-led. A single rescue can take weeks or months of outreach before a boy agrees to enter the programme.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                According to Kenya's 2018 National Census of Street Families, <strong className="text-foreground">46,639 people</strong> live on or are connected to the streets nationwide - with <strong className="text-foreground">15,337 in Nairobi alone</strong>. Of these, <strong className="text-foreground">45.3% are youth</strong> and <strong className="text-foreground">33.8% are children</strong>. NLMRC's rescue work directly targets this population - identifying and bringing the most vulnerable boys to safety.
              </p>
            </div>

            {/* ── KPI strip ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border overflow-hidden">
              {kpis.map((k) => (
                <div key={k.label} className="bg-card px-5 py-5 flex flex-col gap-1">
                  <span className="text-2xl font-black text-orange leading-none">{k.value}</span>
                  <span className="text-muted-foreground text-xs leading-snug">{k.label}</span>
                </div>
              ))}
            </div>

            {/* ── Rescue Process ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Our Rescue Process</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 leading-tight">
                Eight Steps from the Street to Safety
              </h3>

              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={step.num} className="flex gap-5 group">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 bg-green flex items-center justify-center z-10">
                        <span className="text-white text-xs font-black">{step.num}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className={`pb-8 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                      <h4 className="font-black text-foreground text-base mb-1.5 group-hover:text-green transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Admission criteria ── */}
            <div className="bg-muted/30 border border-border p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-foreground text-lg">Admission Criteria</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                NLMRC rescues and admits clients based on the following set criteria, in line with the Department of Children Services guidelines and Kenya's Children's Act:
              </p>
              <ul className="space-y-2">
                {criteria.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0 mt-1.5" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> After initial screening, clients exhibiting high-level or severe symptoms may be referred to specialist service providers before or instead of admission to NLMRC's residential programme.
                </p>
              </div>
            </div>

            {/* ── Photo grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">In the Field</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative overflow-hidden h-60 group">
                  <img src={rescueImg2} alt="NLMRC outreach in Nairobi" loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="relative overflow-hidden h-60 group">
                  <img src={rescueImg3} alt="Social worker building trust with a youth" loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              </div>
            </div>

            {/* ── Voice from the street ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Voices of Hope</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <blockquote className="border-l-4 border-orange pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "I went to the streets in 2015 when my parents started fighting at home. Since then, I hadn't gone back home. Mwangaza promised to reunite me with my family."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Erick*, 17 years old, resident client<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
                <blockquote className="border-l-4 border-green pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "I started going to the streets when I was in Form 4. In my neighbourhood, people brew illicit alcohol and sell drugs. Some friends took me to a youth centre. They referred me to Mwangaza for rehabilitation. I am now studying electrical installation."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Kim*, 18 years old, vocational skills trainee<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* ── CTA band ── */}
            <div className="bg-green text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black mb-1">Support Our Rescue Mission</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Every donation funds a social worker's time on the streets - building the trust that brings a child home. KES 5,000 funds one week of street outreach.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/donate"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-bold text-sm hover:bg-orange/90 transition-all duration-200">
                  <Heart className="w-4 h-4" fill="currentColor" />
                  Donate Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all duration-200">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
          <aside className="space-y-6 lg:sticky lg:top-[160px]">

            {/* Programmes nav */}
            <div className="border border-border">
              <div className="bg-green px-5 py-3">
                <h4 className="text-white font-black text-sm uppercase tracking-wider">Our Programmes</h4>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center gap-3 px-5 py-3 bg-orange/5 border-l-4 border-orange">
                  <span className="text-sm font-bold text-orange">Rescue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange ml-auto" />
                </div>
                {otherProgrammes.map((p) => (
                  <Link key={p.href} to={p.href}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                    {p.label}
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="border border-border p-5 space-y-4">
              <h4 className="font-black text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">Quick Facts</h4>
              {[
                { icon: MapPin, label: "Operating counties", value: "Nairobi, Machakos, Kiambu & Kajiado" },
                { icon: Users,  label: "Target group",       value: "Street-connected boys, 14–18 years" },
                { icon: Clock,  label: "Trust-building",     value: "4–8 weeks average per client" },
                { icon: Target, label: "5-year target",      value: "420 children rescued (2022–2027)" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-green" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{f.label}</p>
                      <p className="text-sm font-bold text-foreground leading-snug mt-0.5">{f.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Donate card */}
            <div className="bg-orange text-white p-6">
              <Heart className="w-8 h-8 mb-4" fill="currentColor" />
              <h4 className="font-black text-lg mb-2">Make a Difference</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                KES 5,000 funds one week of street outreach. Your gift finds children before they are lost forever.
              </p>
              <Link to="/donate"
                className="group flex items-center justify-center gap-2 w-full py-3 bg-white text-orange font-black text-sm hover:bg-white/90 transition-all duration-200">
                Donate Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Contact card */}
            <div className="border border-border p-6 space-y-4">
              <h4 className="font-black text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">Contact Us</h4>
              <a href="tel:+254795822903" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-green transition-colors">
                <Phone className="w-4 h-4 text-green shrink-0" />
                +254 795 822 903
              </a>
              <a href="mailto:office@newlifemwangaza.org" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-green transition-colors">
                <Mail className="w-4 h-4 text-green shrink-0" />
                office@newlifemwangaza.org
              </a>
              <Link to="/contact"
                className="group flex items-center gap-2 text-sm font-bold text-green hover:text-green/80 transition-colors mt-2">
                Send us a message
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rescue;
