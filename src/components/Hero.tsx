import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg1 from "@/assets/hero1.JPG";
import heroImg2 from "@/assets/IMG_20260922_111240_276.jpg";
import heroImg3 from "@/assets/IMG_20250906_180652_012.jpg";

const slides = [
  {
    src: heroImg1,
    alt: "Children at New Life Mwangaza Rehabilitation Centre",
    label: "Rescue",
    tagline: "From Streets to Safety",
    headline: ["Every Child Deserves", "A Second Chance"],
    sub: "We reach out to street-connected boys before the streets claim them permanently.",
  },
  {
    src: heroImg2,
    alt: "NLMRC programme in action",
    label: "Rehabilitate",
    tagline: "Healing Minds & Restoring Dignity",
    headline: ["Transforming Lives", "Through Care"],
    sub: "Holistic rehabilitation - counselling, education, and vocational skills - rebuilds futures.",
  },
  {
    src: heroImg3,
    alt: "Volunteers and staff at NLMRC",
    label: "Reintegrate",
    tagline: "Back Where They Belong",
    headline: ["Reuniting Families,", "Restoring Communities"],
    sub: "Sustainable reintegration returns young men to families and productive community life.",
  },
];

const STATS = [
  { value: "1,500+", label: "Boys Rescued",        shortLabel: "Rescued" },
  { value: "92%",    label: "Reintegration Rate",  shortLabel: "Reintegrated" },
  { value: "4",      label: "Counties Covered",    shortLabel: "Counties" },
  { value: "20+",    label: "Years of Impact",     shortLabel: "Years Impact" },
];

const INTERVAL = 7000;
const FADE_MS  = 900;

/* Preload an image URL off the critical path */
function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

const Hero = () => {
  const [current,  setCurrent]  = useState(0);
  const [prev,     setPrev]     = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [zoomed,   setZoomed]   = useState(true);
  const [contentKey, setContentKey] = useState(0); // forces text re-animation
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Preload slides 1 & 2 after first paint */
  useEffect(() => {
    const id = setTimeout(() => {
      preloadImage(heroImg2);
      preloadImage(heroImg3);
    }, 800);
    return () => clearTimeout(id);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    // Start fade-out of current, fade-in of next
    setPrev(current);
    setCurrent(idx);
    setProgress(0);
    setContentKey((k) => k + 1);
    // Reset Ken-Burns: off → on next frame
    setZoomed(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setZoomed(true)));
    // Clear prev slide after fade completes
    setTimeout(() => setPrev(null), FADE_MS + 50);
  }, [current]);

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  /* Autoplay ticker */
  useEffect(() => {
    setZoomed(true);
    const step = 40;
    const increment = (step / INTERVAL) * 100;

    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p + increment >= 100) {
          goNext();
          return 0;
        }
        return p + increment;
      });
    }, step);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative mt-16 lg:mt-[148px]"
    >
      {/* ── Slide viewport ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden bg-black select-none"
        style={{ height: "min(94dvh, 920px)", minHeight: "580px" }}
      >

        {/* ── Images ────────────────────────────────────────────────────── */}
        {slides.map((s, i) => {
          const isActive  = i === current;
          const isLeaving = i === prev;
          const visible   = isActive || isLeaving;

          return (
            <div
              key={i}
              aria-hidden={!isActive}
              className="absolute inset-0"
              style={{
                opacity:    visible ? 1 : 0,
                zIndex:     isActive ? 2 : isLeaving ? 1 : 0,
                transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <img
                src={s.src}
                alt={s.alt}
                /* slide 0 loads immediately; others are preloaded but decoded async */
                loading={i === 0 ? "eager" : "lazy"}
                // @ts-ignore
                fetchpriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  willChange: "transform",
                  /* Ken-Burns only while active and zoomed flag is on */
                  transform: isActive && zoomed ? "scale(1.06)" : "scale(1)",
                  transition: isActive && zoomed
                    ? "transform 9000ms cubic-bezier(0.25,0.46,0.45,0.94)"
                    : "transform 600ms ease-out",
                }}
              />
            </div>
          );
        })}

        {/* ── Bright & vibrant overlays: leaves photos bright and clear while anchoring text ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        >
          {/* Subtle directional gradient on the left side only to softly anchor text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

          {/* Gentle bottom shade to support stats strip and arrows without darkening the whole photo */}
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Very light top blend for header transition */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* ── Decorative vertical accent line (desktop only) ────────────── */}
        <div
          className="absolute hidden lg:block w-px bg-white/15"
          style={{ left: "4rem", top: "25%", bottom: "8rem", zIndex: 4 }}
        />

        {/* ── Slide content ─────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col justify-center pb-28 sm:pb-36 lg:pb-28 pt-4 sm:pt-0"
          style={{ zIndex: 5 }}
        >
          <div className="w-full px-4 sm:px-10 lg:px-20 max-w-6xl mx-auto">

            {/* Eyebrow */}
            <div
              key={`eyebrow-${contentKey}`}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-black bg-orange rounded-sm shadow-md">
                {slide.label}
              </span>
              <span className="inline-flex items-center gap-2 text-white/95 text-xs sm:text-sm font-medium tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                {slide.tagline}
              </span>
            </div>

            {/* Headline - fluid size via clamp with responsive line height and shadow */}
            <h1
              key={`h1-${contentKey}`}
              className="font-black text-white leading-[1.08] sm:leading-[1.04] tracking-tight mb-3 sm:mb-5 max-w-3xl animate-fade-up drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              style={{
                fontSize: "clamp(1.85rem, 5.2vw, 4.25rem)",
                animationDelay: "70ms",
              }}
            >
              <span className="block text-white [text-shadow:_0_2px_14px_rgba(0,0,0,0.95)]">
                {slide.headline[0]}
              </span>
              <span className="block text-orange [text-shadow:_0_2px_14px_rgba(0,0,0,0.95)]">
                {slide.headline[1]}
              </span>
            </h1>

            {/* Sub-text - high contrast, readable font weight, drop shadow */}
            <p
              key={`sub-${contentKey}`}
              className="text-white/95 sm:text-white/90 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8 animate-fade-up [text-shadow:_0_1px_8px_rgba(0,0,0,0.95)]"
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                animationDelay: "140ms",
              }}
            >
              {slide.sub}
            </p>

            {/* CTAs - stable (no key re-render flash), responsive wrapping, accessible contrast */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                to="/donate"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 bg-orange text-white font-bold text-sm sm:text-base rounded shadow-lg shadow-orange/30 hover:bg-orange/95 hover:shadow-orange/40 active:scale-95 transition-all duration-200"
              >
                Donate Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about/story"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white/15 hover:bg-white/25 text-white text-sm sm:text-base font-semibold rounded backdrop-blur-md border border-white/30 hover:border-white/60 active:scale-95 transition-all duration-200 drop-shadow-sm"
              >
                Our Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right-side vertical nav ticks (desktop/tablet) ─────────────── */}
        <div
          className="absolute hidden sm:flex right-4 sm:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-2.5"
          style={{ zIndex: 6 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group p-1"
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width:      "2px",
                  height:     i === current ? "2rem" : "1rem",
                  background: i === current ? "hsl(var(--orange))" : "rgba(255,255,255,0.45)",
                }}
              />
            </button>
          ))}
        </div>

        {/* ── Prev / Next arrow buttons (elevated above stats bar) ────────── */}
        <div
          className="absolute left-3 sm:left-8 bottom-[68px] sm:bottom-24 lg:bottom-28 flex items-center gap-2"
          style={{ zIndex: 6 }}
        >
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="w-8 h-8 sm:w-10 sm:h-10 border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white hover:bg-orange hover:border-orange active:scale-95 transition-all duration-200 rounded-sm shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="rotate-180">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="w-8 h-8 sm:w-10 sm:h-10 border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white hover:bg-orange hover:border-orange active:scale-95 transition-all duration-200 rounded-sm shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Editorial slide counter (high contrast, aligned with arrows) ── */}
        <div
          className="absolute right-3 sm:right-8 bottom-[68px] sm:bottom-24 lg:bottom-28 flex flex-col items-end gap-0.5 select-none"
          style={{ zIndex: 6 }}
        >
          <span className="text-orange text-lg sm:text-2xl font-black font-mono leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/80 text-[10px] sm:text-[11px] font-mono tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Stats strip: 4 columns across all viewports (compact & non-overlapping) ── */}
        <div
          className="absolute bottom-2.5 sm:bottom-3 left-0 right-0 px-3 sm:px-8 lg:px-20"
          style={{ zIndex: 6 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 gap-px bg-white/20 overflow-hidden rounded-sm shadow-2xl backdrop-blur-md">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center py-2 sm:py-3.5 px-1 sm:px-2 bg-black/45 hover:bg-black/60 transition-colors"
                >
                  <span className="text-orange font-black text-sm xs:text-base sm:text-2xl leading-none tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {s.value}
                  </span>
                  <span className="text-white/90 text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-wider mt-1 text-center leading-tight">
                    <span className="sm:hidden">{s.shortLabel}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15"
          style={{ zIndex: 7 }}
        >
          <div
            className="h-full bg-orange"
            style={{ width: `${progress}%`, transition: "none" }}
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
