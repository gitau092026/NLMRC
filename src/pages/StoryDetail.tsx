import { useParams, Link, useNavigate } from "react-router-dom";
import { useStories } from "@/integrations/supabase/hooks/useStories";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { generateSlug } from "@/lib/utils";

const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
const StoryDetail = () => {
    const { id: slug } = useParams();
    const navigate = useNavigate();
    const { data: allStories, isLoading: isLoadingAll } = useStories();
    
    const story = allStories?.find(s => s.id === slug || generateSlug(s.title || s.name || "") === slug);
    const isLoadingStory = isLoadingAll;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (isLoadingStory) {
        return <div className="min-h-screen pt-24 text-center">Loading story...</div>;
    }

    if (!story) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold ">Story not found</h1>
                    <Button onClick={() => navigate("/")} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Home
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO 
                title={`${story.name || story.title} | NLMRC`} 
                description={story.story || story.excerpt || `${story.name || story.title} at New Life Mwangaza Rehabilitation Centre.`}
            />
            <Navbar />

            <main className="flex-1 pt-16 pb-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/stories"
                        className="inline-flex items-center text-muted-foreground hover:text-[hsl(var(--orange))] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Stories
                    </Link>

                    <article className="max-w-4xl mx-auto">
                        {/* Article Header */}
                        <header className="mb-10 text-center">
                            <span className="inline-block bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                {story.category || "Story"}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                                {story.name || story.title}
                            </h1>
                            <div className="flex items-center justify-center gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{story.author || "Guest Writer"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{story.date_str || new Date(story.published_at || story.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image or Video */}
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                            {story.video_url && extractYouTubeId(story.video_url) ? (
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${extractYouTubeId(story.video_url)}?rel=0`}
                                        title={story.name || story.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            ) : (
                                <img loading="lazy"
                                    src={story.image_url}
                                    alt={story.name || story.title}
                                    className="w-full h-auto object-cover max-h-[600px]"
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <blockquote className="text-xl md:text-2xl font-medium text-foreground border-l-4 border-[hsl(var(--orange))] pl-6 italic mb-10 bg-muted/30 p-6 rounded-r-lg">
                                "{story.story || story.excerpt}"
                            </blockquote>

                            <div className="space-y-6 text-muted-foreground whitespace-pre-line leading-relaxed text-lg">
                                {story.full_story || story.content}
                            </div>
                        </div>

                        {/* Related Stories */}
                        <div className="mt-20 pt-10 border-t border-border">
                            <h3 className="text-2xl font-bold mb-8">More Inspiring Stories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {allStories && allStories
                                    .filter(s => s.id !== story.id)
                                    .slice(0, 2)
                                    .map(related => (
                                        <Link
                                            key={related.id}
                                            to={`/stories/${generateSlug(related.name || related.title || "")}`}
                                            className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col sm:flex-row h-full">
                                                <div className="w-full sm:w-2/5 aspect-video sm:aspect-auto relative overflow-hidden">
                                                    <img loading="lazy"
                                                        src={related.image_url}
                                                        alt={related.name || related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-semibold text-[hsl(var(--orange))] block">
                                                            {related.category || "Story"}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {related.author || "Guest Writer"}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-[hsl(var(--orange))] transition-colors">
                                                        {related.name || related.title}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {related.story || related.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StoryDetail;
