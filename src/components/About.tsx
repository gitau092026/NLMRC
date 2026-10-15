import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";

const YOUTUBE_VIDEO_ID = "W9iLCur6aJA";

const About = () => {
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <section id="about" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Top label ── */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-orange" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
            About NLMRC
          </span>
        </div>

        {/* ── Main two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col gap-8">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.08] tracking-tight text-foreground">
              Bringing{" "}
              <span className="text-green">light</span>{" "}
              to Kenya's street&#8209;connected children since 2008.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              New Life Mwangaza Rehabilitation Centre (NLMRC) is a Kenyan non-profit founded to rescue, rehabilitate, and reintegrate street-connected boys aged 14–18 affected by drug and substance abuse. Operating from a purpose-built centre in Katani, Machakos County, we walk with each child through a structured 6-month programme - therapy, education, family reunification, and aftercare - until they are safely home and thriving.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              The name <em className="text-green font-semibold not-italic">Mwangaza</em> - Swahili for <em className="text-green font-semibold not-italic">"light"</em> - captures our founding conviction: every child deserves to be brought out of darkness and into a life of dignity, family, and purpose.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Link
                to="/about/story"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-bold text-sm rounded-sm tracking-wide hover:bg-green/90 transition-all duration-200"
              >
                Our Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-orange text-white font-bold text-sm rounded-sm tracking-wide hover:bg-orange/90 transition-all duration-200"
              >
                Support a Child
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: video ── */}
          <div className="flex flex-col gap-5 lg:pt-4">

            {/* YouTube video */}
            <div className="relative overflow-hidden bg-black aspect-video">
              {videoStarted ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                  title="New Life Mwangaza - Our Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  className="group w-full h-full relative block"
                  onClick={() => setVideoStarted(true)}
                  aria-label="Play NLMRC story video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Play NLMRC story video"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center gap-3 group-hover:bg-black/45 transition-colors duration-200">
                    <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                    </div>
                    <span className="text-white text-sm font-semibold tracking-wide">
                      Watch Our Story
                    </span>
                  </div>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
