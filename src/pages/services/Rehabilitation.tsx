import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight, Heart, Phone, Mail, FileText, Target,
  Brain, Home, Leaf, BookOpen, HeartPulse, UserPlus, Star,
  Users, ChevronRight, MapPin, Clock, Milestone
} from "lucide-react";
import familyTherapy from "@/assets/IMG_20251111_145011_837.webp";
import spiritualCare from "@/assets/IMG_20251205_123203_760@128432812.webp";
import clientHomeVisit from "@/assets/IMG_20251015_124252_441.webp";

// ─── Data from NLMRC Strategic Plan 2022-2027 ───────────────────────────────

const phases = [
  {
    num: "01",
    title: "Admission & Orientation",
    desc: "Upon arrival each client undergoes medical screening, psychological assessment, and a structured intake interview. An Individual Treatment Plan (ITP) is co-developed with the client, outlining personal goals, identified risk factors, and the therapeutic pathway ahead. The first two weeks are an orientation period - adjusting to the Centre's community norms, daily schedule, and therapeutic expectations.",
  },
  {
    num: "02",
    title: "Natural Detoxification",
    desc: "The Centre facilitates medically-supported natural detoxification for clients withdrawing from drugs and substances. Staff trained in psychosocial support monitor each client's physical and emotional state throughout this phase. No pharmaceutical substitutes are used without proper clinical referral, ensuring a safe, supervised withdrawal process.",
  },
  {
    num: "03",
    title: "Individual & Group Counselling",
    desc: "Qualified counsellors hold weekly one-on-one sessions with every resident, working through trauma, self-esteem, relapse prevention, and life skills. Alongside individual work, structured group therapy sessions - facilitated using the 12-step model - build peer accountability, empathy, and shared resilience among residents.",
  },
  {
    num: "04",
    title: "Literacy, Numeracy & Life Skills",
    desc: "Many street-connected boys have significant education gaps. The programme delivers daily literacy and numeracy classes alongside practical life skills: financial literacy, conflict resolution, communication, and personal hygiene. These sessions bridge academic gaps and build the foundational competencies needed for reintegration.",
  },
  {
    num: "05",
    title: "Family Therapy & Home Visits",
    desc: "Rehabilitation is never just individual - it is relational. Social workers trace and engage families from the early stages of the programme. Family therapy sessions, held both at the Centre and in the home environment, rebuild trust and communication between the child and their caregivers. Supervised home visits assess safety and prepare both parties for reunification.",
  },
  {
    num: "06",
    title: "Spiritual Care",
    desc: "Holistic healing at NLMRC recognises that spiritual wellbeing is integral to lasting recovery. Clients are offered non-coercive spiritual care through reflection, prayer, and values-based discussion. This dimension of the programme underpins the moral framework and sense of purpose that supports sustained sobriety and community belonging.",
  },
  {
    num: "07",
    title: "Reintegration Planning",
    desc: "From the fourth month, focus shifts progressively toward exit preparation. Each client develops a personalised reintegration plan with their key worker - identifying a safe family or community to return to, a school or vocational pathway, and a relapse-prevention strategy. Referrals to partner organisations for further education or vocational training are arranged before discharge.",
  },
  {
    num: "08",
    title: "Discharge & Aftercare",
    desc: "A successful programme completion is celebrated as a milestone. Upon discharge, clients enter a structured 12-month aftercare programme: regular follow-up visits, phone check-ins, and continued access to counselling. Social workers monitor reintegration progress and intervene if relapse or re-entry to the streets is detected early.",
  },
];

const kpis = [
  { label: "Programme duration",           value: "6 months" },
  { label: "Residential capacity per year", value: "64 boys" },
  { label: "Aftercare monitoring",          value: "12 months" },
  { label: "Age group served",              value: "14–17 yrs" },
];

const components = [
  { title: "Continuous Assessments",       text: "Regular evaluation of progress and needs throughout the programme.", icon: Star },
  { title: "Group Therapy",                text: "Peer support and shared healing experiences via the 12-step model.",  icon: Users },
  { title: "One-on-One Counselling",       text: "Individual therapeutic sessions addressing personal challenges.",      icon: Brain },
  { title: "Literacy & Numeracy Classes",  text: "Daily educational support to bridge learning gaps and build foundations.", icon: BookOpen },
  { title: "Family Therapy",               text: "Counselling for children and families to rebuild damaged relationships.", icon: Users },
  { title: "Home Visits",                  text: "Reconnecting with families and assessing safety before reunification.", icon: Home },
  { title: "Reintegration Planning",       text: "Personalised plans for a successful, supported return to community.",   icon: UserPlus },
  { title: "Aftercare Support",            text: "12-month monitoring and continued guidance after programme completion.", icon: HeartPulse },
  { title: "Natural Detoxification",       text: "Medically-monitored, safe withdrawal from drugs and substances.",       icon: Leaf },
  { title: "Spiritual Care",               text: "Nurturing spiritual wellbeing as part of holistic, lasting recovery.",  icon: Milestone },
];

const otherProgrammes = [
  { label: "Rescue",              href: "/services/rescue" },
  { label: "Reintegration",       href: "/services/reintegration" },
  { label: "Prevention",          href: "/services/prevention" },
  { label: "Community Empowerment", href: "/services/community-empowerment" },
];

const Rehabilitation = () => {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <SEO
        title="Affordable Rehabilitation Centres in Kenya | Drug & Alcohol Addiction Rehab | NLMRC"
        description="Looking for affordable rehabilitation centres in Kenya? NLMRC in Katani, Machakos provides accredited Christian addiction treatment, natural detox programs, and drug abuse therapy for youth near Nairobi."
        keywords="affordable rehabilitation centres in kenya, best rehabilitation centres in kenya, christian rehabilitation centres in kenya, best rehabs in kenya, best rehabilitation centres in nairobi, addiction treatment centers near me, any rehabilitation centre near me, alcohol rehabilitation centres in kenya, drug abuse rehab near me, cheap rehabilitation centers in kenya, free rehabilitation centres in kenya, detox program, drug rehabilitation center near me, accredited rehab centers, best treatment for alcohol addiction"
        canonical="https://www.newlifemwangaza.org/services/rehabilitation"
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "New Life Mwangaza Rehabilitation Centre - Addiction & Youth Rehabilitation",
          "description": "Accredited Christian addiction rehabilitation centre in Kenya providing natural detoxification, individual and group therapy, life skills, and family reunification.",
          "url": "https://www.newlifemwangaza.org/services/rehabilitation",
          "medicalSpecialty": "AddictionMedicine",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Katani Road",
            "addressLocality": "Syokimau, Katani",
            "addressRegion": "Machakos County",
            "addressCountry": "KE"
          },
          "telephone": "+254795822903"
        }}
      />
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-[340px] overflow-hidden bg-green">
        <img
          src={familyTherapy}
          alt="NLMRC rehabilitation programme - family therapy session"
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
            <span className="text-white font-semibold">Rehabilitation</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-[0.2em]">Programme 02 of 05</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Rehabilitation - Restoring Lives<br className="hidden md:block" /> One Child at a Time
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            A 6-month residential therapeutic community programme based in Katani, Machakos County - healing body, mind, family, and spirit.
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
                NLMRC's residential rehabilitation programme is a structured, 6-month therapeutic journey for street-connected boys aged 14–17. Situated in a serene environment in <strong className="text-foreground">Katani, Machakos County</strong>, the Centre uses a <strong className="text-foreground">therapeutic community model</strong> - clients and staff live together as a 'mini-community', creating a safe, accountable environment in which genuine transformation can take root.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The programme is anchored on a <strong className="text-foreground">12-step approach</strong> and addresses every dimension of a child's wellbeing: physical detoxification, psychological healing, family restoration, spiritual care, and educational catch-up. This is not merely a holding facility - it is a professionally staffed rehabilitation centre with qualified counsellors, social workers, and programme staff working alongside each resident every day.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Upon completing the 6-month residential phase, clients transition into a <strong className="text-foreground">12-month aftercare programme</strong> - monitored reintegration that ensures the gains made in rehabilitation are sustained as the child re-enters family and community life.
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

            {/* ── Programme Components Grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Programme Components</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8 leading-tight">
                Ten Pillars of Holistic Recovery
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {components.map((item) => (
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

            {/* ── Rehabilitation Journey ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">The Rehabilitation Journey</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 leading-tight">
                Eight Phases from Admission to Aftercare
              </h3>
              <div className="space-y-0">
                {phases.map((phase, i) => (
                  <div key={phase.num} className="flex gap-5 group">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 bg-green flex items-center justify-center z-10">
                        <span className="text-white text-xs font-black">{phase.num}</span>
                      </div>
                      {i < phases.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className={`pb-8 ${i === phases.length - 1 ? "pb-0" : ""}`}>
                      <h4 className="font-black text-foreground text-base mb-1.5 group-hover:text-green transition-colors">
                        {phase.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Therapeutic Community model callout ── */}
            <div className="bg-muted/30 border border-border p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-foreground text-lg">The Therapeutic Community Model</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                The therapeutic community (TC) model treats the community itself as the primary agent of change. At NLMRC, this means:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Staff and clients share the same living environment, creating authentic relational accountability.",
                  "Peer influence is harnessed positively - older residents mentor newer ones, reinforcing recovery norms.",
                  "Daily communal activities (meals, chores, worship, recreation) mirror healthy family and community life.",
                  "Each resident is both a recipient of care and a contributor to the community - building responsibility and self-worth.",
                  "Progress is measured holistically: behaviour, relationships, attitudes, and plans - not just sobriety alone.",
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
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Life at the Centre</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={spiritualCare}
                    alt="Spiritual care session at NLMRC rehabilitation centre"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Spiritual Care Sessions</p>
                  </div>
                </div>
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={clientHomeVisit}
                    alt="Social worker conducting a client home visit"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Family Home Visits</p>
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
                    "Coming to Mwangaza was the best decision I ever made. I didn't think I could stop using drugs, but the counsellors never gave up on me. Now I want to become a social worker myself."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - James*, 17 years old, programme graduate<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
                <blockquote className="border-l-4 border-green pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "My son came back different - not the angry, lost boy who left. They taught him to talk to us again. We had family sessions here and it changed everything. We are a family again."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Mother of a programme graduate, Nairobi<br />
                    <span className="font-normal">* Shared with consent</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* ── CTA band ── */}
            <div className="bg-green text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black mb-1">Sponsor a Child's Recovery</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  KES 15,000 funds one month of residential care - accommodation, meals, therapy, and education for one child. Your gift transforms a life.
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
                {/* Rescue */}
                <Link to="/services/rescue"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Rescue
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Rehabilitation - active */}
                <div className="flex items-center gap-3 px-5 py-3 bg-orange/5 border-l-4 border-orange">
                  <span className="text-sm font-bold text-orange">Rehabilitation</span>
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
                { icon: MapPin,  label: "Centre location",    value: "Katani, Machakos County" },
                { icon: Users,  label: "Target group",        value: "Street-connected boys, 14–17 years" },
                { icon: Clock,  label: "Programme duration",  value: "6 months residential" },
                { icon: Target, label: "Aftercare",           value: "12-month post-discharge follow-up" },
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
              <h4 className="font-black text-lg mb-2">Sponsor a Child</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                KES 15,000 covers one month of full residential care - meals, therapy, education, and accommodation.
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

export default Rehabilitation;
