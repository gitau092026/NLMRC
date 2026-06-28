import { useState } from "react";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "@/integrations/supabase/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const EventsAdmin = () => {
    const { data: events, isLoading } = useEvents();
    const createEvent = useCreateEvent();
    const updateEvent = useUpdateEvent();
    const deleteEvent = useDeleteEvent();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
        event_number: 1,
        stats: {} // Basic support for now, can be expanded
    });

    const handleEdit = (event: any) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || "",
            image_url: event.image_url || "",
            event_number: event.event_number || 1,
            stats: event.stats || {}
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            await deleteEvent.mutateAsync(id);
            toast.success("Event deleted");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await updateEvent.mutateAsync({ id: editingEvent.id, ...formData });
                toast.success("Event updated");
            } else {
                await createEvent.mutateAsync(formData);
                toast.success("Event created");
            }
            setIsDialogOpen(false);
            setEditingEvent(null);
            setFormData({ title: "", description: "", image_url: "", event_number: 1, stats: {} });
        } catch (error) {
            toast.error("Failed to save event");
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Events Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingEvent(null); setFormData({ ...formData, title: "" }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label>Title</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label>Image URL</label>
                                <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>Description</label>
                                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label>Event Number</label>
                                <Input type="number" value={formData.event_number} onChange={(e) => setFormData({ ...formData, event_number: parseInt(e.target.value) })} />
                            </div>

                            <Button type="submit" className="w-full" disabled={createEvent.isPending || updateEvent.isPending}>
                                {createEvent.isPending || updateEvent.isPending ? "Saving..." : "Save Event"}
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
                                <TableHead>Title</TableHead>
                                <TableHead>Event #</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events?.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>
                                        {event.image_url && <img loading="lazy" src={event.image_url} alt={event.title} className="h-10 w-16 object-cover rounded" />}
                                    </TableCell>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{event.event_number}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(event.id)}>
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

export default EventsAdmin;
