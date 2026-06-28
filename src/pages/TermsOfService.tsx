import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-green">Terms of Service</h1>
      
      <div className="space-y-6 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Description of Service</h2>
          <p>New Life Mwangaza Rehabilitation Centre (NLMRC) provides users with access to a rich collection of resources, including various communications tools, forums, and personalized content. You also understand and agree that the service may include advertisements and that these advertisements are necessary for NLMRC to provide the Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. User Conduct</h2>
          <p>You agree to use the website only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others, or otherwise cause damage to the site or its content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Intellectual Property</h2>
          <p>All content included on this site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of NLMRC or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Limitation of Liability</h2>
          <p>In no event shall NLMRC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
          <p>If you have any questions about these Terms, please <Link to="/contact" className="text-[hsl(var(--orange))] hover:underline">contact us</Link>.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
