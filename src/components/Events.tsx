import { useStories } from "@/integrations/supabase/hooks/useStories";
import { Link } from "react-router-dom";
import { generateSlug } from "@/lib/utils";

const Events = () => {
  const { data: stories, isLoading } = useStories();

  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <section className="py-20 bg-gray-50 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            NEWS & <span className="text-[hsl(var(--orange))]">ARTICLES</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our latest news and events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories && stories.slice(0, 3).map((story) => {
            // Parse date for badge
            const dateObj = new Date(story.date_str);
            const day = !isNaN(dateObj.getTime()) ? dateObj.getDate() : "14";
            const month = !isNaN(dateObj.getTime()) ? dateObj.toLocaleString('default', { month: 'short' }) : "AUG";

            return (
              <div key={story.id} className="bg-white group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img loading="lazy"
                    src={story.image_url}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[hsl(var(--orange))] text-white p-2 text-center min-w-[60px]">
                    <span className="block text-xl font-bold">{day}</span>
                    <span className="block text-xs uppercase">{month}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[hsl(var(--orange))] transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {story.story}
                  </p>
                  <Link to={`/stories/${generateSlug(story.title || story.name || "")}`} className="text-[hsl(var(--orange))] text-sm font-bold uppercase tracking-wide hover:underline text-left mt-auto inline-block">
                    Read More
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {(!stories || stories.length === 0) && (
          <div className="text-center py-12">
            <p>No articles found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
