import { useState } from "react";
import { useHeroImages, useCreateHeroImage, useUpdateHeroImage, useDeleteHeroImage, uploadHeroImage } from "@/integrations/supabase/hooks/useHeroImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-volunteers.webp";
import aboutGroup from "@/assets/about-group.webp";
import aboutPlanting from "@/assets/about-planting.webp";
import heroEducation from "@/assets/20230725_153032.webp";

const HeroAdmin = () => {
    const { data: images, isLoading } = useHeroImages();
    const createImage = useCreateHeroImage();
    const updateImage = useUpdateHeroImage();
    const deleteImage = useDeleteHeroImage();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        order_index: 0,
        image_url: ""
    });

    const defaultImages = [
        { id: 'd1', image_url: heroImage, title: 'Default 1' },
        { id: 'd2', image_url: aboutGroup, title: 'Default 2' },
        { id: 'd3', image_url: aboutPlanting, title: 'Default 3' },
        { id: 'd4', image_url: heroEducation, title: 'Default 4' },
    ];

    const handleImportDefaults = async () => {
        if (!confirm("This will copy the 4 default images to your database so you can edit and manage them. Continue?")) return;

        setIsUploading(true);
        const toastId = toast.loading("Importing default images...");

        try {
            // Import all defaults sequentially to preserve order
            for (let i = 0; i < defaultImages.length; i++) {
                const img = defaultImages[i];
                try {
                    // Fetch the local asset
                    const response = await fetch(img.image_url);
                    const blob = await response.blob();
                    const file = new File([blob], `${img.title.replace(/\s+/g, '_').toLowerCase()}.jpg`, { type: blob.type });

                    // Upload to storage
                    const publicUrl = await uploadHeroImage(file);

                    // Create DB record
                    await createImage.mutateAsync({
                        image_url: publicUrl,
                        order_index: i
                    });
                } catch (err) {
                    console.error(`Failed to import ${img.title}`, err);
                }
            }
            toast.success("Images imported successfully! You can now edit them.", { id: toastId });
        } catch (error) {
            console.error("Import failed", error);
            toast.error("Failed to import some images", { id: toastId });
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (image: any) => {
        setEditingImage(image);
        setFormData({
            order_index: image.order_index || 0,
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
                    imageUrl = await uploadHeroImage(selectedFile);
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
            setFormData({ order_index: 0, image_url: "" });
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
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Hero Section Images</h1>
                    <p className="text-muted-foreground">Manage the images displayed in the home page hero slider.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingImage(null); setFormData({ order_index: 0, image_url: "" }); setSelectedFile(null); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Order Index (Sort Order)</label>
                                <Input
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                />
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
                            <img
                                src={image.image_url}
                                alt="Hero slider"
                                loading="eager"
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
                            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
                                Order: {image.order_index}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {(!images || images.length === 0) && (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div className="text-sm text-blue-700">
                                <p className="font-semibold">Currently displaying default images.</p>
                                <p>To edit or delete these images, you must first import them to your database.</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleImportDefaults}
                            disabled={isUploading}
                            variant="secondary"
                            className="whitespace-nowrap bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Enable Editing (Import Defaults)
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
                        {defaultImages.map((img) => (
                            <Card key={img.id} className="overflow-hidden relative">
                                <div className="aspect-video">
                                    <img
                                        src={img.image_url}
                                        alt={img.title}
                                        loading="eager"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-gray-900/80 text-white px-2 py-1 text-xs rounded">
                                        Default
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroAdmin;
