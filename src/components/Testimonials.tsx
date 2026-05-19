import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useStories } from "@/integrations/supabase/hooks/useStories";
import { generateSlug } from "@/lib/utils";

const Testimonials = () => {
  const { data: stories, isLoading } = useStories();
  const [activeStory, setActiveStory] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!stories || stories.length === 0) {
    return null; // Or return a "No stories" placeholder if preferred, but usually sections hide if empty
  }

  const activeTestimonial = stories[activeStory];

  const handleStoryClick = (index: number) => {
    setActiveStory(index);
    // Smooth scroll to the content area, useful for mobile
    if (window.innerWidth < 1024) { // Only scroll on mobile/tablet where layout is stacked
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="stories" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Stories of impact and transformation.
          </p>
        </div>

        {/* Featured Story + Related Stories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured Story Card - Large */}
          {activeTestimonial && (
            <div className="lg:col-span-2" ref={contentRef}>
              <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-border/50 hover:border-green/30 overflow-hidden h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Featured Image */}
                  <div className="h-64 md:h-80 lg:h-96 overflow-hidden relative">
                    <img
                      src={activeTestimonial.image_url}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[hsl(var(--orange))] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {activeTestimonial.category}
                      </span>
                    </div>
                  </div>

                  {/* Featured Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{activeTestimonial.date_str}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {activeTestimonial.name}
                    </h3>

                    {/* Short Story Summary */}
                    <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-1">
                      {activeTestimonial.story}
                    </p>

                    {/* Read More Button */}
                    <Link
                      to={`/stories/${generateSlug(activeTestimonial.title || activeTestimonial.name || "")}`}
                      className="text-[hsl(var(--orange))] font-semibold hover:text-[hsl(var(--orange))]/80 transition-colors flex items-center gap-2 group/btn"
                    >
                      Read full story
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Related Stories - Smaller Cards */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-foreground mb-2">Recent Stories</h3>
            {stories.slice(0, 3).map((testimonial, index) => { // Limit to 3 for sidebar
              const isActive = index === activeStory;

              return (
                <Card
                  key={testimonial.id}
                  onClick={() => handleStoryClick(index)}
                  className={`group cursor-pointer transition-all duration-300 border-2 overflow-hidden hover:shadow-lg hover:-translate-y-1 ${isActive
                    ? 'border-[hsl(var(--orange))] bg-[hsl(var(--orange))]/5 ring-2 ring-[hsl(var(--orange))]/20'
                    : 'border-border/50 hover:border-[hsl(var(--orange))]/30'
                    }`}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      {/* Small Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold mb-1 transition-colors ${isActive ? 'text-[hsl(var(--orange))]' : 'text-foreground group-hover:text-[hsl(var(--orange))]'
                          }`}>
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {testimonial.story}
                        </p>
                        <span className="text-xs text-muted-foreground/70 mt-1 block">
                          {testimonial.date_str}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
