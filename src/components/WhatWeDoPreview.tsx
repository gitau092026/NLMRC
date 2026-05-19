import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Home, Shield, Lightbulb } from "lucide-react";
import rehabilitationImage from "@/assets/IMG_20251111_145011_837.webp"; 

const WhatWeDoPreview = () => {
  const services = [
    { title: "Rescue", icon: Heart },
    { title: "Rehabilitation", icon: Users },
    { title: "Reintegration", icon: Home },
    { title: "Prevention", icon: Shield },
    { title: "Community Empowerment", icon: Lightbulb },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(var(--orange))]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(var(--orange))]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content side */}
          <div className="space-y-8 relative z-10">
            <div className="inline-block px-4 py-1.5 bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))] rounded-full text-sm font-semibold tracking-wide">
              OUR SERVICES
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              What We Do
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              New Life Mwangaza Rehabilitation Centre focuses on transforming the lives of street-connected children and youth. Our core programs are designed to provide holistic care and a supportive environment for those who need it most, empowering them to lead fulfilling, self-reliant lives.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={service.title} 
                    className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-border/50 shadow-sm hover:border-[hsl(var(--orange))]/30 hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-[hsl(var(--orange))]/10 p-1.5 rounded-lg text-[hsl(var(--orange))]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground/90">{service.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link to="/services">
                <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  Read More
                  <svg 
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image side */}
          <div className="relative z-10 lg:h-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl group border-4 border-white/50">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              src={rehabilitationImage} 
              alt="Rehabilitation Program" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            
            {/* Glassmorphism card overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white font-medium text-lg leading-snug">
                "Empowering lives through compassion and action."
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoPreview;
