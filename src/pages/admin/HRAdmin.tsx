import { useState } from "react";
import { useJobs, useCreateJob, useUpdateJob, useDeleteJob } from "@/integrations/supabase/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const HRAdmin = () => {
    const { data: jobs, isLoading } = useJobs();
    const createJob = useCreateJob();
    const updateJob = useUpdateJob();
    const deleteJob = useDeleteJob();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "Full-time",
        category: "",
        description: "",
        requirements: "",
        is_active: true
    });

    const categories = ["Program Management", "Field Operations", "Communications", "Volunteer", "Finance", "Healthcare", "Education"];
    const types = ["Full-time", "Part-time", "Contract", "Internship", "Volunteer"];

    const handleEdit = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            location: job.location,
            type: job.type,
            category: job.category,
            description: job.description || "",
            requirements: job.requirements || "",
            is_active: job.is_active
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job posting?")) {
            await deleteJob.mutateAsync(id);
            toast.success("Job posting deleted");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await updateJob.mutateAsync({ id: editingJob.id, ...formData });
                toast.success("Job updated");
            } else {
                await createJob.mutateAsync(formData);
                toast.success("Job posted");
            }
            setIsDialogOpen(false);
            setEditingJob(null);
            setFormData({
                title: "",
                location: "",
                type: "Full-time",
                category: "",
                description: "",
                requirements: "",
                is_active: true
            });
        } catch (error: any) {
            console.error("Error saving job:", error);
            toast.error(`Failed to save job posting: ${error.message || "Unknown error"}`);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">HR & Jobs Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingJob(null); setFormData({ ...formData, title: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Post New Job
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingJob ? "Edit Job" : "Post New Job"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Job Title</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label>Location</label>
                                    <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label>Type</label>
                                    <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
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

                            <div className="space-y-2">
                                <label>Description</label>
                                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="h-32" required />
                            </div>

                            <div className="space-y-2">
                                <label>Requirements</label>
                                <Textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} className="h-32" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                />
                                <label>Active (Visible to public)</label>
                            </div>

                            <Button type="submit" className="w-full" disabled={createJob.isPending || updateJob.isPending}>
                                {createJob.isPending || updateJob.isPending ? "Saving..." : "Save Job"}
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
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs?.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={job.is_active ? "default" : "secondary"}>
                                            {job.is_active ? "Active" : "Closed"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(job.id)}>
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

export default HRAdmin;
