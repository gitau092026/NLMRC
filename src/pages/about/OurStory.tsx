import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Target, Flag, Heart, MapPin, Users, ArrowRight, Home, BookOpen, Brain, Stethoscope, Sprout } from "lucide-react";
import { motion } from "framer-motion";

// Local image assets
import heroChildren from "@/assets/story/hero-children.jpg";
import childrenLearning from "@/assets/story/children-learning.jpg";
import socialWorkerCommunity from "@/assets/story/social-worker-community.jpg";
import childrenCommunity from "@/assets/story/children-community.jpg";
import rebuildingFamilies from "@/assets/story/rebuilding-families.jpg";
import empoweringYouth from "@/assets/story/empowering-youth.jpg";
import changingCommunities from "@/assets/story/changing-communities.jpg";

const OurStory = () => {
    return (
        <div className="min-h-screen bg-background font-sans overflow-x-hidden">
            <Navbar />

            {/* Modern Hero Section */}
            <section className="relative h-[65vh] min-h-[400px] flex items-center justify-center overflow-hidden rounded-b-[2.5rem] md:rounded-b-[5rem] bg-black">
                <div className="absolute inset-0 z-0">
                    <motion.img 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        src={heroChildren} 
                        alt="African children smiling" 
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10" />
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 shadow-xl">
                            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">Origins & History</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                            A Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-orange">Hope</span>
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Content */}
            <section className="py-16 md:py-32 relative">
                {/* Decorative background blobs */}
                <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                        
                        {/* Main History Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="md:col-span-8 bg-card rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green/10 transition-colors duration-500" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-green/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                                    <Clock className="w-7 h-7 md:w-8 md:h-8 text-green" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">Where It Started</h2>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                    Due to the increased number of youth on the streets of Nairobi, Machakos, Kiambu, and Kajiado, the Sisters of Mercy started our organization with a simple yet profound mission: to provide a safe haven for children living on the streets. What started as a small feeding program has blossomed into a comprehensive rehabilitation and reintegration center. Through the years, we have touched thousands of lives, providing not just meals, but education, counseling, and a place to call home.
                                </p>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="md:col-span-4 bg-green text-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <Target className="w-12 h-12 md:w-14 md:h-14 text-white/80 mb-6 md:mb-8" />
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Our Mission</h3>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg font-light">
                                    To prevent children and youth from living and working on the streets and to rescue, rehabilitate, and reintegrate street-connected children through holistic, family- and community-centred approaches.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-5 bg-orange text-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between min-h-[250px] md:min-h-[300px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <Flag className="w-12 h-12 md:w-14 md:h-14 text-white/80 mb-6 md:mb-8" />
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Our Vision</h3>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg font-light">
                                    A society where street-connected children and youth live in a family setup, leading useful and drug-free lives.
                                </p>
                            </div>
                        </motion.div>

                        {/* Image Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:col-span-7 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group min-h-[250px] md:min-h-[300px] shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <img 
                                src={childrenLearning} 
                                alt="African children learning" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
                        </motion.div>



                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-16 md:py-24 text-white relative overflow-hidden">
                {/* Background image with dark green overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={socialWorkerCommunity}
                        alt="Social worker with African children"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>
                {/* Watermark text removed */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">What We Do</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                            Transforming Lives, <span className="text-orange">One Child at a Time</span>
                        </h2>
                        <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
                            New Life Mwangaza Rehabilitation Centre offers a comprehensive range of services designed to rescue, restore, and reintegrate street-connected children back into society.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { icon: Home, title: "Rescue & Shelter", desc: "We provide immediate, safe shelter for children found living on the streets — a warm bed, nutritious meals, and a place they can call home." },
                            { icon: BookOpen, title: "Education & Training", desc: "Every child deserves an education. We offer formal schooling, literacy programs, and vocational skills training to equip them for life." },
                            { icon: Brain, title: "Counselling & Therapy", desc: "Certified counsellors work with each child to heal trauma, rebuild self-worth, and develop the emotional resilience needed to thrive." },
                            { icon: Users, title: "Family Reunification", desc: "Where safe, we actively work to trace and reunite children with their families, providing ongoing support to ensure lasting reintegration." },
                            { icon: Stethoscope, title: "Medical Care", desc: "Children receive full medical check-ups, treatment, and health education — including programmes for those battling drug dependency." },
                            { icon: Sprout, title: "Community Reintegration", desc: "We partner with local communities to ensure children are welcomed back and supported long after they leave our centre." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 group flex flex-col items-center text-center sm:items-start sm:text-left">
                                <div className="mb-4 bg-white/10 p-3 rounded-2xl w-fit flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-white/90" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-white/75 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why We Exist Section */}
            <section className="py-16 md:py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-orange">Why We Exist</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
                                The Crisis That <span className="text-green">Called Us</span> to Act
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-6">
                                Kenya has hundreds of thousands of street children. Behind every statistic is a child — hungry, cold, and invisible to the world. Many have fled violence, extreme poverty, or abandonment. Without intervention, they face exploitation, substance abuse, and a lifetime cut short.
                            </p>
                            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8">
                                New Life Mwangaza exists because every child has the right to a safe childhood, an education, and a future. We refuse to look away. Guided by faith, compassion, and professional expertise, we step in where systems have failed — to be the family these children never had.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Faith-Driven", "Child-Centred", "Community-Focused", "Holistic Care"].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-green/10 text-green text-sm font-medium border border-green/20">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className="rounded-[2rem] overflow-hidden min-h-[350px] md:min-h-[480px] relative group shadow-xl">
                            <img src={childrenCommunity}
                                alt="African kids in community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-sm md:text-base font-medium italic">"Every child deserves to shine — that is what Mwangaza means."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Numbers Section */}
            <section className="py-16 md:py-24 bg-card border-y border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-green">Our Impact</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Numbers That <span className="text-green">Tell the Story</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        {[
                            { number: "2,500+", label: "Children Rescued", color: "text-green" },
                            { number: "85%", label: "Family Reunification Rate", color: "text-orange" },
                            { number: "4", label: "Counties Covered", color: "text-green" },
                            { number: "20+", label: "Years of Service", color: "text-orange" },
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-background rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 text-center border border-border/50 hover:shadow-lg transition-all duration-300">
                                <div className={`text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-tight ${stat.color}`}>{stat.number}</div>
                                <p className="text-muted-foreground text-sm md:text-base font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Community Impact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { img: rebuildingFamilies, title: "Rebuilding Families", desc: "We don't just help children — we restore entire family units, providing parenting support, mediation, and follow-up care to ensure lasting reconciliation." },
                            { img: empoweringYouth, title: "Empowering Youth", desc: "Our vocational training graduates are running small businesses, employed in formal sectors, and becoming role models in their own communities." },
                            { img: changingCommunities, title: "Changing Communities", desc: "By addressing the root causes of street life, we work with local leaders, churches, and schools to build communities where no child ends up on the street." },
                        ].map((card, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 group bg-background">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight">{card.title}</h3>
                                    <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-background to-orange/5 pointer-events-none" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
                            Be Part of the <span className="text-green">Mwangaza</span> Story
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                            Every donation, every volunteer hour, every prayer matters. Join us in bringing the light of hope to children who have known only darkness.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/donate" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green text-white font-semibold rounded-2xl hover:bg-green/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base">
                                <Heart className="w-5 h-5" /> Donate Now
                            </a>
                            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-2xl hover:border-green hover:text-green transition-all duration-300 text-base">
                                <Users className="w-5 h-5" /> Get Involved
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurStory;
