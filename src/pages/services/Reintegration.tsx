import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight, Heart, Phone, Mail, Target, FileText,
  Briefcase, GraduationCap, Home, HeartHandshake, Wrench,
  Users, ShieldCheck, ChevronRight, MapPin, Clock
} from "lucide-react";
import reintegrationSuccess from "@/assets/20230725_153032.webp";
import educationSupport from "@/assets/20230828_145422.webp";
import teamBuilding from "@/assets/IMG_20250822_113410_394.webp";

// ─── Data from NLMRC Strategic Plan 2022-2027 ───────────────────────────────

const steps = [
  {
    num: "01",
    title: "Exit Assessment & Reintegration Planning",
    desc: "From the fourth month of rehabilitation, the social worker and client jointly build a personalised Reintegration Plan. It identifies a verified safe family or community placement, maps the client's skills and interests, and charts a clear pathway to education or vocational training. No discharge happens without a plan in place.",
  },
  {
    num: "02",
    title: "Family Tracing & Reconciliation",
    desc: "Where family links exist, social workers trace and engage parents or guardians well before discharge. Joint family therapy sessions — held both at the Centre and in the home — rebuild communication, address root causes of the child's street life, and prepare the family to receive the returning child with the support they need.",
  },
  {
    num: "03",
    title: "School & Vocational Placement",
    desc: "Based on the client's age, academic level, and interests, NLMRC facilitates placement in a formal school or vocational training centre. We liaise with bursary bodies, sponsors, and county education officers to secure funding, uniforms, and materials. For older youth, apprenticeships and on-the-job training opportunities are arranged with partner employers.",
  },
  {
    num: "04",
    title: "Provision of Tools of Trade",
    desc: "For graduates entering a skilled trade — carpentry, electrical work, plumbing, tailoring, or others — NLMRC provides a basic starter kit of tools. This critical investment means a young person can begin earning immediately after training rather than waiting on equipment they cannot afford, drastically reducing the risk of relapse.",
  },
  {
    num: "05",
    title: "Psychosocial Follow-up",
    desc: "Reintegration does not end at the gate. Social workers conduct regular follow-up visits and phone check-ins for 12 months after discharge. These visits assess the client's progress, identify emerging risks early, and provide continued psychosocial support to both the client and their family. Any reintegration difficulties are addressed before they escalate.",
  },
  {
    num: "06",
    title: "Relapse Monitoring & Crisis Response",
    desc: "If a client is identified as at risk of returning to the streets, NLMRC's social work team responds quickly — arranging emergency counselling, family mediation, or a short re-admission to the Centre if necessary. The goal is always to stabilise and sustain the gains of rehabilitation, not to start over.",
  },
  {
    num: "07",
    title: "Alumni Network & Peer Support",
    desc: "Graduates are connected to NLMRC's growing alumni network — a community of young people who have been through the same journey. Alumni serve as peer mentors to current residents, participate in Centre events, and support one another in their businesses and studies. This network builds long-term accountability and belonging.",
  },
];

const kpis = [
  { label: "Reintegration target (2022-2027)", value: "280" },
  { label: "Aftercare follow-up period",        value: "12 months" },
  { label: "Tools of trade provided",           value: "Per graduate" },
  { label: "Age group served",                  value: "14-18 yrs" },
];

const services = [
  { title: "Family Reunification",    text: "Mediated reconciliation and ongoing family support for a safe return home.",           icon: Home },
  { title: "School Placement",        text: "Facilitated enrolment in formal education with bursary and material support.",         icon: GraduationCap },
  { title: "Vocational Training",     text: "Placement in skills training centres - carpentry, electrical, plumbing, tailoring.",   icon: Wrench },
  { title: "Apprenticeships",         text: "Hands-on trade learning with partner employers and community craftspeople.",           icon: Briefcase },
  { title: "Tools of Trade",          text: "Starter kits of tools so graduates can earn immediately after completing training.",   icon: Wrench },
  { title: "Sponsorship Support",     text: "Financial assistance for school fees, uniforms, and vocational course costs.",         icon: HeartHandshake },
  { title: "Psychosocial Follow-up",  text: "12-month post-discharge monitoring, counselling, and family support.",                 icon: Users },
  { title: "Relapse Mitigation",      text: "Early-warning monitoring and rapid-response support to prevent return to the streets.", icon: ShieldCheck },
  { title: "Job Placement",           text: "Connections to employers and self-employment opportunities for older graduates.",      icon: Briefcase },
];

const otherProgrammes = [
  { label: "Rescue",               href: "/services/rescue" },
  { label: "Rehabilitation",       href: "/services/rehabilitation" },
  { label: "Prevention",           href: "/services/prevention" },
  { label: "Community Empowerment", href: "/services/community-empowerment" },
];

const Reintegration = () => {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <SEO
        title="Family Tracing & Youth Reintegration in Kenya | NLMRC"
        description="Successful family tracing, mediation, and sustainable social reintegration for rehabilitated boys at New Life Mwangaza Rehabilitation Centre Kenya."
        keywords="family tracing and reintegration kenya, street youth rehabilitation, social work jobs in kenya, community work jobs, best rehabilitation centres in kenya, youth recovery kenya"
        canonical="https://www.newlifemwangaza.org/services/reintegration"
      />
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-[340px] overflow-hidden bg-green">
        <img
          src={reintegrationSuccess}
          alt="NLMRC reintegration - graduate returning to community"
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
            <span className="text-white font-semibold">Reintegration</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-[0.2em]">Programme 03 of 05</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Reintegration - Building<br className="hidden md:block" /> Futures Beyond the Centre
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Guided family reunification, education and vocational placement, tools of trade, and 12 months of follow-up support.
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
                Reintegration is the third phase of NLMRC's P&3R model and the true test of whether rehabilitation has worked. It begins before discharge and continues for <strong className="text-foreground">12 months</strong> after a child leaves the Centre - ensuring that the transformation achieved during residential rehabilitation is sustained in the real world.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                NLMRC's reintegration approach is holistic and structured. It is never a single handover moment - it is a carefully managed transition involving the child, their family, their school or employer, and NLMRC's social work team. Each graduate receives a <strong className="text-foreground">personalised Reintegration Plan</strong> built around their skills, family situation, and chosen pathway.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The ultimate goal is <strong className="text-foreground">self-reliance</strong>: a young person who can earn a living, contribute to their family, and never return to the streets. NLMRC measures success not at discharge but at the 12-month mark - when a graduate is stable, employed or in school, and living independently.
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

            {/* ── Reintegration Services Grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Reintegration Services</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8 leading-tight">
                Nine Pathways to a Stable Future
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((item) => (
                  <div
                    key={item.title}
                    className="border border-border p-5 flex gap-4 hover:border-green/40 transition-colors group"
                  >
                    <div className="w-9 h-9 bg-orange/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange/20 transition-colors">
                      <item.icon className="w-4 h-4 text-orange" />
                    </div>
                    <div>
                      <h4 className="font-black text-foreground text-sm leading-snug mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Reintegration Journey ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">The Reintegration Journey</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 leading-tight">
                Seven Steps from Centre to Community
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

            {/* ── What success looks like callout ── */}
            <div className="bg-muted/30 border border-border p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-foreground text-lg">What Success Looks Like</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                NLMRC measures reintegration success at the 12-month follow-up mark. A successful reintegration means:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "The graduate is living with family or in a verified safe community setting - not on the streets.",
                  "They are enrolled in school, vocational training, or are sustainably employed.",
                  "They have remained drug-free since discharge, with no relapse recorded.",
                  "Family relationships are stable - the child is accepted, supported, and contributing at home.",
                  "They are connected to the NLMRC alumni network and engaged in peer support.",
                  "They have the tools, skills, and confidence to build a self-reliant future.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0 mt-1.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Photo grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Alumni in Action</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={educationSupport}
                    alt="NLMRC alumni in vocational training"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Alumni on Training</p>
                  </div>
                </div>
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={teamBuilding}
                    alt="NLMRC alumni team building activity"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Alumni Team Building</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Voices of Hope ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Voices of Hope</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <blockquote className="border-l-4 border-orange pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "Mwangaza taught me to live peacefully with other people. Now I am able to work in a workshop with my colleagues. I am also able to pay for my own rent."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Bill*, 20 years old, alumni<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
                <blockquote className="border-l-4 border-green pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "With my own tools and training, I can now support myself and help my family. I never thought this was possible when I was on the street."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - David*, 19 years old, vocational graduate<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* ── CTA band ── */}
            <div className="bg-green text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black mb-1">Partner in Their Success</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Sponsor a starter kit of tools, school fees for a returning student, or a month of follow-up support. Your gift turns rehabilitation into a lasting future.
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
                <Link to="/services/rescue"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Rescue
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link to="/services/rehabilitation"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Rehabilitation
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Reintegration — active */}
                <div className="flex items-center gap-3 px-5 py-3 bg-orange/5 border-l-4 border-orange">
                  <span className="text-sm font-bold text-orange">Reintegration</span>
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
                { icon: MapPin,  label: "Coverage",           value: "Nairobi, Machakos, Kiambu & Kajiado" },
                { icon: Users,  label: "Target group",        value: "Rehabilitation graduates, 14-18 years" },
                { icon: Clock,  label: "Follow-up period",    value: "12 months post-discharge" },
                { icon: Target, label: "5-year target",       value: "280 reintegrated (2022-2027)" },
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
              <h4 className="font-black text-lg mb-2">Sponsor a Graduate</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                School fees, a tools starter kit, or follow-up support - your gift turns rehabilitation into a lasting future.
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

export default Reintegration;
