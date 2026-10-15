import { useState, useMemo, useEffect } from "react";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getGallery, GalleryItem } from "@/lib/adminData";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "Centre Life",
  "Vocational Training",
  "Education",
  "Sports & Recreation",
  "Community Outreach",
  "Reintegration",
];

const GalleryPage = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getGallery());
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: GalleryItem[] = data.map((img: any) => ({
            id: img.id,
            url: img.image_url,
            caption: img.caption || img.title || "Gallery Photo",
            category: img.category || "Centre Life",
            date: img.created_at ? new Date(img.created_at).getFullYear().toString() : "2024",
            featured: false,
          }));
          setGallery(mapped);
        }
      });
  }, []);

  // Lightbox modal state
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    return gallery.filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [gallery, selectedCategory]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev !== null ? (prev + 1) % filteredPhotos.length : 0
      );
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
      );
    }
  };

  const currentPhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground flex flex-col">
      <SEO
        title="Photo Gallery | Katani Rehabilitation Centre Life & Activities | NLMRC"
        description="View life at New Life Mwangaza Rehabilitation Centre in Katani, Kenya. Photos of addiction recovery, vocational tailoring workshops, education classes, and community barazas."
        keywords="rehabilitation centres in kenya photos, best rehabilitation centre, katani rehab centre photos, street children kenya rehabilitation images, vocational training kenya photos, nlmrc gallery"
        canonical="https://www.newlifemwangaza.org/gallery"
      />
      <Navbar />

      {/* ─── Gallery Filter Section ────────────────────────────────────────── */}
      <section className="pt-8 sm:pt-12 pb-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[hsl(var(--green))] text-white shadow-sm scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden relative">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/60 text-white font-medium text-[10px] backdrop-blur-sm">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 leading-snug">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="text-primary font-semibold text-[11px] group-hover:underline">
                        View photo →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border max-w-lg mx-auto">
              <ImageIcon className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">No photos found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are no photos in the "{selectedCategory}" category yet.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setSelectedCategory("All")}
              >
                Show All Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Lightbox Modal ─────────────────────────────────────────────────── */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white text-xs">
                {currentPhoto.category}
              </Badge>
              <span className="text-xs text-white/70">
                {activePhotoIndex! + 1} of {filteredPhotos.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Photo Display & Controls */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Navigation arrows */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Caption Footer */}
          <div
            className="w-full max-w-2xl text-center text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm sm:text-base font-medium leading-relaxed">
              {currentPhoto.caption}
            </p>
            <p className="text-xs text-white/60 mt-1">{currentPhoto.date} • NLMRC Katani Centre</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
