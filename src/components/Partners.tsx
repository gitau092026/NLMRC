import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

import unicefLogo from "@/assets/unicef-logo.webp";
import saveChildrenLogo from "@/assets/save-children-logo.webp";
import redCrossLogo from "@/assets/red-cross-logo.webp";
import usaidLogo from "@/assets/usaid-logo.webp";
import euAidLogo from "@/assets/eu-aid-logo.webp";
import horizont3000Logo from "@/assets/horizont3000-logo.webp";
import erkoLogo from "@/assets/erko-logo.webp";

const Partners = () => {
  const partners = [
    {
      name: "Street Families Rehabilitation Trust Fund",
      description: "Supporting children's rights and welfare",
      logo: unicefLogo,
      url: "https://sfrtf.go.ke/home"
    },
    {
      name: "Rotary Club of Syokimau",
      description: "Child protection initiatives",
      logo: saveChildrenLogo,
      url: "https://www.facebook.com/rotaryclubsyokimau/"
    },
    {
      name: "Dobra novina",
      description: "Humanitarian assistance",
      logo: redCrossLogo,
      url: "https://www.dobranovina.sk/"
    },
    {
      name: "Weza Care Solution",
      description: "Development partner",
      logo: usaidLogo,
      url: "https://www.wezacare.org/"
    },
    {
      name: "Dreikönigsaktion",
      description: "European Union support",
      logo: euAidLogo,
      url: "https://dka.at/"
    },
    {
      name: "Horizont3000",
      description: "Organization for Development Co-operation",
      logo: horizont3000Logo,
      url: "https://horizont3000.org/en"
    },
    {
      name: "eRko",
      description: "Christian Children Communities Movement",
      logo: erkoLogo,
      url: "https://erko.sk/en/"
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            OUR <span className="text-[hsl(var(--orange))]">PARTNERS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Together with our partners, we create lasting impact in communities across the region.
          </p>
        </div>

        {/* Partners Carousel - Interactive & Auto-scrolling */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {partners.map((partner, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-lg p-4 shadow-sm border border-border/50 hover:shadow-xl hover:border-green/30 transition-all duration-300 hover:-translate-y-2 flex items-center justify-center h-24"
                >
                  {/* Logo Image */}
                  <div className="w-full h-16 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                    />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in partnering with us?
          </p>
          <Link to="/contact">
            <button className="bg-green text-green-foreground px-6 py-3 rounded-lg font-semibold hover:bg-green/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              Become a Partner
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;
