import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Disclaimer | New Life Mwangaza Rehabilitation Centre"
        description="Medical and informational disclaimer for New Life Mwangaza Rehabilitation Centre (NLMRC). All guidance is educational and does not substitute for emergency medical care."
        canonical="https://www.newlifemwangaza.org/disclaimer"
        keywords="NLMRC disclaimer, rehabilitation centre medical advice disclaimer, substance abuse counselling disclaimer"
      />
      <Navbar />
      <main className="flex-grow pt-16 pb-12">
        <div className="container mx-auto px-4 py-16 max-w-4xl text-gray-800">
          <h1 className="text-4xl font-bold mb-8 text-primary">Disclaimer</h1>
          
          <div className="space-y-6 leading-relaxed">
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">General Information</h2>
              <p>The information provided by New Life Mwangaza Rehabilitation Centre (NLMRC) on this website is for general informational and educational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">External Links</h2>
              <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Professional Medical Disclaimer</h2>
              <p>The site content is provided for informational and educational purposes only and is not a substitute for professional medical advice, clinical diagnosis, or specialized addiction psychiatry. In emergencies, please seek immediate help from accredited medical professionals or emergency health services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
              <p>If you have any questions about this disclaimer, please <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
