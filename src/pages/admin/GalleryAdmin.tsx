import { useState } from "react";
import { useGallery, useCreateGalleryImage, useUpdateGalleryImage, useDeleteGalleryImage, uploadGalleryImage } from "@/integrations/supabase/hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const GalleryAdmin = () => {
    const { data: images, isLoading } = useGallery();
    const createImage = useCreateGalleryImage();
    const updateImage = useUpdateGalleryImage();
    const deleteImage = useDeleteGalleryImage();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        caption: "",
        image_url: ""
    });

    const handleEdit = (image: any) => {
        setEditingImage(image);
        setFormData({
            title: image.title || "",
            caption: image.caption || "",
            image_url: image.image_url
        });
        setSelectedFile(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this image?")) {
            await deleteImage.mutateAsync(id);
            toast.success("Image deleted");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let imageUrl = formData.image_url;

            if (selectedFile) {
                setIsUploading(true);
                try {
                    imageUrl = await uploadGalleryImage(selectedFile);
                } catch (error: any) {
                    console.error("Upload error:", error);
                    const errorMessage = error?.message || error?.error?.message || "Unknown error";
                    toast.error(`Failed to upload image: ${errorMessage}`);
                    setIsUploading(false);
                    return;
                }
                setIsUploading(false);
            }

            if (!imageUrl) {
                toast.error("Please provide an image URL or upload a file");
                return;
            }

            const dataToSave = { ...formData, image_url: imageUrl };

            if (editingImage) {
                await updateImage.mutateAsync({ id: editingImage.id, ...dataToSave });
                toast.success("Image updated");
            } else {
                await createImage.mutateAsync(dataToSave);
                toast.success("Image added");
            }
            setIsDialogOpen(false);
            setEditingImage(null);
            setFormData({ title: "", caption: "", image_url: "" });
            setSelectedFile(null);
        } catch (error: any) {
            console.error("Save error:", error);
            const errorMessage = error?.message || error?.error?.message || "Unknown error";
            toast.error(`Failed to save image: ${errorMessage}`);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingImage(null); setFormData({ title: "", caption: "", image_url: "" }); setSelectedFile(null); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter image title"
                                />
                            </div>
                            <div className="space-y-2">
                                <label>Caption</label>
                                <Input value={formData.caption} onChange={(e) => setFormData({ ...formData, caption: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>Image</label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        type="text"
                                        placeholder="Image URL"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        className={selectedFile ? "opacity-50" : ""}
                                        disabled={!!selectedFile}
                                    />
                                    <span className="text-sm text-neutral-500">OR</span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full"
                                    />
                                </div>
                                {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
                            </div>


                            <Button type="submit" className="w-full" disabled={createImage.isPending || updateImage.isPending || isUploading}>
                                {isUploading ? "Uploading..." : (createImage.isPending || updateImage.isPending ? "Saving..." : "Save Image")}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images?.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-video relative group">
                            <img loading="lazy"
                                src={image.image_url}
                                alt={image.title || "Gallery image"}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="icon" onClick={() => handleEdit(image)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold truncate">{image.title || "Untitled"}</h3>
                            <p className="text-sm text-muted-foreground truncate">{image.caption}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GalleryAdmin;
