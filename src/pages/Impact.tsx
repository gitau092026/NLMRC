import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useImpactReport } from "@/integrations/supabase/hooks/useImpactReport";
import { Loader2, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ImpactPage = () => {
  const { data: reportImage, isLoading } = useImpactReport();
  const imageUrl = (reportImage as any)?.image_url || "https://placehold.co/1200x1600?text=No+Impact+Report+Uploaded+Yet";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Our Impact Report | New Life Mwangaza Rehabilitation Centre"
        description="View the Impact Report of New Life Mwangaza Rehabilitation Centre to see our key achievements and statistics in child rescue, rehabilitation, and reintegration."
        canonical="https://www.newlifemwangaza.org/impact"
      />
      <Navbar />

      <main className="flex-grow pt-[72px] pb-4 md:pt-[88px] md:pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Our Impact Report</h1>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 cursor-zoom-in group">
                    <img loading="lazy"
                      src={imageUrl}
                      alt="Impact Report"
                      className="w-full h-auto object-contain block"
                    />
                    {/* Hover Overlay for Desktop / Touch Feedback */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                        <span className="text-sm font-medium">Click to zoom</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-transparent border-none shadow-none flex items-center justify-center outline-none">
                  <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <img loading="lazy"
                      src={imageUrl}
                      alt="Impact Report Fullscreen"
                      className="w-auto h-auto max-w-full max-h-full object-contain rounded-md shadow-2xl"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImpactPage;
