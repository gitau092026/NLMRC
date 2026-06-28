import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
}



import { useGallery } from "@/integrations/supabase/hooks/useGallery";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { data: images, isLoading } = useGallery();

  if (isLoading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading gallery...</div>;
  }


  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div>
        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No images in the gallery yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="eager"
                      />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
                        <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                        {image.caption && (
                          <p className="text-sm text-background/80 line-clamp-2">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-background hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img loading="lazy"
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-background">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.caption && (
                <p className="text-background/80 mt-2">{selectedImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
