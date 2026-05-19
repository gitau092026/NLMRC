import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkogdylb", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      alert("There was a problem sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Contact Us | New Life Mwangaza Rehabilitation Centre"
        description="Get in touch with New Life Mwangaza Rehabilitation Centre (NLMRC). P.O BOX 153 - 00519 MLOLONGO. Located in Katani, Syokimau. Call +254 795 822 903 or email office@newlifemwangaza.org."
        canonical="https://www.newlifemwangaza.org/contact"
      />
      <Navbar />

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground ">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Have questions? We're here to help. Contact us through any of the following channels.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent rounded-full p-3">
                        <MapPin className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Address</h3>
                        <p className="text-muted-foreground">
                          P.O BOX 153 - 00519 MLOLONGO<br />
                          Katani, Syokimau
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent rounded-full p-3">
                        <Phone className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Phone</h3>
                        <a
                          href="tel:+254795822903"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +254 795 822 903
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent rounded-full p-3">
                        <Mail className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Email</h3>
                        <a
                          href="mailto:office@newlifemwangaza.org"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          office@newlifemwangaza.org
                        </a>
                        <br />
                        <a
                          href="mailto:mwangazarc@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          mwangazarc@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="text-lg text-gray-600 max-w-md">
                      Thank you for contacting us. We will get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        disabled={loading}
                      />
                    </div>

                    <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Visit Our Location
              </h2>
            </div>

            <a
              href="https://www.google.com/maps/dir//MX9R%2BFHH+Pridelands/@-1.3313125,36.9914844,10z/data=!4m8!4m7!1m0!1m5!1m1!1s0x182f7342baf62253:0x6fbda8ac3c560460!2m2!1d36.9914844!2d-1.3313125?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-2xl border border-border hover:shadow-3xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7634234567!2d36.9914844!3d-1.3313125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f7342baf62253%3A0x6fbda8ac3c560460!2sPridelands!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pridelands Location Map"
                  className="w-full pointer-events-none"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Click for Directions</span>
                  </div>
                </div>
              </div>
            </a>

            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/dir//MX9R%2BFHH+Pridelands/@-1.3313125,36.9914844,10z/data=!4m8!4m7!1m0!1m5!1m1!1s0x182f7342baf62253:0x6fbda8ac3c560460!2m2!1d36.9914844!2d-1.3313125?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
