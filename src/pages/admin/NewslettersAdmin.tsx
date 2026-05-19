import { useState } from "react";
import { useNewsletters, useCreateNewsletter, useUpdateNewsletter, useDeleteNewsletter } from "@/integrations/supabase/hooks/useNewsletters";
import { useNewsletterSubscribers, useCreateSubscriber, useUpdateSubscriber, useDeleteSubscriber } from "@/integrations/supabase/hooks/useNewsletterSubscribers";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2, Mail, Users } from "lucide-react";
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

const NewslettersAdmin = () => {
    // Newsletters Hooks
    const { data: newsletters, isLoading: isLoadingNewsletters } = useNewsletters();
    const createNewsletter = useCreateNewsletter();
    const updateNewsletter = useUpdateNewsletter();
    const deleteNewsletter = useDeleteNewsletter();

    // Subscribers Hooks
    const { data: subscribers, isLoading: isLoadingSubscribers } = useNewsletterSubscribers();
    const createSubscriber = useCreateSubscriber();
    const updateSubscriber = useUpdateSubscriber();
    const deleteSubscriber = useDeleteSubscriber();

    // State for tabs
    const [activeTab, setActiveTab] = useState<"newsletters" | "subscribers">("newsletters");

    // State for Newsletters
    const [isNewsletterDialogOpen, setIsNewsletterDialogOpen] = useState(false);
    const [editingNewsletter, setEditingNewsletter] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [newsletterFormData, setNewsletterFormData] = useState({
        title: "",
        date_str: new Date().toLocaleDateString(),
        file_url: ""
    });

    // State for Subscribers
    const [isSubscriberDialogOpen, setIsSubscriberDialogOpen] = useState(false);
    const [editingSubscriber, setEditingSubscriber] = useState<any>(null);
    const [subscriberEmail, setSubscriberEmail] = useState("");

    // Newsletter Handlers
    const handleEditNewsletter = (newsletter: any) => {
        setEditingNewsletter(newsletter);
        setNewsletterFormData({
            title: newsletter.title,
            date_str: newsletter.date_str || new Date().toLocaleDateString(),
            file_url: newsletter.file_url
        });
        setIsNewsletterDialogOpen(true);
    };

    const handleDeleteNewsletter = async (id: string) => {
        await deleteNewsletter.mutateAsync(id);
        toast.success("Newsletter deleted");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const originalName = file.name.split('.').slice(0, -1).join('.');
            const sanitizedName = originalName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filePath = `${Date.now()}_${sanitizedName}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('resources')
                .upload(filePath, file, { contentType: file.type });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resources')
                .getPublicUrl(filePath);

            setNewsletterFormData({ ...newsletterFormData, file_url: publicUrl });
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error('Error uploading file:', error);
            const errorMessage = error instanceof Error ? error.message : "Error uploading file";
            toast.error(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingNewsletter) {
                await updateNewsletter.mutateAsync({ id: editingNewsletter.id, ...newsletterFormData });
                toast.success("Newsletter updated");
            } else {
                await createNewsletter.mutateAsync(newsletterFormData);
                toast.success("Newsletter created");
            }
            setIsNewsletterDialogOpen(false);
            setEditingNewsletter(null);
            setNewsletterFormData({ title: "", date_str: new Date().toLocaleDateString(), file_url: "" });
        } catch (error) {
            console.error('Error saving newsletter:', error);
            toast.error(error instanceof Error ? error.message : "Failed to save newsletter");
        }
    };

    // Subscriber Handlers
    const handleEditSubscriber = (subscriber: any) => {
        setEditingSubscriber(subscriber);
        setSubscriberEmail(subscriber.email);
        setIsSubscriberDialogOpen(true);
    };

    const handleDeleteSubscriber = async (id: string) => {
        await deleteSubscriber.mutateAsync(id);
        toast.success("Subscriber deleted");
    };

    const handleSubscriberSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingSubscriber) {
                await updateSubscriber.mutateAsync({ id: editingSubscriber.id, email: subscriberEmail });
                toast.success("Subscriber updated");
            } else {
                await createSubscriber.mutateAsync(subscriberEmail);
                toast.success("Subscriber added");
            }
            setIsSubscriberDialogOpen(false);
            setEditingSubscriber(null);
            setSubscriberEmail("");
        } catch (error) {
            console.error('Error saving subscriber:', error);
            toast.error(error instanceof Error ? error.message : "Failed to save subscriber");
        }
    };

    const isLoading = isLoadingNewsletters || isLoadingSubscribers;

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Newsletters Management</h1>
                    <p className="text-muted-foreground">Manage newsletters and view subscribers</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-muted p-1 rounded-lg">
                        <Button
                            variant={activeTab === "newsletters" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveTab("newsletters")}
                            className="h-8"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Newsletters
                        </Button>
                        <Button
                            variant={activeTab === "subscribers" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveTab("subscribers")}
                            className="h-8"
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Subscribers
                        </Button>
                    </div>

                    {activeTab === "newsletters" && (
                        <Dialog open={isNewsletterDialogOpen} onOpenChange={setIsNewsletterDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => { setEditingNewsletter(null); setNewsletterFormData({ title: "", date_str: new Date().toLocaleDateString(), file_url: "" }); }}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Newsletter
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingNewsletter ? "Edit Newsletter" : "Add New Newsletter"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label>Title</label>
                                        <Input value={newsletterFormData.title} onChange={(e) => setNewsletterFormData({ ...newsletterFormData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label>Date</label>
                                        <Input value={newsletterFormData.date_str} onChange={(e) => setNewsletterFormData({ ...newsletterFormData, date_str: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label>PDF File</label>
                                        <div className="flex gap-2 items-center">
                                            <Input type="file" accept=".pdf" onChange={handleFileUpload} disabled={uploading} />
                                            {newsletterFormData.file_url && <Mail className="h-6 w-6 text-green-500" />}
                                        </div>
                                        <input type="hidden" value={newsletterFormData.file_url} required />
                                        {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                                    </div>
                                    <Button type="submit" className="w-full" disabled={createNewsletter.isPending || updateNewsletter.isPending || uploading}>
                                        {createNewsletter.isPending || updateNewsletter.isPending ? "Saving..." : "Save Newsletter"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}

                    {activeTab === "subscribers" && (
                        <Dialog open={isSubscriberDialogOpen} onOpenChange={setIsSubscriberDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => { setEditingSubscriber(null); setSubscriberEmail(""); }}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Subscriber
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingSubscriber ? "Edit Subscriber" : "Add New Subscriber"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubscriberSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label>Email Address</label>
                                        <Input type="email" value={subscriberEmail} onChange={(e) => setSubscriberEmail(e.target.value)} required placeholder="user@example.com" />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={createSubscriber.isPending || updateSubscriber.isPending}>
                                        {createSubscriber.isPending || updateSubscriber.isPending ? "Saving..." : "Save Subscriber"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {activeTab === "newsletters" ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsletters?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>{item.date_str}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEditNewsletter(item)}>
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
                                                            <AlertDialogTitle>Delete Newsletter</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this newsletter? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteNewsletter(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {newsletters?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                            No newsletters found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Subscribed At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscribers?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.email}</TableCell>
                                        <TableCell>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEditSubscriber(item)}>
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
                                                            <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this subscriber? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteSubscriber(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {subscribers?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                            No subscribers found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default NewslettersAdmin;
