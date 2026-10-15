import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search, Sparkles, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getStories, Story } from "@/lib/adminData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["All", "Rehabilitation", "Reintegration", "Prevention", "Community", "Education"];

const StoriesPage = () => {
  const [stories] = useState<Story[]>(() => getStories());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        selectedCategory === "All" ||
        story.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  const featuredStory = useMemo(() => {
    return stories.find((s) => s.featured) || stories[0];
  }, [stories]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground flex flex-col">
      <SEO
        title="Addiction Recovery & Life Transformation Stories | NLMRC Kenya"
        description="Inspiring real-life transformation stories from one of the best rehabilitation centres in Kenya. Witness youth overcoming drug abuse, street life, and returning home through NLMRC."
        keywords="best rehabilitation centres in kenya, addiction recovery stories, best treatment for alcohol addiction, drug abuse in kenya, christian rehabilitation centres in kenya, street children rehabilitation stories, youth recovery kenya"
        canonical="https://www.newlifemwangaza.org/stories"
      />
      <Navbar />

      {/* ─── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-gradient-to-b from-[hsl(var(--green))] via-[hsl(var(--primary))] to-[hsl(var(--green))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 text-center space-y-4">
          <Badge className="bg-[hsl(var(--orange))] text-white font-bold uppercase tracking-widest text-xs px-3 py-1 border-none shadow-md">
            Stories of Hope & Transformation
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Lives Changed, Futures Rebuilt
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100 font-light leading-relaxed">
            Every child who walks through our Katani Centre gates has a story of pain — and a greater destiny of resilience, healing, and restored family dignity.
          </p>
        </div>
      </section>

      {/* ─── Featured Story Spotlight ───────────────────────────────────────── */}
      {featuredStory && selectedCategory === "All" && !searchQuery && (
        <section className="py-12 bg-muted/30 border-b border-border/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--orange))]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Featured Transformation
              </span>
            </div>

            <div className="bg-card rounded-2xl md:rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12 group">
              <div className="md:col-span-7 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-zinc-900 font-bold text-xs backdrop-blur-md shadow">
                    {featuredStory.category}
                  </Badge>
                </div>
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {featuredStory.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {featuredStory.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {featuredStory.title}
                  </h2>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-4">
                    {featuredStory.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <Button asChild className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white font-semibold">
                    <Link to={`/stories/${featuredStory.id}`}>
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Search, Filter, and Grid Section ──────────────────────────────── */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-10">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-border/60">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[hsl(var(--green))] text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-full bg-card"
              />
            </div>
          </div>

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-600/30 transition-all duration-300 flex flex-col group"
                >
                  <Link to={`/stories/${story.id}`} className="block aspect-[16/10] overflow-hidden relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/60 text-white font-medium text-[11px] backdrop-blur-sm">
                        {story.category}
                      </Badge>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{story.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{story.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        <Link to={`/stories/${story.id}`}>{story.title}</Link>
                      </h3>

                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <Link
                        to={`/stories/${story.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-[hsl(var(--orange))] transition-colors"
                      >
                        Read Full Story
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">No stories found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                No transformation stories matched "{searchQuery || selectedCategory}".
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Call to Action Footer Section ─────────────────────────────────── */}
      <section className="py-16 bg-muted/40 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Be Part of the Next Transformation Story
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Your support provides medical detox, therapeutic counselling, education, and safe family reintegration for another street-connected youth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white font-bold">
              <Link to="/donate">Donate to NLMRC</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/volunteer">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoriesPage;
