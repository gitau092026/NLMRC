import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useStories } from "@/integrations/supabase/hooks/useStories";
import { Link } from "react-router-dom";
import { Loader2, User, Calendar } from "lucide-react";
import { generateSlug } from "@/lib/utils";

const StoriesList = () => {
  const { data: stories, isLoading } = useStories();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No stories found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {stories.map((story) => (
        <Link
          key={story.id}
          to={`/stories/${generateSlug(story.title || story.name || "")}`}
          className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Story
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {story.author || "Guest Writer"}
              </span>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {story.date_str || new Date(story.published_at || story.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[hsl(var(--orange))] transition-colors">
              {story.name || story.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {story.story || story.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
const StoriesPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div>
        <section className="pt-16 pb-4 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Success Stories
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Real people, real change, real impact
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <StoriesList />
          </div>
        </section>

        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default StoriesPage;
