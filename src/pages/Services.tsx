import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StoriesPreview from "@/components/StoriesPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  ShieldCheck,
  MapPin,
  Users,
  BookOpen,
  Activity,
  Home,
  Award,
  Phone,
  Mail,
  GraduationCap,
} from "lucide-react";

// ─── 5 Core Pillars Data ───────────────────────────────────────────────────
const pillars = [
  {
    id: "rescue",
    number: "01",
    slug: "rescue",
    title: "Street Outreach & Rescue",
    tagline: "Reaching Boys on the Margins",
    image: "/images/rescue.webp",
    summary:
      "Compassionate outreach identifying street-connected boys in Nairobi, Machakos, Kiambu, and Kajiado, building trust and transitioning them to immediate safety.",
    target: "Street-connected boys (Ages 14–18)",
    location: "Nairobi, Machakos, Kiambu, Kajiado",
    duration: "Ongoing / Night & Day Outreach",
    points: [
      "Client identification & strategic mapping on street bases",
      "Night visits, food distribution & trust building",
      "Pre-admission counseling & voluntary consent",
      "Crisis triage & emergency medical linkage",
    ],
    accentColor: "border-amber-500/30 hover:border-amber-500",
    badgeColor: "bg-amber-500 text-white",
  },
  {
    id: "rehabilitation",
    number: "02",
    slug: "rehabilitation",
    title: "Residential Rehabilitation & Detox",
    tagline: "6-Month Therapeutic Community in Katani",
    image: "/images/rehabilitation.webp",
    summary:
      "Holistic, accredited inpatient recovery for boys overcoming addiction. Guided by the 12-step model, natural detoxification, literacy education, and psycho-spiritual therapy.",
    target: "Admitted boys recovering from substance abuse",
    location: "Katani Residential Centre, Machakos",
    duration: "6 Months Intensive Inpatient",
    points: [
      "Medically-supported natural detoxification & health checkups",
      "Structured 12-step group therapy & daily recovery reflections",
      "Individual psychosocial counseling with certified therapists",
      "Accelerated basic literacy, numeracy & moral formation",
    ],
    accentColor: "border-emerald-600/30 hover:border-emerald-600",
    badgeColor: "bg-emerald-600 text-white",
  },
  {
    id: "reintegration",
    number: "03",
    slug: "reintegration",
    title: "Family Tracing & Reintegration",
    tagline: "Rebuilding Home Ties & Sustainable Futures",
    image: "/images/reintegration-graduation.webp",
    summary:
      "Connecting rehabilitated youth back to loving homes, formal schooling, or TVET apprenticeships, supported by a 12-month post-discharge aftercare safety net.",
    target: "Programme graduates & their families",
    location: "Countrywide Family Homes & Partner Institutions",
    duration: "12-Month Monitored Aftercare",
    points: [
      "In-depth social work, family tracing & mediation visits",
      "Formal school enrollment & educational sponsorship",
      "Apprenticeship placements & start-up artisan toolkits",
      "Regular home check-ins to prevent relapse & street re-entry",
    ],
    accentColor: "border-blue-500/30 hover:border-blue-500",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    id: "prevention",
    number: "04",
    slug: "prevention",
    title: "Prevention & Child Protection",
    tagline: "Stopping the Cycle Before it Starts",
    image: "/images/prevention.webp",
    summary:
      "Addressing systemic causes of youth displacement by strengthening household economies, providing positive parenting workshops, and raising awareness in schools.",
    target: "Caregivers, at-risk families & school students",
    location: "Slum communities, schools & local barazas",
    duration: "Ongoing Community Initiatives",
    points: [
      "Caregiver parenting clinics & positive discipline training",
      "Substance abuse awareness campaigns across local schools",
      "Support groups for vulnerable teenage mothers & youth",
      "Child rights advocacy in partnership with local authorities",
    ],
    accentColor: "border-teal-600/30 hover:border-teal-600",
    badgeColor: "bg-teal-600 text-white",
  },
  {
    id: "community-empowerment",
    number: "05",
    slug: "community-empowerment",
    title: "Community Empowerment & TVET",
    tagline: "Livelihoods & Long-Term Resilience",
    image: "/images/community-empowerment.webp",
    summary:
      "Equipping youth and vulnerable caregivers with marketable vocational trades—carpentry, tailoring, computer literacy, and modern organic agriculture.",
    target: "Youth, women & grassroots community groups",
    location: "Katani Community Workshops & Partner Hubs",
    duration: "3–6 Month Certified Courses",
    points: [
      "Vocational workshops: tailoring, carpentry & joinery",
      "Information technology & digital literacy training",
      "Sustainable organic kitchen gardening & poultry farming",
      "Entrepreneurship training, micro-grants & savings groups",
    ],
    accentColor: "border-indigo-500/30 hover:border-indigo-500",
    badgeColor: "bg-indigo-600 text-white",
  },
];

// ─── Journey Stages ────────────────────────────────────────────────────────
const pipelineStages = [
  {
    step: "Step 1",
    title: "Street Outreach",
    desc: "Active mapping and trust building to connect boys to safety.",
    icon: Users,
  },
  {
    step: "Step 2",
    title: "Intake & Detox",
    desc: "Health screening, medical clearance, and natural detoxification.",
    icon: Activity,
  },
  {
    step: "Step 3",
    title: "Therapeutic Rehab",
    desc: "6 months of 12-step therapy, education, and spiritual healing.",
    icon: Heart,
  },
  {
    step: "Step 4",
    title: "Family Reconciliation",
    desc: "Tracing relatives, counseling, and home mediation visits.",
    icon: Home,
  },
  {
    step: "Step 5",
    title: "Reintegration & Skills",
    desc: "School enrollment, vocational starter kits, and 12-month aftercare.",
    icon: GraduationCap,
  },
];

// ─── Core Pillars Standards ────────────────────────────────────────────────
const pillarsStandards = [
  {
    icon: ShieldCheck,
    title: "Therapeutic Community Model",
    desc: "Residents and dedicated social workers live together in a safe mini-community at Katani, cultivating mutual respect, emotional safety, and collective accountability.",
  },
  {
    icon: Activity,
    title: "12-Step & Natural Detox",
    desc: "Medically monitored withdrawal support combined with proven addiction recovery principles, spiritual reflections, and specialized trauma-informed counseling.",
  },
  {
    icon: BookOpen,
    title: "Bridge Education & TVET",
    desc: "Closing learning deficits through tailored numeracy, literacy classes, and certified vocational trades ensuring every youth graduates with marketable skills.",
  },
  {
    icon: Award,
    title: "Documented 12-Month Aftercare",
    desc: "Recovery doesn't end at discharge. Social workers maintain regular follow-ups, school visits, and home check-ins to secure lasting sobriety and stability.",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 font-sans text-foreground overflow-x-hidden">
      <SEO
        title="Rehabilitation Programmes & Services in Kenya | NLMRC"
        description="Explore accredited rehabilitation services in Kenya: Street Children Rescue, Addiction & Detox Rehabilitation, Youth Reintegration, and Community Empowerment by NLMRC."
        keywords="accredited rehab centers, best rehabilitation centres in kenya, affordable rehabilitation centres in kenya, christian rehabilitation centres in kenya, alcohol rehabilitation centre, addiction treatment centers, drug rehabilitation center, nlmrc services"
        canonical="https://www.newlifemwangaza.org/services"
      />
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20">
        {/* ─── The 5 Pillars Overview Cards ───────────────────────────────── */}
        <section id="pillars-overview" className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[hsl(var(--orange))] bg-orange-500/10 dark:bg-orange-950/40 px-3 py-1 rounded-full">
                Core Interventions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Our Core Programmes
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Each programme addresses a specific, vital stage in breaking the cycle of homelessness, drug addiction, and despair.
              </p>
            </div>

            {/* 5-Column Responsive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, index) => (
                <div
                  key={p.id}
                  className={`group bg-card rounded-2xl border-2 ${p.accentColor} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    index === 3 || index === 4 ? "lg:col-span-1" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Number */}
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${p.badgeColor}`}>
                        {p.number}
                      </span>
                    </div>

                    {/* Image Preview with Hover Zoom */}
                    <div className="h-44 rounded-xl overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {p.summary}
                      </p>
                    </div>

                    {/* Quick Feature Checklist */}
                    <ul className="space-y-2 pt-2 border-t border-border/60">
                      {p.points.slice(0, 3).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Link */}
                  <div className="pt-6 mt-4 border-t border-border">
                    <Link
                      to={`/services/${p.slug}`}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-foreground group-hover:bg-primary group-hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200"
                    >
                      <span>Explore {p.title.split(" ")[0]} Programme</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Extra 6th Card: Admissions & Referral Help Desk */}
              <div className="bg-gradient-to-br from-primary via-emerald-800 to-[#0c2e17] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/20 text-white">
                    Need Help?
                  </span>
                  <h3 className="text-2xl font-black">
                    Admissions & Crisis Referrals
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Do you know a street boy or young person struggling with substance abuse who needs shelter, inpatient rehabilitation, or family mediation?
                  </p>
                  <div className="space-y-2.5 pt-2 text-xs text-emerald-100">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[hsl(var(--orange))]" />
                      <span>+254 795 822 903</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[hsl(var(--orange))]" />
                      <span>office@newlifemwangaza.org</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[hsl(var(--orange))]" />
                      <span>Katani, Machakos County</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/20">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[hsl(var(--orange))] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-transform"
                  >
                    Contact Admission Desk
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Continuum of Care Flowchart ─────────────────────────────────── */}
        <section className="py-16 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Integrated Pipeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                The Journey From Street to Self-Reliance
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                No step is left to chance. Our integrated care model transitions every client from crisis to sustainable community life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {pipelineStages.map((st, idx) => {
                const IconComponent = st.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:border-primary/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[hsl(var(--orange))]">
                          {st.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">{st.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── In-Depth Editorial Showcase for All 5 Pillars ───────────────── */}
        <section className="py-20 space-y-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {pillars.map((pillar, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={pillar.id}
                  id={`detail-${pillar.slug}`}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-10 lg:gap-16 items-center py-12 border-b border-border last:border-b-0`}
                >
                  {/* Media Visual Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-border group">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--orange))]">
                        Comprehensive Intervention
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>

                    {/* Scope & Delivery Grid */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Key Service Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pillar.points.map((point, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-card border border-border flex items-start gap-2.5 text-xs text-foreground/90 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Link to Subpage */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Button asChild className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold text-xs uppercase tracking-wider">
                        <Link to={`/services/${pillar.slug}`}>
                          View Full {pillar.title} Page
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>

                      <Button asChild variant="outline" className="gap-2 text-xs font-semibold">
                        <Link to="/contact">
                          Inquire About Admissions
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Clinical & Care Standards ───────────────────────────────────── */}
        <section className="py-20 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[hsl(var(--orange))] bg-orange-500/10 dark:bg-orange-950/40 px-3 py-1 rounded-full">
                Professional Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Why Our Approach Works
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Grounding our care in the NLMRC Strategic Plan, evidence-based addiction psychology, and compassionate Christian mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillarsStandards.map((std, i) => {
                const IconComponent = std.icon;
                return (
                  <Card key={i} className="border border-border/80 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-foreground">{std.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{std.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Live Impact Testimonies / Stories ────────────────────────────── */}
        <StoriesPreview />

        {/* ─── Final Call to Action ────────────────────────────────────────── */}
        <section className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c2e17] via-[#103b1e] to-[#0a1e12] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[hsl(var(--orange))]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-2xl relative z-10 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[hsl(var(--orange))] text-xs font-bold uppercase tracking-widest border border-white/15">
                Take Action Today
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Help Us Restore Hope and Transform Another Life
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Whether you wish to sponsor a boy's 6-month rehabilitation, volunteer your professional skills, or refer a vulnerable street child, your support creates permanent generational change.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white font-bold gap-2 text-sm shadow-xl">
                  <Link to="/donate">
                    <Heart className="w-4 h-4 fill-current" />
                    Sponsor a Child's Rehab
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold gap-2 text-sm">
                  <Link to="/volunteer">
                    Volunteer With Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
