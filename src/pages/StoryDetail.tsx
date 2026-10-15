import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getStories, getStoryById } from "@/lib/adminData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const story = useMemo(() => {
    if (!id) return undefined;
    return getStoryById(id) || getStories().find((s) => s.id === id);
  }, [id]);

  const relatedStories = useMemo(() => {
    const all = getStories();
    return all.filter((s) => s.id !== id).slice(0, 3);
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Story link copied to clipboard!");
    } else {
      toast.info("Share this URL: " + window.location.href);
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-4">
          <Badge variant="outline" className="text-destructive border-destructive/30">
            404 Not Found
          </Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Transformation Story Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The story you are looking for may have been updated, relocated, or removed.
          </p>
          <Button onClick={() => navigate("/stories")} className="bg-[hsl(var(--green))] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Stories
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Split narrative content into clean paragraphs
  const paragraphs = story.content
    ? story.content.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
    : [story.excerpt];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground flex flex-col">
      <SEO
        title={`${story.title} | Addiction Recovery Stories | NLMRC`}
        description={story.excerpt}
        keywords={`${story.title}, addiction recovery stories kenya, best rehabilitation centres in kenya, street children transformation, ${story.category}`}
        canonical={`https://www.newlifemwangaza.org/stories/${story.id}`}
        ogImage={story.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": story.title,
          "description": story.excerpt,
          "image": story.image,
          "author": {
            "@type": "Organization",
            "name": story.author || "NLMRC Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "New Life Mwangaza Rehabilitation Centre",
            "logo": "https://www.newlifemwangaza.org/logo.webp"
          }
        }}
      />
      <Navbar />

      {/* ─── Breadcrumb Bar ─────────────────────────────────────────────────── */}
      <div className="bg-muted/40 border-b border-border/50 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/stories" className="hover:text-foreground">
            Stories
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] text-foreground font-medium">
            {story.title}
          </span>
        </div>
      </div>

      {/* ─── Story Header ───────────────────────────────────────────────────── */}
      <article className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/stories")}
            className="text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Stories
          </Button>

          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[hsl(var(--green))] text-white font-semibold text-xs">
                {story.category}
              </Badge>
              {story.featured && (
                <Badge className="bg-[hsl(var(--orange))] text-white font-semibold text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60 text-xs sm:text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  {story.author || "NLMRC Team"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {story.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {story.readTime}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-1.5 text-xs h-8"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] bg-muted shadow-md border border-border">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Excerpt */}
          <div className="p-6 sm:p-8 bg-muted/30 rounded-2xl border-l-4 border-l-[hsl(var(--orange))] text-base sm:text-lg text-foreground font-medium italic leading-relaxed">
            "{story.excerpt}"
          </div>

          {/* Full Narrative Content */}
          <div className="space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed font-normal">
            {paragraphs.map((p, index) => (
              <p key={index} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Callout box */}
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-[hsl(var(--orange))]" />
                Inspired by this story?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your contribution enables us to reach more street children in Kenya with life-saving rehabilitation.
              </p>
            </div>
            <Button asChild className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white shrink-0">
              <Link to="/donate">
                <Heart className="w-4 h-4 mr-1.5 text-[hsl(var(--orange))]" />
                Support Our Mission
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* ─── Related Stories ───────────────────────────────────────────────── */}
      {relatedStories.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  More Stories of Transformation
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Discover how hope is renewed for boys at Katani Centre
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/stories">All Stories →</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStories.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  <Link to={`/stories/${rel.id}`} className="aspect-[16/10] overflow-hidden block">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-primary">{rel.category}</span>
                      <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        <Link to={`/stories/${rel.id}`}>{rel.title}</Link>
                      </h4>
                    </div>
                    <Link
                      to={`/stories/${rel.id}`}
                      className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1 pt-2"
                    >
                      Read story →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default StoryDetailPage;
