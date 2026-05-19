import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "rescue",
      title: "Rescue",
      image: "/images/rescue.webp",
      shortDescription: "We begin transforming lives of street-connected children and youth in Nairobi, Machakos, Kiambu, and Kajiado by actively rescuing and reaching out on the streets.",
      fullDescription: "Our rescue efforts are the first step in our commitment to transforming the lives of street-connected children and youth in Nairobi, Machakos, Kiambu, and Kajiado. We actively reach out to individuals living and working on the streets through:",
      points: [
        "Street Visits and Client Identification.",
        "Mapping Potential Clients.",
        "Collaboration with Existing Actors and Networks.",
        "Client Preparation.",
        "Recruitment Interviews.",
        "Linkage and Referrals."
      ]
    },
    {
      id: "rehabilitation",
      title: "Rehabilitation",
      image: "/images/rehabilitation.webp",
      shortDescription: "Our 6-month residential rehab in Katani, Machakos, offers a holistic 12-step program for street-connected boys (14-18) using a therapeutic community model.",
      fullDescription: "Our residential rehabilitation program provides a unique and holistic approach to the recovery and transformation of street-connected boys aged 14-18 years. Located in a serene environment in Katani, Machakos County, our program utilizes a therapeutic community model where clients and staff live together as a 'mini community'. The 6-month program is based on a 12-step approach and includes activities such as:",
      points: [
        "Continuous Assessments.",
        "Group Therapy.",
        "One-on-One Counseling.",
        "Literacy and Numeracy Learning.",
        "Home Visits.",
        "Reintegration Planning.",
        "Aftercare Support.",
        "Natural Detoxification and Psychiatric Support.",
        "Spiritual Care.",
        "Family Therapy and Counseling."
      ]
    },
    {
      id: "reintegration",
      title: "Reintegration",
      image: "/images/reintegration-graduation.webp",
      shortDescription: "Reintegration supports former street-connected children in returning to families and communities, focusing on self-reliance and helping them become productive, contributing members of society.",
      fullDescription: "Reintegration is a crucial phase where former street-connected children and youth are supported to return to their families and communities and build sustainable futures. Our reintegration services focus on empowering individuals to become self-reliant and contributing members of society. This includes:",
      points: [
        "Family Reunification.",
        "Placement in Learning Institutions.",
        "Placement in Vocational Skills Training Centers.",
        "Apprenticeship Opportunities.",
        "Sponsorship and Financial Support.",
        "Job Placement Assistance.",
        "Provision of Trade Tools.",
        "Continuous Psychosocial Follow-up.",
        "Relapse Mitigation."
      ]
    },
    {
      id: "prevention",
      title: "Prevention",
      image: "/images/prevention.webp",
      shortDescription: "We address street-connected child issues by focusing on prevention empowering families and communities to provide safe, nurturing environments that keep children off the streets.",
      fullDescription: "We believe that the most effective way to address the issue of street-connected children is to prevent them from ending up on the streets in the first place. Our prevention strategies focus on empowering families and communities to create a nurturing environment for children. Key initiatives include:",
      points: [
        "Improving Caregiver Capacity.",
        "Enhancing Parenting Skills.",
        "Improving Caregiver Social-Economic Well-being.",
        "Engaging the Local Community.",
        "Empowering Vulnerable Teenage Girls and Mothers.",
        "Promoting Children's Rights and Welfare."
      ]
    },
    {
      id: "community-empowerment",
      title: "Community Empowerment",
      image: "/images/community-empowerment.webp",
      shortDescription: "Empowering communities through sustainable development, capacity building, and collaborative partnerships.",
      fullDescription: "We believe in the power of communities to drive change. Our community empowerment programs focus on building the capacity of local stakeholders, fostering sustainable development, and creating networks of support for vulnerable populations.",
      points: [
        "Capacity Building Workshops.",
        "Sustainable Development Projects.",
        "Community Advocacy.",
        "Partnership Development.",
        "Resource Mobilization."
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-accent">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                {service.image ? (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center overflow-hidden">
                    <ImageIcon className="w-24 h-24 text-muted-foreground" strokeWidth={1} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
                    {service.title}
                  </h3>
                </div>

                <p className="text-foreground leading-relaxed text-lg">
                  {service.fullDescription}
                </p>

                <ul className="space-y-3">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent mt-1 text-xl">•</span>
                      <span className="text-muted-foreground leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
