import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight, Heart, Phone, Mail, Target, FileText,
  Users, Globe, Handshake, TrendingUp, Mic, School,
  ChevronRight, MapPin, Clock, ShieldCheck
} from "lucide-react";
import communityEmpowerment from "@/assets/story/changing-communities.webp";
import communityTraining from "@/assets/story/rebuilding-families.webp";

// ─── Data from NLMRC Strategic Plan 2022-2027 ───────────────────────────────

const steps = [
  {
    num: "01",
    title: "Community Mobilisation & Stakeholder Mapping",
    desc: "NLMRC begins by mapping the existing community structures in each target area - local administration, churches, schools, Nyumba Kumi leaders, women's groups, and youth organisations. We identify key influencers, child protection gaps, and the specific vulnerabilities affecting children in that community before designing any intervention.",
  },
  {
    num: "02",
    title: "Child Protection Committees (CPCs)",
    desc: "Where they do not exist, NLMRC facilitates the formation of community-based Child Protection Committees composed of local leaders, teachers, faith leaders, and caregivers. Where CPCs already exist, we strengthen them through training, tools, and linkages to formal child protection systems. These committees become the community's first line of response for at-risk children.",
  },
  {
    num: "03",
    title: "Capacity Building for Community Leaders",
    desc: "Local leaders, Nyumba Kumi officials, church elders, and community health workers receive structured training on child rights, the signs of abuse and neglect, referral pathways, and their legal obligations under Kenya's Children's Act. An informed community leader is one of the most powerful child protection tools available.",
  },
  {
    num: "04",
    title: "Village Savings & Loan Associations (VSLAs)",
    desc: "NLMRC supports the formation and strengthening of Village Savings and Loan Associations among families of former street children and at-risk households. VSLAs build economic resilience, reduce household financial stress, and create peer accountability networks - directly addressing the poverty that drives children to the streets.",
  },
  {
    num: "05",
    title: "Community Dialogues & Sensitisation",
    desc: "Regular community barazas, school talks, and church forums raise awareness of child rights, the dangers of drugs and street life, and available support services. These dialogues break cultural silence around abuse, encourage early reporting, and build community consensus that protecting children is everyone's responsibility.",
  },
  {
    num: "06",
    title: "Youth Leadership & Mentorship",
    desc: "NLMRC invests in the next generation of community guardians by running youth leadership and mentorship sessions for teenagers in at-risk communities. Young people learn conflict resolution, peer-to-peer education, and civic engagement - equipping them to protect their own peers from street entry and substance abuse.",
  },
  {
    num: "07",
    title: "Advocacy & Systems Strengthening",
    desc: "At county and national level, NLMRC engages in policy advocacy for stronger child protection legislation, adequate resourcing of the Department of Children Services, and accountability for drug dealers targeting youth in informal settlements. We participate in coordination forums, contribute to national reports, and ensure community voices shape policy.",
  },
];

const kpis = [
  { label: "Empowerment target (2022-2027)", value: "150+" },
  { label: "Target counties",                value: "4" },
  { label: "VSLA groups supported",          value: "Ongoing" },
  { label: "CPCs formed / strengthened",     value: "Per county" },
];

const activities = [
  { title: "Child Protection Committees",  text: "Formation and strengthening of community-based CPCs as the first line of response for at-risk children.", icon: Handshake },
  { title: "Capacity Building",            text: "Training community leaders, teachers, and health workers on child rights, referrals, and the Children's Act.", icon: Users },
  { title: "Village Savings & Loans",      text: "Supporting VSLAs among vulnerable families to build economic resilience and reduce poverty-driven street entry.", icon: TrendingUp },
  { title: "Community Dialogues",          text: "Barazas and sensitisation forums that break cultural silence around child abuse and build collective responsibility.", icon: Globe },
  { title: "Youth Leadership",             text: "Mentorship and leadership programmes that equip young people to protect peers from street life and substance abuse.", icon: School },
  { title: "Advocacy",                     text: "County and national-level engagement to strengthen child protection policy, legislation, and resource allocation.", icon: Mic },
  { title: "Child Rights Awareness",       text: "School talks and community sessions educating children, parents, and leaders on rights, duties, and protections.", icon: ShieldCheck },
  { title: "Referral Network Building",    text: "Establishing clear, trusted pathways between communities, NLMRC, and government child protection services.", icon: Target },
];

const Prevention = () => {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <SEO
        title="Community Empowerment & Vocational Skills Kenya | NLMRC"
        description="Empowering vulnerable families and youth in Machakos and Nairobi through vocational training, financial literacy, and community child protection."
        keywords="community empowerment officer, community work jobs, vocational skills kenya, slum family support, child protection committees, nlmrc community empowerment"
        canonical="https://www.newlifemwangaza.org/services/community-empowerment"
      />
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-[340px] overflow-hidden bg-green">
        <img
          src={communityEmpowerment}
          alt="NLMRC community empowerment session"
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
            <span className="text-white font-semibold">Community Empowerment</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-[0.2em]">Programme 05 of 05</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
            Community Empowerment -<br className="hidden md:block" /> Building Safer Communities
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Strengthening community structures, economic resilience, and child protection systems from within.
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
                Community Empowerment is the fifth and most outward-facing pillar of NLMRC's P&3R model. It recognises a fundamental truth: <strong className="text-foreground">sustainable change is not delivered to communities - it is built within them</strong>. NLMRC works to strengthen the local structures, economic foundations, and child protection systems that determine whether children stay safe long after our programmes end.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Across <strong className="text-foreground">Nairobi, Machakos, Kiambu, and Kajiado</strong>, we build the capacity of local leaders, form and strengthen Child Protection Committees, support Village Savings and Loan Associations, and engage communities in honest dialogue about child rights and the root causes of street life. Every activity is designed to leave behind a community that is more capable, more connected, and more committed to protecting its children than it was before.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                An empowered community is the most durable safeguard a child can have. When neighbours look out for each other's children, when leaders know how to respond to abuse, and when families have economic dignity - fewer children ever need to be rescued in the first place.
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

            {/* ── Activities Grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Our Activities</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8 leading-tight">
                Eight Ways We Strengthen Communities
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
                Seven Steps to an Empowered Community
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

            {/* ── Why community matters callout ── */}
            <div className="bg-muted/30 border border-border p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-green flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-foreground text-lg">Why Community Matters</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Research and NLMRC's own programme experience consistently show that community-level protective factors are among the most powerful determinants of whether a child ends up on the street. A strong community:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Identifies at-risk children early - before crisis, not after.",
                  "Holds abusive and neglectful caregivers accountable through social pressure and referral.",
                  "Provides economic solidarity through savings groups, reducing the poverty that drives street entry.",
                  "Creates a culture where children's rights are known, valued, and defended by ordinary members.",
                  "Supports returning graduates, making reintegration sustainable rather than fragile.",
                  "Resists the drug networks that prey on young people by disrupting their access and social acceptance.",
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
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange">In the Community</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={communityTraining}
                    alt="Community training session"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Community Training Session</p>
                  </div>
                </div>
                <div className="relative overflow-hidden h-60 group">
                  <img
                    src={communityEmpowerment}
                    alt="Community empowerment forum"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">Community Empowerment Forum</p>
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
                    "Before the training, I didn't know what to do when I saw a child being mistreated. Now I know who to call and what steps to take. This knowledge has already helped two children in our village."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - Nyumba Kumi leader, Machakos County<br />
                    <span className="font-normal">* Shared with consent</span>
                  </footer>
                </blockquote>
                <blockquote className="border-l-4 border-green pl-6 py-2 bg-muted/20">
                  <p className="text-foreground font-medium italic leading-relaxed text-sm">
                    "Our savings group started with eight women. Now we are twenty-three. Three of us have started small businesses. Our children are in school. We look out for each other's families."
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground font-semibold">
                    - VSLA member, Nairobi informal settlement<br />
                    <span className="font-normal">* Shared with consent</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* ── CTA band ── */}
            <div className="bg-green text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black mb-1">Join the Movement</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Your partnership helps us train a community leader, launch a savings group, or form a Child Protection Committee - building the systems that keep children safe for generations.
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
                  Partner With Us
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
                <Link to="/services/prevention"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted/40 hover:text-green border-l-4 border-transparent hover:border-green transition-all duration-150 group">
                  Prevention
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Community Empowerment — active */}
                <div className="flex items-center gap-3 px-5 py-3 bg-orange/5 border-l-4 border-orange">
                  <span className="text-sm font-bold text-orange">Community Empowerment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange ml-auto" />
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="border border-border p-5 space-y-4">
              <h4 className="font-black text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">Quick Facts</h4>
              {[
                { icon: MapPin,  label: "Operating counties",  value: "Nairobi, Machakos, Kiambu & Kajiado" },
                { icon: Users,  label: "Primary targets",      value: "Community leaders, families & youth" },
                { icon: Clock,  label: "Programme approach",   value: "Community-based, long-term" },
                { icon: Target, label: "5-year target",        value: "150+ community members empowered" },
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
              <h4 className="font-black text-lg mb-2">Empower a Community</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                Your gift trains a leader, launches a savings group, or funds a Child Protection Committee - the systems that protect children for generations.
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
