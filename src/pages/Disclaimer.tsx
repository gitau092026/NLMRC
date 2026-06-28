import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-green">Disclaimer</h1>
      
      <div className="space-y-6 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">General Information</h2>
          <p>The information provided by New Life Mwangaza Rehabilitation Centre (NLMRC) on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">External Links</h2>
          <p>The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Professional Disclaimer</h2>
          <p>The site cannot and does not contain medical/health advice. The medical/health information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical/health advice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Affiliates Disclaimer</h2>
          <p>The site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to Google AdSense.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
          <p>If you have any questions about this disclaimer, please <Link to="/contact" className="text-[hsl(var(--orange))] hover:underline">contact us</Link>.</p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
