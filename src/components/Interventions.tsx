import { Shield, Users, Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import rehabilitationImage from "@/assets/IMG_20251111_145011_837.webp"; // Family Therapy - Rehabilitation sidebar
import reintegrationImage from "@/assets/20230725_153032.webp"; // Reintegration Success - Reintegration sidebar
import preventionImage from "@/assets/IMG_20240925_171410_201.webp"; // Parent Empowered - Prevention sidebar
import communityImage from "@/assets/community-empowerment.webp"; // Community meeting/training session

const Interventions = () => {
  const steps = [
    {
      icon: Heart,
      title: "RESCUE",
      description: "We reach out to children on the streets, offering them safety and hope for a better future.",
      fullDescription: "Our rescue efforts are the first step in our commitment to transforming the lives of street-connected children and youth. We actively reach out to individuals living and working on the streets through street visits, client identification, mapping, collaboration with networks, client preparation, recruitment interviews, and linkage referrals.",
      link: "/services/rescue",
      image: "https://images.unsplash.com/photo-1739506314315-c7aff0d98d55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: Users,
      title: "REHABILITATION",
      description: "Our 6-month program helps youth heal, learn, and grow in a supportive, therapeutic community.",
      fullDescription: "Our residential rehabilitation program provides a holistic approach to recovery for street-connected boys aged 14-18 years. The 6-month program includes continuous assessments, group therapy, one-on-one counseling, literacy learning, home visits, reintegration planning, aftercare support, natural detoxification, psychiatric support, spiritual care, and family therapy.",
      link: "/services/rehabilitation",
      image: rehabilitationImage
    },
    {
      icon: Home,
      title: "REINTEGRATION",
      description: "We reunite youth with families and equip them with education and skills for self-reliance.",
      fullDescription: "Reintegration supports former street-connected children in returning to their families and communities. Our services include family reunification, placement in learning institutions, vocational skills training, apprenticeship opportunities, sponsorship, job placement assistance, provision of trade tools, continuous psychosocial follow-up, and relapse mitigation.",
      link: "/services/reintegration",
      image: reintegrationImage
    },
    {
      icon: Shield,
      title: "PREVENTION",
      description: "We empower families and communities to stop children from ending up in street situations.",
      fullDescription: "We believe prevention is the most effective way to address street-connected children. Our strategies focus on empowering families and communities through improving caregiver capacity, enhancing parenting skills, improving social-economic well-being, engaging local communities, empowering vulnerable teenage girls and mothers, and promoting children's rights and welfare.",
      link: "/services/prevention",
      image: preventionImage
    },
    {
      icon: Users,
      title: "COMMUNITY EMPOWERMENT",
      description: "Empowering communities through sustainable development, capacity building, and collaborative partnerships.",
      fullDescription: "We believe in the power of communities to drive change. Our community empowerment programs focus on building the capacity of local stakeholders, fostering sustainable development, and creating networks of support for vulnerable populations through workshops, projects, and advocacy.",
      link: "/services/community-empowerment",
      image: communityImage
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            LATEST <span className="text-[hsl(var(--orange))]">PROJECTS</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Organization set up to provide help and raise money for those in need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-white group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                {/* Featured Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[hsl(var(--orange))] text-sm font-bold uppercase mb-2 block">
                    {step.title}
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[hsl(var(--orange))] transition-colors">
                    {step.title} & Programs
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                    {step.fullDescription.substring(0, 120)}...
                  </p>

                  <Link
                    to={step.link}
                    className="text-[hsl(var(--orange))] text-sm font-bold uppercase tracking-wide hover:underline text-left"
                  >
                    Read More &gt;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Interventions;
