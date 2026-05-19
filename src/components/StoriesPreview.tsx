import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import placeholderImg from "@/assets/placeholder.svg";
import { useStories } from "@/integrations/supabase/hooks/useStories";
import { generateSlug } from "@/lib/utils";

interface StoryItem {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  video_platform: "youtube" | "facebook" | "tiktok" | null;
  type: "video" | "article";
  link?: string;
}

const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const extractFacebookVideoId = (url: string): string | null => {
  const regex = /facebook\.com\/.*\/videos\/(\d+)|facebook\.com\/watch\/?\\?v=(\d+)/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
};

const VideoEmbed = ({ story }: { story: StoryItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Load TikTok script if needed (though it's better loaded globally or once)
  useEffect(() => {
    if (story.video_platform === "tiktok" && isPlaying) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [story.video_platform, isPlaying]);

  if (story.type === "article") {
    return (
      <div className="aspect-video relative cursor-pointer group rounded-lg overflow-hidden bg-muted">
        <Link to={story.link || "#"} className="block w-full h-full">
          <img
            src={story.thumbnail_url || placeholderImg}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity group-hover:bg-black/30">
            <div className="bg-white/90 text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 transform transition-transform group-hover:scale-105">
              Read Story <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (!story.video_url) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
        <span className="text-muted-foreground">No video available</span>
      </div>
    );
  }

  if (story.video_platform === "youtube") {
    const videoId = extractYouTubeId(story.video_url);
    if (!videoId) return null;

    if (!isPlaying) {
      return (
        <div
          className="aspect-video relative cursor-pointer group rounded-lg overflow-hidden"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={
              story.thumbnail_url ||
              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            }
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center transition-opacity group-hover:bg-foreground/40">
            <div className="w-16 h-16 bg-[hsl(var(--orange))] rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={story.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  if (story.video_platform === "facebook") {
    // ... existing facebook logic ...
    const videoId = extractFacebookVideoId(story.video_url);

    if (!isPlaying) {
      return (
        <div
          className="aspect-video relative cursor-pointer group rounded-lg overflow-hidden bg-muted"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={story.thumbnail_url || placeholderImg}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center transition-opacity group-hover:bg-foreground/40">
            <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
            story.video_url
          )}&show_text=false&autoplay=true`}
          title={story.title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  if (story.video_platform === "tiktok") {
    if (!isPlaying) {
      return (
        <div
          className="aspect-video relative cursor-pointer group rounded-lg overflow-hidden bg-black flex flex-col items-center justify-center text-white"
          onClick={() => setIsPlaying(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-black border-2 border-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 mb-4">
              <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
            </div>
            <span className="font-bold text-xl">Watch on TikTok</span>
          </div>
        </div>
      )
    }

    return (
      <div className="h-full w-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/video/${story.video_url}`}
          data-video-id={story.video_url}
          style={{ maxWidth: "100%", minWidth: "325px" }}
        >
          <section>
            <a target="_blank" href={`https://www.tiktok.com/video/${story.video_url}`}>
              @mwangazarehabcenter
            </a>
          </section>
        </blockquote>
      </div>
    )
  }

  return null;
};

const StoriesPreview = () => {
  const { data: supabaseStories, isLoading } = useStories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Combine stories: Internal Stories + TikTok + (Maybe one fallback video?)
  // The user requested: "posts from our stories and one tiktok video"
  const stories: StoryItem[] = supabaseStories
    ? supabaseStories.map((story) => ({
      id: story.id,
      title: story.title,
      description: story.excerpt || null,
      thumbnail_url: story.image_url,
      video_url: null,
      video_platform: null,
      type: "article",
      link: `/stories/${generateSlug(story.title || "")}`,
    }))
    : [];

  // Auto-scroll effect
  useEffect(() => {
    if (stories.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stories.length, isPaused]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p>Loading stories...</p>
        </div>
      </section>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  if (stories.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24 bg-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))] rounded-full text-sm font-medium mb-4">
            Impact Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Latest Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch inspiring stories from our community and see the real impact we're making together.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-background"> {/* Added bg-background */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story) => (
                <div key={story.id} className="w-full flex-shrink-0">
                  <VideoEmbed story={story} />
                </div>
              ))}
            </div>
          </div>

          {/* Story Info */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {stories[currentIndex]?.title}
            </h3>
            {stories[currentIndex]?.description && (
              <p className="text-muted-foreground max-w-xl mx-auto line-clamp-2"> {/* Added line-clamp */}
                {stories[currentIndex].description}
              </p>
            )}
          </div>

          {/* Navigation Arrows */}
          {stories.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/3 -translate-y-1/2 rounded-full shadow-md hover:shadow-lg transition-all z-10 bg-background/90 hover:bg-background"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/3 -translate-y-1/2 rounded-full shadow-md hover:shadow-lg transition-all z-10 bg-background/90 hover:bg-background"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {stories.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-[hsl(var(--orange))] w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link to="/stories">
            <Button variant="outline" size="lg" className="group">
              View All Stories
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoriesPreview;
