import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight, Heart, Phone, Mail, Target, FileText,
  Baby, Users, Wallet, Megaphone, Lock, ChevronRight,
  MapPin, Clock, ShieldCheck
} from "lucide-react";
import parentEmpowered from "@/assets/IMG_20240925_171410_201.webp";
import caregiversCapacity from "@/assets/IMG_20251028_130558_922.webp";

// ─── Data from NLMRC Strategic Plan 2022-2027 ───────────────────────────────

const steps = [
  {
    num: "01",
    title: "Community Mapping & Vulnerability Identification",
    desc: "NLMRC works with local administration, Nyumba Kumi structures, churches, and community health workers to identify households and children at high risk of street entry. This includes children from families experiencing extreme poverty, domestic violence, parental substance abuse, or family breakdown — the primary drivers of street life.",
  },
  {
    num: "02",
    title: "Caregiver Capacity Building",
    desc: "Identified caregivers are enrolled in structured training forums covering positive parenting practices, child rights and protection, household budgeting, and conflict resolution. The goal is to equip parents and guardians with practical skills that reduce abuse, neglect, and family breakdown — keeping children safely at home.",
  },
  {
    num: "03",
    title: "Economic Empowerment of Families",
    desc: "Poverty is the single most consistent driver of street entry. NLMRC provides selected vulnerable families with economic empowerment support — small business start-up kits, income-generating activity training, and linkages to government social protection programmes such as the Inua Jamii cash transfer. A family with an income is a family that keeps its children.",
  },
  {
    num: "04",
    title: "Girls Empowerment Programme",
    desc: "Teenage girls and young mothers in at-risk communities face compounded vulnerabilities: early pregnancy, school dropout, exploitation, and exclusion from economic life. NLMRC runs targeted girls' empowerment sessions covering life skills, reproductive health, self-worth, and entrepreneurship — reducing the risk that their children, in turn, will enter street life.",
  },
  {
    num: "05",
    title: "Community Engagement & Awareness",
    desc: "NLMRC organises community barazas, school talks, and church engagements to raise awareness of the dangers of street life, signs of at-risk children, and available support services. Communities are mobilised to report at-risk children early, support vulnerable families, and resist the drug distribution networks that prey on young people.",
  },
  {
    num: "06",
    title: "Advocacy & Policy Engagement",
    desc: "At the systems level, NLMRC advocates for children's rights and welfare with county governments, the Department of Children Services, schools, and civil society networks. We contribute to policy dialogues on child protection, participate in national coordination forums, and ensure that the voices and needs of at-risk children inform decision-making.",
  },
];

const kpis = [
  { label: "Prevention target (2022-2027)", value: "200" },
  { label: "Target counties",               value: "4" },
  { label: "Focus group",                   value: "Families & girls" },
  { label: "Age group at risk",             value: "Under 18" },
];

const activities = [
  { title: "Caregiver Capacity Building", text: "Structured training for parents and guardians on positive parenting, child rights, and household management.", icon: Heart },
  { title: "Parenting Skills Workshops",  text: "Practical sessions on child development, discipline without abuse, and building safe home environments.",      icon: Baby },
  { title: "Economic Empowerment",        text: "Business start-up kits, income-generating training, and linkages to government social protection programmes.", icon: Wallet },
  { title: "Community Engagement",        text: "Barazas, school talks, and church partnerships to mobilise communities to protect at-risk children.",          icon: Users },
  { title: "Girls Empowerment",           text: "Life skills, reproductive health, and entrepreneurship for teenage girls and young mothers in at-risk communities.", icon: Lock },
  { title: "Advocacy",                    text: "Representing children's rights in county and national policy dialogues and child protection forums.",            icon: Megaphone },
  { title: "Drug Awareness Campaigns",    text: "School and community-level education on the dangers of drug and substance abuse targeting youth.",              icon: ShieldCheck },
  { title: "Early Warning & Referral",    text: "Training community volunteers to identify and refer at-risk children before they reach the streets.",           icon: Target },
];

const otherProgrammes = [
  { label: "Rescue",               href: "/services/rescue" },
  { label: "Rehabilitation",       href: "/services/rehabilitation" },
  { label: "Reintegration",        href: "/services/reintegration" },
  { label: "Community Empowerment", href: "/services/community-empowerment" },
];

const Prevention = () => {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <SEO
        title="Child Abuse & Drug Addiction Prevention in Kenya | NLMRC Advocacy"
        description="Community-led prevention, child protection barazas, and school sensitization programs mitigating youth street migration and drug addiction in Kenya."
        keywords="drug abuse prevention kenya, drug abuse in kenya, child protection nairobi, street children prevention, community work jobs, child rights advocacy nairobi"
        canonical="https://www.newlifemwangaza.org/services/prevention"
      />
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-[340px] overflow-hidden bg-green">
        <img
          src={parentEmpowered}
          alt="NLMRC prevention - parent empowered with a grocery kiosk"
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
            <span className="text-white font-semibold">Prevention</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-[0.2em]">Programme 04 of 05</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Prevention - Keeping Children<br className="hidden md:block" /> Off the Streets
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Empowering families, communities, and girls to address the root causes of street entry before they take hold.
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
                Prevention is the first pillar of NLMRC's P&3R model - and the most cost-effective one. The most powerful intervention is the one that means a child never reaches the street in the first place. NLMRC's prevention work addresses the <strong className="text-foreground">root causes</strong> of street entry: poverty, family breakdown, poor parenting, and easy access to drugs within communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Working across <strong className="text-foreground">Nairobi, Machakos, Kiambu, and Kajiado</strong>, our prevention programme targets families and communities identified as high-risk through community mapping. It empowers caregivers with parenting skills and economic resources, mobilises communities to protect their children, and runs targeted programmes for girls who face compounded vulnerabilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Kenya's 2018 National Census counted <strong className="text-foreground">46,639 people</strong> connected to the streets nationwide. Behind each one is a preventable story. NLMRC's prevention work exists to write a different ending - strengthening families so children stay home, in school, and on a path to a future.
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

            {/* ── Prevention Activities Grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Prevention Activities</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8 leading-tight">
                Eight Ways We Stop Street Entry
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {activities.map((item) => (
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

            {/* ── How We Work ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">How We Work</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 leading-tight">
                Six Steps to Stronger Families
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

            {/* ── Root causes callout ── */}
            <div className="bg-muted/30 border border-border p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-foreground text-lg">Root Causes We Target</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                NLMRC's prevention work is grounded in evidence from Kenya's 2018 National Census of Street Families, which identified these as the primary drivers of street entry among children and youth:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { cause: "Family breakdown and domestic violence", detail: "The leading trigger — children flee homes where conflict, abuse, or neglect make staying more dangerous than the street." },
                  { cause: "Extreme poverty and household economic stress", detail: "When families cannot meet basic needs, some children leave to fend for themselves or are pushed out to reduce household burden." },
                  { cause: "Drug and substance abuse in communities", detail: "Easy access to cheap substances (glue, alcohol, cannabis) in informal settlements draws in youth seeking escapism or peer acceptance." },
                  { cause: "Poor parenting knowledge and practices", detail: "Many caregivers lack skills in positive discipline, child communication, and recognising signs of distress — leaving children unsupported." },
                  { cause: "School dropout and exclusion", detail: "Loss of school connection removes a key protective factor — children without school are significantly more vulnerable to street entry." },
                ].map((item) => (
                  <li key={item.cause} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0 mt-1.5" />
                    <span>
                      <strong className="text-foreground">{item.cause}.</strong>{" "}
                      <span className="text-muted-foreground">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Photo grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Prevention in the Community</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={caregiversCapacity}
                    alt="Caregivers capacity building session"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Caregivers Capacity Building</p>
                  </div>
                </div>
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={parentEmpowered}
                    alt="Parent empowered with a grocery kiosk"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Economic Empowerment - Grocery Kiosk</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Voices ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Voices from the Community</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <blockquote className="border-l-4 border-orange pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "My son was very mischievous and lacked respect before coming to Mwangaza. He spent most days in the streets. Now he is in school and very responsible - he even does household chores."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Mary*, caregiver, Nairobi<br />
                    <span className="font-normal">* Name changed for privacy</span>
                  </footer>
                </blockquote>
                <blockquote className="border-l-4 border-green pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "The parenting training taught me how to talk to my children without beating them. I never knew there was another way. Our home is peaceful now."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Father of two, Machakos County<br />
                    <span className="font-normal">* Shared with consent</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* ── CTA band ── */}
            <div className="bg-green text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black mb-1">Strengthen a Family Today</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Your support funds a caregiver training forum, a family's business starter kit, or a community awareness session. Prevention saves lives before a rescue is ever needed.
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
                <Link to="/services/reintegration"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Reintegration
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Prevention — active */}
                <div className="flex items-center gap-3 px-5 py-3 bg-orange/5 border-l-4 border-orange">
                  <span className="text-sm font-bold text-orange">Prevention</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange ml-auto" />
                </div>
                <Link to="/services/community-empowerment"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Community Empowerment
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* Quick facts */}
            <div className="border border-border p-5 space-y-4">
              <h4 className="font-black text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">Quick Facts</h4>
              {[
                { icon: MapPin,  label: "Operating counties",  value: "Nairobi, Machakos, Kiambu & Kajiado" },
                { icon: Users,  label: "Primary targets",      value: "Families, caregivers & at-risk girls" },
                { icon: Clock,  label: "Programme approach",   value: "Community-based, ongoing" },
                { icon: Target, label: "5-year target",        value: "200 families supported (2022-2027)" },
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
              <h4 className="font-black text-lg mb-2">Strengthen a Family</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                Your gift funds caregiver training, a family business kit, or a community awareness session - prevention before rescue is ever needed.
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

export default Prevention;
