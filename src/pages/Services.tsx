import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import StoriesPreview from "@/components/StoriesPreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ServicesPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Our Services | New Life Mwangaza Rehabilitation Centre"
        description="Explore our services including Rescue, Rehabilitation, Reintegration, Prevention, and Community Empowerment programs dedicated to helping street children in Kenya."
        canonical="https://www.newlifemwangaza.org/services"
      />
      <Navbar />
      <div>
        <section className="pt-16 pb-4 bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                What We Do
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Transforming lives through compassion and action
              </p>
            </div>
          </div>
        </section>
        <Services />
        <StoriesPreview />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
