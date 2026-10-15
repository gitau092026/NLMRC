import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  HeartHandshake,
  GraduationCap,
  Users,
  CalendarHeart,
  Activity,
  Sprout,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  BookOpen,
  Award,
  Smile,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";


// ─── Volunteer Opportunities Data ─────────────────────────────────────────────
const VOLUNTEER_ROLES = [
  {
    id: "tutoring",
    title: "Education, Literacy & Tutoring",
    badge: "Most Needed",
    commitment: "2 - 6 hrs / week",
    schedule: "Weekdays or Saturdays",
    icon: GraduationCap,
    iconColor: "text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60",
    description:
      "Help boys transition back to formal school through accelerated literacy, English, Swahili, numeracy, and homework support in our Katani learning center.",
    skills: ["Basic English & Math", "Patience", "Homework Guidance"],
  },
  {
    id: "mentorship",
    title: "Youth Mentorship & Life Coaching",
    badge: "High Impact",
    commitment: "2 - 4 hrs / week",
    schedule: "Flexible / Weekends",
    icon: HeartHandshake,
    iconColor: "text-amber-700 bg-amber-100 dark:bg-amber-950/60",
    description:
      "Be a positive, trustworthy role model. Walk alongside a young person undergoing drug rehabilitation and emotional recovery through structured one-on-one sessions.",
    skills: ["Active Listening", "Emotional Maturity", "Role Modeling"],
  },
  {
    id: "vocational",
    title: "Vocational Trades & Skills Instructor",
    badge: "Empowerment",
    commitment: "4 - 8 hrs / week",
    schedule: "Weekday Workshops",
    icon: Sprout,
    iconColor: "text-blue-700 bg-blue-100 dark:bg-blue-950/60",
    description:
      "Equip youth with practical trades including tailoring, basic carpentry, electrical repairs, organic vegetable farming, or introductory computer skills.",
    skills: ["Technical Trade Knowledge", "Hands-on Training", "Creativity"],
  },
  {
    id: "psychosocial",
    title: "Counseling & Psychosocial Support",
    badge: "Specialized",
    commitment: "Flexible",
    schedule: "By Appointment",
    icon: Activity,
    iconColor: "text-rose-700 bg-rose-100 dark:bg-rose-950/60",
    description:
      "Support our resident psychologists and social workers with group counseling, trauma-informed art therapy, addiction support circles, and child case documentation.",
    skills: ["Psychology / Social Work background", "Trauma-informed Care", "Empathy"],
  },
  {
    id: "sports",
    title: "Sports, Arts & Expressive Therapy",
    badge: "Fun & Engaging",
    commitment: "2 - 4 hrs / week",
    schedule: "Afternoons & Weekends",
    icon: Smile,
    iconColor: "text-purple-700 bg-purple-100 dark:bg-purple-950/60",
    description:
      "Coach recreational football matches, teach musical instruments, lead drama workshops, or organize team-building games that foster discipline and joy.",
    skills: ["Sports Coaching", "Music / Drama", "Youth Engagement"],
  },
  {
    id: "outreach",
    title: "Street Outreach & Welfare Teams",
    badge: "Field Work",
    commitment: "Monthly Drives",
    schedule: "Early Mornings / Evenings",
    icon: Users,
    iconColor: "text-teal-700 bg-teal-100 dark:bg-teal-950/60",
    description:
      "Join our frontline teams on street barazas in Mavoko and Nairobi to distribute nutritious meals, provide emergency first-aid, and build initial trust with street boys.",
    skills: ["Street Communication", "Street Resilience", "Team Coordination"],
  },
];

// ─── Journey Steps ────────────────────────────────────────────────────────────
const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Submit Application",
    desc: "Fill in our short volunteer interest form below, sharing your skills, availability, and motivation.",
  },
  {
    step: "02",
    title: "Friendly Conversation",
    desc: "Our volunteer coordinator will schedule a quick call to align on expectations and schedule requirements.",
  },
  {
    step: "03",
    title: "Orientation & Safeguarding",
    desc: "Receive our trauma-informed care orientation and complete standard child protection safeguarding checks.",
  },
  {
    step: "04",
    title: "Serve & Transform",
    desc: "Join our Katani Centre family and experience the deep fulfillment of rebuilding young lives.",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Do I need previous experience with street-connected children?",
    a: "Not necessarily! While specialized counseling roles require relevant qualifications, most roles (like tutoring, mentorship, sports coaching, and event support) simply require empathy, patience, dependability, and a willing heart. We provide full orientation.",
  },
  {
    q: "Can university or college students complete their academic attachment here?",
    a: "Yes! We regularly host undergraduate and diploma students in Social Work, Clinical Psychology, Community Development, Special Needs Education, and Nursing for certified practicums.",
  },
  {
    q: "What is the minimum time commitment expected?",
    a: "To provide consistency for our children, we recommend a minimum commitment of 2 to 4 hours per week for at least 3 months. However, special weekend workshops and single-day corporate volunteer drives are also welcomed.",
  },
  {
    q: "What child protection measures are in place?",
    a: "Child safety is our highest priority. All long-term volunteers complete a brief background verification, sign our Child Safeguarding Policy, and always work under the supervision of full-time Centre staff.",
  },
  {
    q: "Can church groups or corporate teams volunteer together?",
    a: "Absolutely! We love hosting corporate CSR teams, youth groups, and fellowship fellowships for community service days, gardening projects, sports days, and facility improvement initiatives.",
  },
];

const Volunteer = () => {
  const [selectedRole, setSelectedRole] = useState<string>("tutoring");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("Weekends");
  const [motivation, setMotivation] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedRoleObj = VOLUNTEER_ROLES.find((r) => r.id === selectedRole);
      const roleTitle = selectedRoleObj ? selectedRoleObj.title : selectedRole;

      const response = await fetch("https://formspree.io/f/xkogdylb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: "Volunteer Application",
          fullName,
          email,
          phone,
          preferredRole: roleTitle,
          availability,
          motivation,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Volunteer application submitted successfully!");
      } else {
        toast.error("Could not send application. Please try again or email us directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <SEO
        title="Volunteer in Kenya | Teaching, Mentorship & Community Work | NLMRC"
        description="Volunteer your skills and compassion at NLMRC in Katani, Kenya. High-impact volunteer opportunities in English teaching, youth mentorship, addiction rehabilitation counseling, and community work."
        keywords="volunteer opportunities in kenya, volunteer jobs in kenya, teaching jobs kenya, english teacher needed, community work jobs, available part time jobs, free rehabilitation centres in kenya, christian rehab, mentorship volunteer kenya, nlmrc volunteer"
        canonical="https://www.newlifemwangaza.org/volunteer"
      />
      <Navbar />

      {/* ─── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-gradient-to-br from-[#072412] via-[#0f3b1e] to-[#0a1e12] text-white overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[hsl(var(--orange))]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 text-center space-y-6">
          <Badge className="bg-[hsl(var(--orange))] text-white font-bold uppercase tracking-widest text-xs px-3.5 py-1.5 border-none shadow-md">
            Volunteer Community • Katani, Machakos
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Give Your Time. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-amber-200">
              Transform A Child's Future.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-light leading-relaxed">
            Lend your compassion, knowledge, and mentorship to rescue, rehabilitate, and reintegrate
            street-connected boys in Kenya. Every hour you give brings hope, healing, and dignity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white font-semibold px-8 h-12 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base"
            >
              Apply to Volunteer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 hover:bg-white/20 text-white border-white/25 h-12 font-medium text-base backdrop-blur-md"
            >
              <a href="#roles">Explore Opportunities</a>
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">400+</div>
              <p className="text-xs text-emerald-200/80 mt-1">Rehabilitated & Reunified</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">100%</div>
              <p className="text-xs text-emerald-200/80 mt-1">Community Driven</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">6+</div>
              <p className="text-xs text-emerald-200/80 mt-1">Specialized Volunteer Tracks</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">Katani</div>
              <p className="text-xs text-emerald-200/80 mt-1">Dedicated Centre in Machakos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Volunteer With Us ───────────────────────────────────────────── */}
      <section className="py-20 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
              Why Join NLMRC
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Rewarding, Purpose-Filled Experience
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Volunteering at New Life Mwangaza is not busywork. You work directly on the frontlines
              of holistic youth restoration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-7 border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Tangible, Lifelong Impact</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Witness firsthand a boy overcome substance addiction, learn how to read, gain a tailoring or carpentry trade, and return home to a joyful family reunion.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-7 border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Trauma-Informed Growth</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gain hands-on training from seasoned social workers, psychologists, and educators in trauma-informed child safeguarding, behavior management, and psychosocial care.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-7 border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">A Warm, Welcoming Team</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Become part of an interconnected family of staff, volunteers, alumni, and community partners committed to unconditional care and mutual encouragement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Volunteer Opportunities ─────────────────────────────────────────── */}
      <section id="roles" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
              Open Positions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Volunteer Opportunities & Service Tracks
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Whether you have 2 hours on a Saturday or several days a week, your unique skills have a place here. Select a track to apply.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOLUNTEER_ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  className={`bg-card rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 shadow-lg scale-[1.02]"
                      : "border-border shadow-sm hover:shadow-md hover:border-border/80"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${role.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-[11px] font-semibold">
                        {role.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-snug">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {role.commitment}
                        </span>
                        <span>•</span>
                        <span>{role.schedule}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
                        Helpful Skills:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/60">
                    <Button
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleSelectRole(role.id)}
                      className={`w-full text-xs font-semibold h-10 ${
                        isSelected
                          ? "bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white"
                          : ""
                      }`}
                    >
                      {isSelected ? "Selected in Application" : "Apply for This Role"}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── The Volunteer Journey ───────────────────────────────────────────── */}
      <section className="py-20 bg-background border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
              Simple 4-Step Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How Becoming a Volunteer Works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We make onboarding clear, supportive, and professional to ensure you are confident and equipped.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-primary/20 block mb-3 font-mono">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── Interactive Application Form ────────────────────────────────────── */}
      <section ref={formRef} className="py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge className="bg-[hsl(var(--green))] text-white text-xs uppercase tracking-wider font-semibold">
              Get Started
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Volunteer Application Form
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Tell us about yourself and where you would like to plug in. Our volunteer coordinator
              will review your details and get in touch within 48 hours.
            </p>
          </div>

          <Card className="border border-border/80 shadow-xl rounded-3xl overflow-hidden bg-card">
            <CardContent className="p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Application Received!</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-foreground">{fullName}</span>, for
                    stepping up to volunteer with New Life Mwangaza. Our team will review your interest
                    and reach out via email or phone shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setPhone("");
                      setMotivation("");
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Sarah Wanjiku"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-11 bg-background text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="sarah@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 bg-background text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Availability */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Phone / WhatsApp <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="+254 712 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 bg-background text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Preferred Availability
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="Weekends (Saturdays)">Weekends (Saturdays)</option>
                        <option value="Weekday Mornings">Weekday Mornings</option>
                        <option value="Weekday Afternoons">Weekday Afternoons</option>
                        <option value="Full-time Attachment / Internship">
                          Full-time Attachment / Internship
                        </option>
                        <option value="Flexible / Periodic Campaigns">
                          Flexible / Periodic Campaigns
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Service Track */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Area of Interest / Service Track <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {VOLUNTEER_ROLES.map((r) => (
                        <button
                          type="button"
                          key={r.id}
                          onClick={() => setSelectedRole(r.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            selectedRole === r.id
                              ? "bg-[hsl(var(--orange))]/10 border-[hsl(var(--orange))] text-[hsl(var(--orange))] font-semibold"
                              : "bg-muted/40 border-border hover:bg-muted text-foreground"
                          }`}
                        >
                          {r.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Motivation / Experience */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Brief Experience or Motivation <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Share a few sentences about why you want to volunteer, your educational/professional background, or any special skills you bring..."
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      className="bg-background text-sm resize-y"
                      required
                    />
                  </div>

                  {/* Notice & Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      Your details are kept strictly confidential under our Child Safeguarding Policy.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-12 px-8 bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white font-semibold text-sm shadow-md"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── Frequently Asked Questions ──────────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
              Got Questions?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-semibold text-foreground flex items-center justify-between gap-4 text-sm sm:text-base hover:bg-muted/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-foreground" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Direct Contact Strip ────────────────────────────────────────────── */}
      <section className="py-12 bg-card border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Need more information about volunteering?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Our coordination team is happy to assist with group visits, CSR initiatives, or international inquiries.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
              <a
                href="tel:+254795822903"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                +254 795 822 903
              </a>
              <a
                href="mailto:office@newlifemwangaza.org?subject=Volunteer%20Inquiry"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                office@newlifemwangaza.org
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white transition-colors"
              >
                Visit Contact Page
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Volunteer;
