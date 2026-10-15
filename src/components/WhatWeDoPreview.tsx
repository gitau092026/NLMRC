import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import rehabilitationImg from "@/assets/IMG_20251111_145011_837.webp";
import reintegrationImg  from "@/assets/20230725_153032.webp";
import preventionImg     from "@/assets/IMG_20240925_171410_201.webp";
import communityImg      from "@/assets/story/changing-communities.webp";

const programmes = [
  {
    number: "01",
    title: "Rescue",
    slug: "rescue",
    tagline: "Reaching boys on the streets",
    description:
      "Through outreach visits, client mapping, and partner referrals we identify and safely bring street-connected boys into a place of care - the first step toward a new life.",
    image: "https://images.unsplash.com/photo-1739506314315-c7aff0d98d55?q=80&w=900&auto=format&fit=crop",
    accent: "bg-orange",
  },
  {
    number: "02",
    title: "Rehabilitation",
    slug: "rehabilitation",
    tagline: "Healing minds, restoring dignity",
    description:
      "A 6-month residential programme offering therapy, education, vocational skills, family counselling, and natural detox - rebuilding the whole person in a safe community.",
    image: rehabilitationImg,
    accent: "bg-green",
  },
  {
    number: "03",
    title: "Reintegration",
    slug: "reintegration",
    tagline: "Back where they belong",
    description:
      "We reunite youth with families, enroll them in schools or apprenticeships, provide trade tools, and offer ongoing psychosocial follow-up to prevent relapse.",
    image: reintegrationImg,
    accent: "bg-orange",
  },
  {
    number: "04",
    title: "Prevention",
    slug: "prevention",
    tagline: "Stopping the cycle before it starts",
    description:
      "Empowering caregivers, improving parenting skills, and engaging local communities to address root causes so fewer children ever reach the streets.",
    image: preventionImg,
    accent: "bg-green",
  },
  {
    number: "05",
    title: "Community Empowerment",
    slug: "community-empowerment",
    tagline: "Stronger communities, safer children",
    description:
      "Capacity building workshops, sustainable development projects, and advocacy networks that create systemic, lasting change at the community level.",
    image: communityImg,
    accent: "bg-orange",
  },
];

const WhatWeDoPreview = () => {
  return (
    <section id="programmes" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black bg-orange rounded-sm mb-4">
              Our Programmes
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
              Five Pillars of Change
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Our integrated approach covers every stage - from the street to a self-reliant life - ensuring no child falls through the cracks.
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-b-2 border-orange pb-0.5 hover:text-orange transition-colors duration-200 shrink-0"
          >
            View All Programmes
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Programme cards - horizontal 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-border overflow-hidden">
          {programmes.map((p) => (
            <Link
              key={p.slug}
              to={`/services/${p.slug}`}
              className="group flex flex-col overflow-hidden border-r border-border last:border-r-0 hover:bg-muted/40 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Number badge */}
                <div className={`absolute top-3 left-3 w-8 h-8 ${p.accent} flex items-center justify-center`}>
                  <span className="text-white text-[10px] font-black">{p.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-2 border-t border-border">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {p.tagline}
                </p>
                <h3 className="text-base font-black text-foreground group-hover:text-orange transition-colors duration-200 leading-snug">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 line-clamp-3">
                  {p.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange mt-2">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoPreview;
