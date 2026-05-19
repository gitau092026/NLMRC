import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Values from "@/components/Values";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div>
        <About />
        <Mission />
        <Values />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
