import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getStories } from "@/lib/adminData";

const StoriesPreview = () => {
  const stories = getStories().slice(0, 3);
  return (
    <section id="stories" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black bg-orange rounded-sm mb-4">
              Impact Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
              Lives Changed, Futures Built
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Real stories of rescue, healing, and transformation from the boys we serve.
            </p>
          </div>
          <Link
            to="/stories"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-b-2 border-orange pb-0.5 hover:text-orange transition-colors duration-200 shrink-0"
          >
            All Stories
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Story cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((s) => (
            <Link
              key={s.id}
              to={`/stories/${s.id}`}
              className="group flex flex-col bg-card border border-border hover:border-orange/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-orange text-white">
                  {s.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-black text-foreground leading-snug group-hover:text-orange transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {s.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                  <span className="text-xs text-muted-foreground">{s.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-orange">
                    Read story
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesPreview;
