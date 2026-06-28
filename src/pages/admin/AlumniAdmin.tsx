import { useState } from "react";
import { useAlumni, useCreateAlum, useUpdateAlum, useDeleteAlum } from "@/integrations/supabase/hooks/useAlumni";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AlumniAdmin = () => {
    const { data: alumni, isLoading } = useAlumni();
    const createAlum = useCreateAlum();
    const updateAlum = useUpdateAlum();
    const deleteAlum = useDeleteAlum();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAlum, setEditingAlum] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        graduation_year: new Date().getFullYear().toString(),
        current_status: "",
        bio: "",
        image_url: "",
        contact_email: "",
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

    const handleEdit = (alum: any) => {
        setEditingAlum(alum);
        setFormData({
            name: alum.name,
            graduation_year: alum.graduation_year || currentYear.toString(),
            current_status: alum.current_status || "",
            bio: alum.bio || "",
            image_url: alum.image_url || "",
            contact_email: alum.contact_email || "",
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this alumni record?")) {
            await deleteAlum.mutateAsync(id);
            toast.success("Alumni record deleted");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const filePath = `alumni/${Math.random()}.${fileExt}`;

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
            if (editingAlum) {
                await updateAlum.mutateAsync({ id: editingAlum.id, ...formData });
                toast.success("Alumni updated");
            } else {
                await createAlum.mutateAsync(formData);
                toast.success("Alumni created");
            }
            setIsDialogOpen(false);
            setEditingAlum(null);
            setFormData({
                name: "",
                graduation_year: currentYear.toString(),
                current_status: "",
                bio: "",
                image_url: "",
                contact_email: "",
            });
        } catch (error) {
            toast.error("Failed to save alumni");
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Alumni Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingAlum(null); setFormData({ name: "", graduation_year: currentYear.toString(), current_status: "", bio: "", image_url: "", contact_email: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Alumni
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingAlum ? "Edit Alumni" : "Add New Alumni"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label>Name</label>
                                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label>Graduation Year</label>
                                    <Select value={formData.graduation_year} onValueChange={(val) => setFormData({ ...formData, graduation_year: val })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label>Current Status / Occupation</label>
                                <Input value={formData.current_status} onChange={(e) => setFormData({ ...formData, current_status: e.target.value })} placeholder="e.g. Studying at University of Nairobi" />
                            </div>

                            <div className="space-y-2">
                                <label>Image</label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <img loading="lazy"
                                            src={formData.image_url}
                                            alt="Preview"
                                            className="h-20 w-20 object-cover rounded-full border"
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
                            </div>

                            <div className="space-y-2">
                                <label>Bio / Success Story</label>
                                <Textarea className="h-32" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Share their journey..." />
                            </div>

                            <div className="space-y-2">
                                <label>Contact Email (Private)</label>
                                <Input type="email" value={formData.contact_email} onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })} placeholder="Contact info for admin use only" />
                            </div>

                            <Button type="submit" className="w-full" disabled={createAlum.isPending || updateAlum.isPending || uploading}>
                                {createAlum.isPending || updateAlum.isPending ? "Saving..." : "Save Alumni"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    {alumni?.length === 0 ? (
                        <div className="p-8 text-center space-y-4">
                            <p className="text-muted-foreground">No alumni records found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alumni?.map((alum: any) => (
                                    <TableRow key={alum.id}>
                                        <TableCell>
                                            {alum.image_url ? (
                                                <img loading="lazy" src={alum.image_url} alt={alum.name} className="h-10 w-10 object-cover rounded-full" />
                                            ) : (
                                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{alum.name}</TableCell>
                                        <TableCell>{alum.graduation_year}</TableCell>
                                        <TableCell>{alum.current_status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(alum)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(alum.id)}>
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

export default AlumniAdmin;
