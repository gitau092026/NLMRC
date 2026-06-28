import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useHeroImages } from "@/integrations/supabase/hooks/useHeroImages";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const Hero = () => {
  const { data: heroImages } = useHeroImages();
  const [api, setApi] = useState<CarouselApi>();
  const [cardsApi, setCardsApi] = useState<CarouselApi>();



  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!cardsApi) {
      return;
    }

    const interval = setInterval(() => {
      cardsApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [cardsApi]);

  return (
    <section id="home" className="relative z-30 min-h-[90vh] flex flex-col justify-center overflow-visible mb-24 lg:mb-32 mt-16 md:mt-20">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full [&>div]:h-full"
        >
          <CarouselContent className="h-full ml-0">
            {heroImages && heroImages.length > 0 ? (
              heroImages.map((image, index) => (
                <CarouselItem key={image.id} className="pl-0 h-full">
                  <div className="relative w-full h-full">
                    <img loading="lazy"
                      src={image.image_url}
                      alt="Hero Background"
                      className="w-full h-full object-cover object-center"
                      loading={index === 0 ? "eager" : "lazy"}
                      {...(index === 0 && { fetchpriority: "high" } as any)}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-0 h-full">
                <div className="w-full h-full bg-gray-900" />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
            HELP US SERVE <span className="text-green">HUMANITY</span>
          </h1>

          <div className="flex justify-center pt-4">
            <Link to="/donate">
              <Button
                size="lg"
                className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white border-0 rounded shadow-lg px-8 py-6 text-base font-semibold transition-all hover:scale-105"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlapping Cards Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div className="container mx-auto px-4 max-w-5xl relative">
          <Carousel
            setApi={setCardsApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Card 1 */}
              <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
                <div className="bg-green text-white p-8 text-center shadow-2xl flex flex-col items-center justify-between h-[240px]">
                  <div>
                    <h3 className="font-bold text-2xl mb-4 drop-shadow-sm">Donate Now</h3>
                    <p className="text-sm text-gray-300 mb-6 px-4 leading-relaxed">Support our rescue and rehabilitation programs today.</p>
                  </div>
                  <Link to="/donate">
                    <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white text-sm font-semibold h-10 px-8 rounded-md shadow-md transition-all hover:scale-105">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Card 2 */}
              <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
                <div className="bg-green text-white p-8 text-center shadow-2xl flex flex-col items-center justify-between h-[240px]">
                  <div>
                    <h3 className="font-bold text-2xl mb-4 drop-shadow-sm">Sponsor a Child</h3>
                    <p className="text-sm text-gray-300 mb-6 px-4 leading-relaxed">Help provide education, food, and medical care.</p>
                  </div>
                  <Link to="/donate">
                    <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white text-sm font-semibold h-10 px-8 rounded-md shadow-md transition-all hover:scale-105">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Card 3 */}
              <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
                <div className="bg-green text-white p-8 text-center shadow-2xl flex flex-col items-center justify-between h-[240px]">
                  <div>
                    <h3 className="font-bold text-2xl mb-4 drop-shadow-sm">Volunteer With Us</h3>
                    <p className="text-sm text-gray-300 mb-6 px-4 leading-relaxed">Join our team of dedicated volunteers making a difference.</p>
                  </div>
                  <Link to="/volunteer">
                    <Button className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white text-sm font-semibold h-10 px-8 rounded-md shadow-md transition-all hover:scale-105">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Hero;


