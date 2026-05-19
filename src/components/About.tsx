import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Content */}
          <div className="space-y-8">
            <h4 className="text-[hsl(var(--orange))] font-bold uppercase tracking-wider text-sm">
              ABOUT NLMRC
            </h4>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              All children deserve to live in safe, nurturing homes to feel valued and loved.
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                New Life Mwangaza Rehabilitation Centre (NLMRC) is a Kenyan non-profit organization dedicated to rescuing, rehabilitating, and reintegrating street-connected children and youth, with a special focus on boys aged 14–18 affected by drug and substance abuse.
              </p>
              <p>
                Operating from a serene, purpose-built centre in Katani, NLMRC provides a safe residential environment, therapeutic interventions, education, vocational training, and aftercare support to help clients transition into self-reliant, drug-free lives.
              </p>
            </div>

            <Link to="/about">
              <Button
                className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white rounded-none px-8 py-3 uppercase tracking-wide font-medium"
              >
                Read More
              </Button>
            </Link>
          </div>

          {/* Right Content */}
          <div className="space-y-8 mt-8 lg:mt-0">
            <div className="text-center lg:text-right">
              <h4 className="text-[hsl(var(--orange))] font-bold uppercase tracking-wider text-sm mb-2">
                IN A MISSION SINCE 2008
              </h4>
              <p className="text-foreground font-medium">
                To help the Helpless and uplift the Society
              </p>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/W9iLCur6aJA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
