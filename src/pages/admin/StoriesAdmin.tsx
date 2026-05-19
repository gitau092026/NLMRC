import { useState } from "react";
import { useStories, useCreateStory, useUpdateStory, useDeleteStory } from "@/integrations/supabase/hooks/useStories";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const StoriesAdmin = () => {
    const { data: stories, isLoading } = useStories();
    const createStory = useCreateStory();
    const updateStory = useUpdateStory();
    const deleteStory = useDeleteStory();
    const queryClient = useQueryClient();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingStory, setEditingStory] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        image_url: "",
        story: "",
        full_story: "",
        date_str: new Date().toLocaleDateString(),
        type: "article",
        video_url: "",
        video_platform: "youtube"
    });

    const categories = ["Transformation", "Education", "Health", "Community", "Rehabilitation"];

    const handleEdit = (story: any) => {
        setEditingStory(story);
        setFormData({
            name: story.name,
            category: story.category,
            image_url: story.image_url || "",
            story: story.story,
            full_story: story.full_story || "",
            date_str: story.date_str,
            type: story.type || "article",
            video_url: story.video_url || "",
            video_platform: story.video_platform || "youtube"
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this story?")) {
            await deleteStory.mutateAsync(id);
            toast.success("Story deleted");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const filePath = `${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingStory) {
                await updateStory.mutateAsync({ id: editingStory.id, ...formData });
                toast.success("Story updated");
            } else {
                await createStory.mutateAsync(formData);
                toast.success("Story created");
            }
            setIsDialogOpen(false);
            setEditingStory(null);
            setFormData({
                name: "",
                category: "",
                image_url: "",
                story: "",
                full_story: "",
                date_str: new Date().toLocaleDateString(),
                type: "article",
                video_url: "",
                video_platform: "youtube"
            });
        } catch (error) {
            toast.error("Failed to save story");
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Stories Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingStory(null); setFormData({ ...formData, name: "", image_url: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Story
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingStory ? "Edit Story" : "Add New Story"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label>Name</label>
                                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label>Category</label>
                                    <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label>Date</label>
                                <Input value={formData.date_str} onChange={(e) => setFormData({ ...formData, date_str: e.target.value })} />
                            </div>

                            <div className="space-y-2">
                                <label>Image</label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <img
                                            src={formData.image_url}
                                            alt="Preview"
                                            className="h-20 w-32 object-cover rounded border"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                        />
                                        {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                                    </div>
                                </div>
                                {/* Hidden input to ensure form validation still works if we want to enforce image presence, or purely for state tracking */}
                                <input type="hidden" value={formData.image_url} required />
                                {!formData.image_url && <p className="text-sm text-destructive">Image is required</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label>Type</label>
                                    <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="article">Article</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {formData.type === "video" && (
                                    <div className="space-y-2">
                                        <label>Video Platform</label>
                                        <Select value={formData.video_platform} onValueChange={(val) => setFormData({ ...formData, video_platform: val })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="youtube">YouTube</SelectItem>
                                                <SelectItem value="facebook">Facebook</SelectItem>
                                                <SelectItem value="tiktok">TikTok</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            {formData.type === "video" && (
                                <div className="space-y-2">
                                    <label>Video URL</label>
                                    <Input value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label>Short Summary</label>
                                <Textarea value={formData.story} onChange={(e) => setFormData({ ...formData, story: e.target.value })} required />
                            </div>

                            <div className="space-y-2">
                                <label>Full Story</label>
                                <Textarea className="h-40" value={formData.full_story} onChange={(e) => setFormData({ ...formData, full_story: e.target.value })} />
                            </div>

                            <Button type="submit" className="w-full" disabled={createStory.isPending || updateStory.isPending || uploading}>
                                {createStory.isPending || updateStory.isPending ? "Saving..." : "Save Story"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    {stories?.length === 0 ? (
                        <div className="p-8 text-center space-y-4">
                            <p className="text-muted-foreground">No stories found. Start by adding one.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stories?.map((story) => (
                                    <TableRow key={story.id}>
                                        <TableCell>
                                            <img src={story.image_url} alt={story.name} className="h-10 w-16 object-cover rounded" />
                                        </TableCell>
                                        <TableCell className="font-medium">{story.name}</TableCell>
                                        <TableCell>{story.category}</TableCell>
                                        <TableCell>{story.date_str}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(story)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(story.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StoriesAdmin;
