import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ImpactPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Our Impact & Transformation Statistics | NLMRC Kenya"
        description="Explore verified impact metrics from New Life Mwangaza Rehabilitation Centre. 400+ street-connected youth rehabilitated, detoxified, and reintegrated with families in Kenya."
        keywords="best rehabilitation centres in kenya, youth rehabilitation impact, street children rehabilitation statistics, nlmrc impact, affordable rehabilitation centres in kenya"
        canonical="https://www.newlifemwangaza.org/impact"
      />
      <Navbar />
      <main className="flex-grow pt-[72px] md:pt-[88px] pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Our Impact Report</h1>
          <p className="text-muted-foreground">Impact report coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;
