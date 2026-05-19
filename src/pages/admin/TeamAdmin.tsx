import { useState } from "react";
import { useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from "@/integrations/supabase/hooks/useTeamMembers";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const TeamAdmin = () => {
    const { data: members, isLoading } = useTeamMembers();
    const createMember = useCreateTeamMember();
    const updateMember = useUpdateTeamMember();
    const deleteMember = useDeleteTeamMember();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        image_url: "",
        bio: "",
        order_index: 0
    });

    const handleEdit = (member: any) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            position: member.position,
            image_url: member.image_url || "",
            bio: member.bio || "",
            order_index: member.order_index || 0
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this team member?")) {
            await deleteMember.mutateAsync(id);
            toast.success("Team member deleted");
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
            if (editingMember) {
                await updateMember.mutateAsync({ id: editingMember.id, ...formData });
                toast.success("Team member updated");
            } else {
                await createMember.mutateAsync(formData);
                toast.success("Team member added");
            }
            setIsDialogOpen(false);
            setEditingMember(null);
            setFormData({ name: "", position: "", image_url: "", bio: "", order_index: 0 });
        } catch (error: any) {
            console.error("Error saving team member:", error);
            toast.error(`Failed to save team member: ${error.message || "Unknown error"}`);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingMember(null); setFormData({ ...formData, name: "", image_url: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Team Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Name</label>
                                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label>Position</label>
                                <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
                            </div>

                            <div className="space-y-2">
                                <label>Image</label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <img
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
                                <input type="hidden" value={formData.image_url} />
                            </div>

                            <div className="space-y-2">
                                <label>Order Index</label>
                                <Input type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <label>Bio</label>
                                <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                            </div>

                            <Button type="submit" className="w-full" disabled={createMember.isPending || updateMember.isPending || uploading}>
                                {createMember.isPending || updateMember.isPending ? "Saving..." : "Save Member"}
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
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members?.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="h-10 w-10 overflow-hidden rounded-full">
                                            {member.image_url ? (
                                                <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-gray-200" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.position}</TableCell>
                                    <TableCell>{member.order_index}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(member.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeamAdmin;
