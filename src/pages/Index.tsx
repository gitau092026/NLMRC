import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import About         from "@/components/About";
import WhatWeDoPreview from "@/components/WhatWeDoPreview";
import Mission       from "@/components/Mission";
import Stats         from "@/components/Stats";
import StoriesPreview from "@/components/StoriesPreview";
import Partners      from "@/components/Partners";
import Footer        from "@/components/Footer";
import SEO           from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <SEO
      title="Best Rehabilitation Centres in Kenya | New Life Mwangaza Centre"
      description="New Life Mwangaza Rehabilitation Centre (NLMRC) is an accredited Christian rehabilitation centre in Kenya. Affordable youth addiction recovery, drug abuse rehab, education jobs, and child rescue in Katani, Machakos near Nairobi."
      keywords="best rehabilitation centres in kenya, affordable rehabilitation centres in kenya, christian rehabilitation centres in kenya, best rehabs in kenya, best rehabilitation centres in nairobi, addiction treatment centers near me, any rehabilitation centre near me, accredited rehab centers, education jobs in kenya, english teaching jobs in kenya, free rehabilitation centres in kenya, drug abuse rehab near me"
      canonical="https://www.newlifemwangaza.org/"
      schema={{
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "New Life Mwangaza Rehabilitation Centre",
        "alternateName": "NLMRC",
        "url": "https://www.newlifemwangaza.org",
        "logo": "https://www.newlifemwangaza.org/logo.webp",
        "description": "Accredited Christian rehabilitation centre in Kenya providing addiction treatment, street children rescue, natural detox, education, and family reintegration.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Katani Road",
          "addressLocality": "Syokimau, Katani",
          "addressRegion": "Machakos County",
          "postalCode": "00519",
          "addressCountry": "KE"
        },
        "telephone": "+254795822903",
        "email": "office@newlifemwangaza.org"
      }}
    />
    <Navbar />

    {/* 1. Hero - first impression, high-impact images + stats */}
    <Hero />

    {/* 2. About - who we are + YouTube video */}
    <About />

    {/* 4. Mission / Vision / Goal + Volunteer banner */}
    <Mission />

    {/* 5. Five Programmes - deep-linked cards visitors can click into */}
    <WhatWeDoPreview />

    {/* 6. Impact numbers - credibility */}
    <Stats />

    {/* 7. Impact stories - human connection */}
    <StoriesPreview />

    {/* 8. Partners carousel */}
    <Partners />

    <Footer />
  </div>
);

export default Index;
