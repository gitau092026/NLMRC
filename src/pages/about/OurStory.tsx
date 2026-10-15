import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Heart, Users, ArrowRight } from "lucide-react";
import Values from "@/components/Values";

// Optimised WebP assets (converted from .jpg)
import childrenLearning from "@/assets/story/children-learning.webp";
import childrenCommunity from "@/assets/story/children-community.webp";
import rebuildingFamilies from "@/assets/story/rebuilding-families.webp";
import empoweringYouth from "@/assets/story/empowering-youth.webp";
import changingCommunities from "@/assets/story/changing-communities.webp";

const OurStory = () => {
    return (
        <div className="min-h-screen bg-background font-sans overflow-x-hidden">
            <SEO
                title="About Our Christian Rehabilitation Centre in Kenya | NLMRC Story"
                description="Founded in 2008 with the Sisters of Mercy, New Life Mwangaza Rehabilitation Centre is an accredited Christian rehabilitation centre in Kenya rescuing and rehabilitating street youth in Katani, Machakos."
                keywords="christian rehabilitation centres in kenya, christian rehab center, christian based rehab facilities, accredited rehab centers, best rehab in kenya, best rehabilitation centre, nlmrc history, katani rehabilitation centre"
                canonical="https://www.newlifemwangaza.org/about/story"
            />
            <Navbar />

            {/* Bento Grid Content - Where It Started / Mission / Vision */}
            <section className="py-16 md:py-32 relative">
                <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

                        {/* Main History Card */}
                        <div className="md:col-span-8 bg-card rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green/10 transition-colors duration-500" />
                            <div className="relative z-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">Where It Started</h2>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-5">
                                    New Life Mwangaza Rehabilitation Centre was established in <strong className="text-foreground font-semibold">2008</strong>, following the completion of its rehabilitation facility at <strong className="text-foreground font-semibold">Katani, Mavoko sub-county, Machakos County</strong> - with the support of the Sisters of Mercy and founding partners. The Centre was born out of a felt need to address the growing crisis of street-connected children and youth affected by drug and substance abuse in Nairobi and its environs.
                                </p>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-5">
                                    At the time, many organisations were working with children in street situations across informal settlements, yet a critical gap existed: there was no specialist drug rehabilitation programme tailored to the unique needs of young people with severe substance use challenges. NLMRC was created to fill exactly that gap. The name <em className="text-green font-medium">Mwangaza</em> - Swahili for <em className="text-green font-medium">"light"</em> - reflects the founding conviction that every child deserves to be brought out of darkness and into a life of dignity and purpose.
                                </p>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-5">
                                    Since 2008, NLMRC has grown into a fully-fledged transition centre offering rescue, residential rehabilitation, counselling, numeracy and literacy, life skills, family reunification, and community reintegration - all tailored for street-connected children and youth aged <strong className="text-foreground font-semibold">14 to 17 years</strong>. The Centre consistently rehabilitates <strong className="text-foreground font-semibold">64 boys every year</strong>, walking alongside each child for six months of structured, therapeutic recovery.
                                </p>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                    Today, NLMRC is fully registered as a Charitable Children's Institution with an active Board of Management under a registered Board of Trustees. We partner with local governments, churches, schools, the Department of Children Services, and community structures to prevent children from joining the streets and to address the root causes - poverty, family breakdown, and drug accessibility - at their source.
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="md:col-span-4 bg-green text-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Our Mission</h3>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg font-light">
                                    To prevent children and youth from living and working on the streets and to rescue, rehabilitate, and reintegrate street-connected children and youth through a holistic strategy that places families and communities at the centre of child protection.
                                </p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="md:col-span-5 bg-orange text-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Our Vision</h3>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg font-light">
                                    A society where street-connected children and youth live in a family setup, leading useful and drug-free lives.
                                </p>
                            </div>
                        </div>

                        {/* Image Card */}
                        <div className="md:col-span-7 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group min-h-[250px] md:min-h-[300px] shadow-sm hover:shadow-xl transition-shadow duration-500">
                            <img
                                loading="lazy"
                                decoding="async"
                                src={childrenLearning}
                                alt="African children learning"
                                width={960}
                                height={640}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach - P&3R Model */}
            <section className="py-16 md:py-24 bg-card border-y border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-green">Our Approach</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                            The <span className="text-green">P&3R Model</span> - How We Work
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg font-light max-w-3xl mx-auto leading-relaxed">
                            NLMRC's work is anchored on the nationally recognised <strong className="text-foreground">Prevention, Rescue, Rehabilitation and Reintegration (P&3R)</strong> model, guided by Kenya's National Policy on Rehabilitation of Street Families.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        {[
                            { step: "01", color: "bg-green/10 text-green border-green/20", title: "Prevention", desc: "We work with families, caregivers, and communities to address the root causes of street life - poor parenting, poverty, drug access - before children ever reach the streets." },
                            { step: "02", color: "bg-orange/10 text-orange border-orange/20", title: "Rescue", desc: "Our social workers conduct regular street visits to identify, build trust with, and recruit willing clients aged 14–18 from the streets of Nairobi, Machakos, Kiambu, and Kajiado." },
                            { step: "03", color: "bg-green/10 text-green border-green/20", title: "Rehabilitation", desc: "A 6-month residential programme using the 12-steps model and therapeutic community approach - group therapy, individual counselling, literacy & numeracy, spiritual care, and medical support." },
                            { step: "04", color: "bg-orange/10 text-orange border-orange/20", title: "Reintegration", desc: "Clients are reunited with families and placed in vocational training or formal schools. We provide tools of trade, psychosocial follow-up, and support to alumni to prevent relapse." },
                        ].map((item, i) => (
                            <div key={i} className={`rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 border ${item.color} bg-background hover:shadow-lg transition-shadow duration-300`}>
                                <div className={`text-4xl font-black mb-4 ${item.color.split(" ")[1]}`}>{item.step}</div>
                                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Therapeutic Community highlight */}
                    <div className="bg-green rounded-[2rem] p-6 sm:p-8 md:p-10 text-white">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Therapeutic Community Model</h3>
                            <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mb-3">
                                NLMRC uses a <strong className="text-white">participative therapeutic community model</strong> where clients and staff live together as a "mini community." This group approach - inspired by the 12-steps model of addiction recovery - fosters peer accountability, mutual respect, and shared growth. Each client undergoes thorough medical and psychological screening at entry and follows an Individual Treatment Plan (ITP) reviewed weekly by the clinical team.
                            </p>
                            <p className="text-white/85 text-base md:text-lg font-light leading-relaxed">
                                After completing the 6-month programme, clients are supported with school or vocational placement, basic provisions, and trade tools - and receive continuous psychosocial follow-up to prevent relapse and ensure lasting reintegration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-16 md:py-24 text-white relative overflow-hidden bg-green">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">What We Do</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Transforming Lives, <span className="text-orange">One Child at a Time</span>
                        </h2>
                        <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
                            NLMRC provides a unique residential drug rehabilitation programme for street-connected boys aged 14–18. Located in the serene surroundings of Katani, south of Nairobi, our services cover the full journey from the street to a productive, drug-free life.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { title: "Rescue & Shelter",              desc: "Street visits and mapping identify willing clients. After medical and psychological screening, clients are admitted to a safe residential environment with meals, clothing, and basic needs met." },
                            { title: "Numeracy, Literacy & Life Skills", desc: "Accelerated remedial education in literacy and numeracy, vocational orientation sessions, career exposure visits, and life-skills training to equip each child for independence." },
                            { title: "Counselling & Therapy",          desc: "Certified counsellors deliver group therapy, one-on-one sessions, family conferencing, and catechism-based spiritual care. Natural detoxification and psychiatric support are provided where needed." },
                            { title: "Family Reunification",           desc: "Home tracing, family therapy, reconciliation planning, and caregiver empowerment forums ensure that children return to a changed, supportive family environment prepared to receive them." },
                            { title: "Medical Care",                   desc: "Full medical check-ups, health education, and treatment on admission. Continuous health monitoring throughout the 6-month programme, including management of substance dependency." },
                            { title: "Aftercare & Reintegration",      desc: "Placement in vocational training centres or formal schools, provision of trade tools, alumni associations, and continuous psychosocial follow-up calls and home visits to prevent relapse." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 hover:bg-white/20 transition-colors duration-300">
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-white/75 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why We Exist - real census stats */}
            <section className="py-16 md:py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-orange">Why We Exist</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                                The Crisis That <span className="text-green">Called Us</span> to Act
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-5">
                                Kenya's 2018 National Census of Street Families counted <strong className="text-foreground font-semibold">46,639 people</strong> living on or connected to the streets - with Nairobi alone accounting for <strong className="text-foreground font-semibold">15,337</strong>. Of these, <strong className="text-foreground font-semibold">45.3% are youth</strong> and <strong className="text-foreground font-semibold">33.8% are children</strong>. Nearly a quarter are orphans; one in five do not know where their parents are.
                            </p>
                            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-5">
                                Behind every statistic is a child - driven to the streets by broken families, extreme poverty, domestic violence, or substance abuse in their communities. Without specialist intervention, these children face exploitation, deepening addiction, and a lifetime cut short.
                            </p>
                            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8">
                                New Life Mwangaza exists because every child has the right to a safe childhood, an education, and a future. Guided by faith, compassion, and professional expertise, we step in where systems have failed - to be the family these children never had.
                            </p>
                        </div>
                        <div className="rounded-[2rem] overflow-hidden min-h-[350px] md:min-h-[480px] relative group shadow-xl">
                            <img
                                loading="lazy"
                                decoding="async"
                                src={childrenCommunity}
                                alt="African kids in community"
                                width={960}
                                height={640}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-sm md:text-base font-medium italic">"Every child deserves to shine - that is what Mwangaza means."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Numbers Section */}
            <section className="py-16 md:py-24 bg-card border-y border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-green">Our Impact</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Numbers That <span className="text-green">Tell the Story</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        {[
                            { number: "2008",   label: "Year Founded",                    color: "text-green" },
                            { number: "64",     label: "Boys Rehabilitated Every Year",   color: "text-orange" },
                            { number: "85%",    label: "Family Retention Rate",           color: "text-green" },
                            { number: "4",      label: "Counties Covered",                color: "text-orange" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-background rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 text-center border border-border/50 hover:shadow-lg transition-shadow duration-300">
                                <div className={`text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-tight ${stat.color}`}>{stat.number}</div>
                                <p className="text-muted-foreground text-sm md:text-base font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                    {/* Community Impact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { img: rebuildingFamilies,  w: 800, h: 533, title: "Rebuilding Families",   desc: "Caregiver empowerment forums, positive parenting training, family therapy and reconciliation sessions ensure that children return to a changed home - one that is ready and able to receive them." },
                            { img: empoweringYouth,     w: 800, h: 533, title: "Empowering Youth",      desc: "Graduates are placed in vocational training centres, apprenticeships, or formal schools. NLMRC provides trade tools after training and links alumni to employers and business start-up support." },
                            { img: changingCommunities, w: 800, h: 533, title: "Changing Communities",  desc: "Through Nyumba Kumi initiatives, church partnerships, local administration, and community barazas, we build communities where fewer children ever reach the streets in the first place." },
                        ].map((card, i) => (
                            <div key={i} className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500 group bg-background">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        loading="lazy"
                                        decoding="async"
                                        src={card.img}
                                        alt={card.title}
                                        width={card.w}
                                        height={card.h}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight">{card.title}</h3>
                                    <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - real voices from the Strategic Plan */}
            <section className="py-16 md:py-24 bg-green text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">Voices of Hope</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            In Their Own <span className="text-orange">Words</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { quote: "Mwangaza taught me to live peacefully with other people. Now I am able to work in a workshop with my colleagues. I am also able to pay for my own rent.", name: "Bill*", role: "20-year-old Alumni" },
                            { quote: "I started studying electrical installation after Mwangaza. I realised I needed to change - and they believed in me when I didn't believe in myself.", name: "Kim*", role: "18-year-old, Vocational Skills Trainee" },
                            { quote: "My son was very mischievous and lacked respect before coming to Mwangaza. He spent most days in the streets. Now he is in school and very responsible - he even does household chores.", name: "Mary*", role: "Caregiver" },
                        ].map((t, i) => (
                            <div key={i} className="bg-white/10 border border-white/15 rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 flex flex-col gap-4">
                                <p className="text-white/90 text-base md:text-lg font-light leading-relaxed italic flex-1">"{t.quote}"</p>
                                <div>
                                    <p className="text-white font-semibold text-sm">{t.name}</p>
                                    <p className="text-white/60 text-xs">{t.role}</p>
                                    <p className="text-white/40 text-xs mt-0.5">* Name changed for privacy</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <Values />

            {/* Our Team Section */}
            <section className="py-16 md:py-24 bg-card border-y border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-orange">Our People</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                            Meet the <span className="text-green">Team</span>
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            Led by Director <strong className="text-foreground">Mrs. Jane Mburu</strong>, our qualified staff - social workers, counsellors, educators, and healthcare professionals - work as a therapeutic community alongside every child we serve.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-16 gap-6 bg-background rounded-[2rem] border border-border/50">
                        <div className="text-center max-w-md">
                            <h3 className="text-xl font-bold text-foreground mb-2">Team profiles coming soon</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We are updating this section with detailed profiles of our staff and volunteers.
                                In the meantime, feel free to reach out to us directly.
                            </p>
                        </div>
                        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-xl hover:bg-green/90 transition-colors duration-300 text-sm">
                            <ArrowRight className="w-4 h-4" /> Contact the Team
                        </a>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-16 md:py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-green">Partnerships</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                            Partners Who Make It <span className="text-green">Possible</span>
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            NLMRC collaborates with national and international partners committed to child welfare, rehabilitation, and community development.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { name: "HORIZONT3000", desc: "Lead technical and financial partner supporting NLMRC's strategic planning, capacity building, and programme development." },
                            { name: "DKA Austria", desc: "Development cooperation partner (Austria) providing project support and enabling NLMRC's rehabilitation and prevention programmes." },
                            { name: "eRko Slovakia", desc: "Christian Children Communities Movement (Slovakia) - a key partner supporting NLMRC's child protection work." },
                            { name: "Street Families Rehabilitation Trust Fund (SFRTF)", desc: "Kenyan government fund providing project support, policy guidance, and quarterly accountability reporting for NLMRC's programmes." },
                            { name: "Department of Children Services (DCS)", desc: "Government agency that handles court committals, child legal documentation, referrals, and centre inspections to ensure compliance." },
                            { name: "Local Community & Churches", desc: "Nyumba Kumi leaders, local administration, churches, and community barazas partner with NLMRC on outreach, security, and client reintegration support." },
                        ].map((p, i) => (
                            <div key={i} className="bg-card border border-border/50 rounded-[1.5rem] p-6 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-base font-bold text-foreground mb-2">{p.name}</h3>
                                <p className="text-muted-foreground text-sm font-light leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-background to-orange/5 pointer-events-none" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                        Be Part of the <span className="text-green">Mwangaza</span> Story
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                        Every donation, every volunteer hour, every prayer matters. Join us in bringing the light of hope to children who have known only darkness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/donate" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green text-white font-semibold rounded-2xl hover:bg-green/90 transition-colors duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base">
                            <Heart className="w-5 h-5" /> Donate Now
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-2xl hover:border-green hover:text-green transition-colors duration-300 text-base">
                            <Users className="w-5 h-5" /> Get Involved
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurStory;
