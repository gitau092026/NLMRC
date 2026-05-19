import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useHeroImages } from "@/integrations/supabase/hooks/useHeroImages";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const Hero = () => {
  const { data: heroImages } = useHeroImages();
  const [api, setApi] = useState<CarouselApi>();

  // Preload hero images for instant display
  useEffect(() => {
    if (heroImages && heroImages.length > 0) {
      heroImages.forEach((image, index) => {
        const link = document.createElement('link');
        link.rel = index === 0 ? 'preload' : 'prefetch';
        link.as = 'image';
        link.href = image.image_url;
        if (index === 0) {
          link.setAttribute('fetchpriority', 'high');
        }
        document.head.appendChild(link);
      });
    }
  }, [heroImages]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
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
                    <img
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white">
            HELP US SERVE <br />
            <span className="text-green">HUMANITY</span>
          </h1>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/about">
              <Button
                size="lg"
                className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white border-0 rounded-none px-8 py-6 text-lg font-medium"
              >
                View More
              </Button>
            </Link>
            <Link to="/donate">
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-100 text-gray-900 border-0 rounded-none px-8 py-6 text-lg font-medium"
              >
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

