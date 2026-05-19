import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Interventions from "@/components/Interventions";
import About from "@/components/About";
import Events from "@/components/Events";
import WhatWeDoPreview from "@/components/WhatWeDoPreview";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import Mission from "@/components/Mission";
import Stats from "@/components/Stats";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="New Life Mwangaza Rehabilitation Centre - NLMRC"
        description="New Life Mwangaza Rehabilitation Centre (NLMRC) is a non-profit organization in Kenya dedicated to rescuing, rehabilitating, and reintegrating street children and empowering communities."
        keywords="NLMRC, New Life Mwangaza, Rehabilitation Centre Kenya, Street Children Kenya, NGO Kenya, Child Rescue, Community Empowerment"
        canonical="https://www.newlifemwangaza.org/"
      />
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <Interventions />
      <Stats />
      <Events />
      <WhatWeDoPreview />
      <Partners />
      <Footer />
    </div>
  );
};

export default Index;
