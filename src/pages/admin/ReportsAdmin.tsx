import { useState } from "react";
import { useReports, useCreateReport, useUpdateReport, useDeleteReport } from "@/integrations/supabase/hooks/useReports";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2, FileBarChart } from "lucide-react";
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

const ReportsAdmin = () => {
    const { data: reports, isLoading } = useReports();
    const createReport = useCreateReport();
    const updateReport = useUpdateReport();
    const deleteReport = useDeleteReport();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        year: new Date().getFullYear().toString(),
        file_url: ""
    });

    const handleEdit = (report: any) => {
        setEditingReport(report);
        setFormData({
            title: report.title,
            year: report.year || new Date().getFullYear().toString(),
            file_url: report.file_url
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteReport.mutateAsync(id);
        toast.success("Report deleted");
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
            if (editingReport) {
                await updateReport.mutateAsync({ id: editingReport.id, ...formData });
                toast.success("Report updated");
            } else {
                await createReport.mutateAsync(formData);
                toast.success("Report created");
            }
            setIsDialogOpen(false);
            setEditingReport(null);
            setFormData({ title: "", year: new Date().getFullYear().toString(), file_url: "" });
        } catch (error) {
            console.error('Error saving report:', error);
            const errorMessage = error instanceof Error ? error.message : "Failed to save report";
            toast.error(errorMessage);
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Reports Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingReport(null); setFormData({ title: "", year: new Date().getFullYear().toString(), file_url: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingReport ? "Edit Report" : "Add New Report"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Title</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label>Year</label>
                                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>PDF File</label>
                                <div className="flex gap-2 items-center">
                                    <Input type="file" accept=".pdf" onChange={handleFileUpload} disabled={uploading} />
                                    {formData.file_url && <FileBarChart className="h-6 w-6 text-green-500" />}
                                </div>
                                <input type="hidden" value={formData.file_url} required />
                                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={createReport.isPending || updateReport.isPending || uploading}>
                                {createReport.isPending || updateReport.isPending ? "Saving..." : "Save Report"}
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
                                <TableHead>Year</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.year}</TableCell>
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
                                                        <AlertDialogTitle>Delete Report</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this report? This action cannot be undone.
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
                            {reports?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                        No reports found
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

export default ReportsAdmin;
