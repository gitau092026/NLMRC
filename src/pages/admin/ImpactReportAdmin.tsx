import { useState, useEffect } from "react";
import { useImpactReport, useUpdateImpactReport, useDeleteImpactReport, uploadImpactReportImage } from "@/integrations/supabase/hooks/useImpactReport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ImpactReportAdmin = () => {
    const { data: reportImage, isLoading } = useImpactReport();
    const updateReport = useUpdateImpactReport();
    const deleteReport = useDeleteImpactReport();

    const [imageUrl, setImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (reportImage) {
            setImageUrl((reportImage as any).image_url);
        }
    }, [reportImage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDelete = async () => {
        if (!reportImage) return;

        if (confirm("Are you sure you want to remove the current impact report image?")) {
            try {
                await deleteReport.mutateAsync((reportImage as any).id);
                toast.success("Report image removed successfully");
                setImageUrl("");
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to remove image");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let finalImageUrl = imageUrl;

            if (selectedFile) {
                setIsUploading(true);
                try {
                    finalImageUrl = await uploadImpactReportImage(selectedFile);
                } catch (error: any) {
                    console.error("Upload error:", error);
                    toast.error("Failed to upload image");
                    setIsUploading(false);
                    return;
                }
                setIsUploading(false);
            }

            if (!finalImageUrl) {
                toast.error("Please provide an image URL or upload a file");
                return;
            }

            await updateReport.mutateAsync(finalImageUrl);
            toast.success("Impact Report updated successfully");
            setSelectedFile(null);

        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to update report");
        }
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Impact Report Management</h1>
            <p className="text-muted-foreground">Upload, update or remove the image that appears on the Impact page.</p>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Current Report Image</CardTitle>
                        <CardDescription>This is the image currently displayed on the website.</CardDescription>
                    </div>
                    {(reportImage as any)?.image_url && (
                        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleteReport.isPending}>
                            {deleteReport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                            Remove Image
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {(reportImage as any)?.image_url ? (
                        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img
                                src={(reportImage as any).image_url}
                                alt="Current Impact Report"
                                className="w-full h-auto max-h-[500px] object-contain"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <AlertCircle className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-gray-500">No report image set yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Update Report Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium">Upload New Image</label>
                            <div className="flex gap-4 items-start flex-col sm:flex-row">
                                <div className="flex-1 w-full">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                    {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                                    <span className="text-sm text-muted-foreground font-medium">OR</span>
                                </div>
                                <div className="flex-1 w-full">
                                    <Input
                                        type="text"
                                        placeholder="Paste Image URL"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className={selectedFile ? "opacity-50" : ""}
                                        disabled={!!selectedFile}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto min-w-[200px]"
                            disabled={isUploading || updateReport.isPending}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                                </>
                            ) : updateReport.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ImpactReportAdmin;
