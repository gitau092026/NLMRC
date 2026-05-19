import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16 pb-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>
                    <p className="mb-6 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
                            <p>
                                New Life Mwangaza Rehabilitation Centre ("NLMRC", "we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
                            <p className="">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address, telephone number, and physical address.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
                                <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving newsletters or marketing from us and your communication preferences.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Information</h2>
                            <p className="">We use your personal data in the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To register you as a new supporter, volunteer, or partner.</li>
                                <li>To process and deliver services including managing payments, fees, and charges.</li>
                                <li>To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</li>
                                <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting, and hosting of data).</li>
                                <li>To use data analytics to improve our website, services, marketing, customer relationships, and experiences.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Retention</h2>
                            <p>
                                We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Legal Rights</h2>
                            <p className="">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request access to your personal data.</li>
                                <li>Request correction of your personal data.</li>
                                <li>Request erasure of your personal data.</li>
                                <li>Object to processing of your personal data.</li>
                                <li>Request restriction of processing your personal data.</li>
                                <li>Request transfer of your personal data.</li>
                                <li>Right to withdraw consent.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Third-Party Links</h2>
                            <p>
                                This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Contact Us</h2>
                            <p className="mb-6">
                                If you have any questions about this privacy policy or our privacy practices, please contact us by clicking the button below:
                            </p>

                            <Link to="/contact">
                                <Button className="w-full sm:w-auto font-semibold">
                                    Contact Us
                                </Button>
                            </Link>
                        </section>


                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
