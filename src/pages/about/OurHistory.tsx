import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Values from "@/components/Values";
import Footer from "@/components/Footer";

const OurHistory = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />
            <div>
                <About />
                <Mission />
                <Values />

                {/* Detailed Interventions */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-green text-green-foreground rounded-2xl p-6 md:p-10 shadow-lg">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                                OUR INTERVENTIONS
                            </h3>
                            <p className="text-green-foreground/90 leading-relaxed text-center max-w-4xl mx-auto text-sm md:text-base">
                                Our interventions encompass Rescue, Rehabilitation, Reintegration, and Prevention.
                                In collaboration with like-minded agencies, we identify, prepare, and assess clients
                                during street work sessions, admitting 64 boys annually to our transition center for
                                a 6-month residential rehabilitation program, which includes counseling, psychiatric
                                support, and education tailored to their needs. After successful completion, clients
                                are reunified with their families and enrolled in vocational training or formal education,
                                with ongoing psycho-social support.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default OurHistory;
