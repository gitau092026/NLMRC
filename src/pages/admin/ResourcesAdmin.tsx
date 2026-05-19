import { useState } from "react";
import { useResources, useCreateResource, useUpdateResource, useDeleteResource } from "@/integrations/supabase/hooks/useResources";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ResourcesAdmin = () => {
    const { data: resources, isLoading } = useResources();
    const createResource = useCreateResource();
    const updateResource = useUpdateResource();
    const deleteResource = useDeleteResource();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file_url: "",
        type: "pdf"
    });

    const handleEdit = (resource: any) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title,
            description: resource.description || "",
            file_url: resource.file_url,
            type: resource.type || "pdf"
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteResource.mutateAsync(id);
        toast.success("Resource deleted");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);

            // Sanitize filename and prepend timestamp
            const fileExt = file.name.split('.').pop();
            const originalName = file.name.split('.').slice(0, -1).join('.');
            const sanitizedName = originalName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filePath = `${Date.now()}_${sanitizedName}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('resources')
                .upload(filePath, file, {
                    contentType: file.type // Ensure correct content type for preview
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resources')
                .getPublicUrl(filePath);

            setFormData({ ...formData, file_url: publicUrl });
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error('Error uploading file:', error);
            const errorMessage = error instanceof Error ? error.message : "Error uploading file";
            toast.error(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingResource) {
                await updateResource.mutateAsync({ id: editingResource.id, ...formData });
                toast.success("Resource updated");
            } else {
                await createResource.mutateAsync(formData);
                toast.success("Resource created");
            }
            setIsDialogOpen(false);
            setEditingResource(null);
            setFormData({ title: "", description: "", file_url: "", type: "pdf" });
        } catch (error) {
            console.error('Error saving resource:', error);
            const errorMessage = error instanceof Error ? error.message : "Failed to save resource";
            toast.error(errorMessage);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Resources Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingResource(null); setFormData({ title: "", description: "", file_url: "", type: "pdf" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Title</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label>Description</label>
                                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>File</label>
                                <div className="flex gap-2 items-center">
                                    <Input type="file" onChange={handleFileUpload} disabled={uploading} />
                                    {formData.file_url && <FileText className="h-6 w-6 text-green-500" />}
                                </div>
                                <input type="hidden" value={formData.file_url} required />
                                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={createResource.isPending || updateResource.isPending || uploading}>
                                {createResource.isPending || updateResource.isPending ? "Saving..." : "Save Resource"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources?.map((resource) => (
                                <TableRow key={resource.id}>
                                    <TableCell className="font-medium">{resource.title}</TableCell>
                                    <TableCell>{resource.description}</TableCell>
                                    <TableCell>{resource.type}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(resource)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Resource</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this resource? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(resource.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {resources?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No resources found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResourcesAdmin;
