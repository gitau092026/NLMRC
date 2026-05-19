import { useState } from "react";
import { useGlobalImpact, useCreateGlobalImpact, useUpdateGlobalImpact, useDeleteGlobalImpact } from "@/integrations/supabase/hooks/useGlobalImpact";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2, Globe } from "lucide-react";
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

const GlobalImpactAdmin = () => {
    const { data: impacts, isLoading } = useGlobalImpact();
    const createImpact = useCreateGlobalImpact();
    const updateImpact = useUpdateGlobalImpact();
    const deleteImpact = useDeleteGlobalImpact();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingImpact, setEditingImpact] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        country: "",
        description: "",
        image_url: "",
        stats: ""
    });

    const handleEdit = (impact: any) => {
        setEditingImpact(impact);
        setFormData({
            country: impact.country,
            description: impact.description || "",
            image_url: impact.image_url || "",
            stats: impact.stats || ""
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteImpact.mutateAsync(id);
        toast.success("Record deleted");
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
                .from('images')
                .upload(filePath, file, {
                    contentType: file.type
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Error uploading image:', error);
            const errorMessage = error instanceof Error ? error.message : "Error uploading image";
            toast.error(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingImpact) {
                await updateImpact.mutateAsync({ id: editingImpact.id, ...formData });
                toast.success("Record updated");
            } else {
                await createImpact.mutateAsync(formData);
                toast.success("Record created");
            }
            setIsDialogOpen(false);
            setEditingImpact(null);
            setFormData({ country: "", description: "", image_url: "", stats: "" });
        } catch (error) {
            console.error('Error saving global impact:', error);
            const errorMessage = error instanceof Error ? error.message : "Failed to save record";
            toast.error(errorMessage);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Global Impact Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingImpact(null); setFormData({ country: "", description: "", image_url: "", stats: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Impact
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingImpact ? "Edit Impact" : "Add New Impact"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Country</label>
                                <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label>Description</label>
                                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>Stats (e.g., "50+ Children Helped")</label>
                                <Input value={formData.stats} onChange={(e) => setFormData({ ...formData, stats: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>Image</label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <img src={formData.image_url} alt="Preview" className="h-16 w-16 object-cover rounded" />
                                    )}
                                    <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={createImpact.isPending || updateImpact.isPending || uploading}>
                                {createImpact.isPending || updateImpact.isPending ? "Saving..." : "Save Impact"}
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
                                <TableHead>Country</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {impacts?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.country} className="h-8 w-8 rounded-full object-cover" />
                                        ) : <Globe className="h-8 w-8 p-1 bg-muted rounded-full" />}
                                        {item.country}
                                    </TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.stats}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
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
                                                        <AlertDialogTitle>Delete Impact</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this record? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {impacts?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No impact records found
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

export default GlobalImpactAdmin;
