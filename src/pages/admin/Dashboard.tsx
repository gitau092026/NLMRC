import { useProfile } from "@/integrations/supabase/hooks/useProfile";
import { useUsers } from "@/integrations/supabase/hooks/useUsers";
import { useAlumni } from "@/integrations/supabase/hooks/useAlumni";
import { useStories } from "@/integrations/supabase/hooks/useStories";
import { useReports } from "@/integrations/supabase/hooks/useReports";
import { useEvents } from "@/integrations/supabase/hooks/useEvents";
import { useResources } from "@/integrations/supabase/hooks/useResources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BookOpen,
    Calendar,
    FileText,
    FileBarChart,
    ArrowRight,
    Plus,
    Shield,
    Upload,
    GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const { data: profile } = useProfile();
    const { data: users } = useUsers();
    const { data: stories } = useStories();
    const { data: reports } = useReports();
    const { data: events } = useEvents();
    const { data: resources } = useResources();
    const { data: alumni } = useAlumni();

    const stats = [
        {
            title: "Total Stories",
            value: stories?.length || 0,
            icon: BookOpen,
            color: "text-blue-500",
            href: "/admin/stories"
        },
        {
            title: "Upcoming Events",
            value: events?.length || 0,
            icon: Calendar,
            color: "text-green-500",
            href: "/admin/events"
        },
        {
            title: "Resources",
            value: resources?.length || 0,
            icon: FileText,
            color: "text-purple-500",
            href: "/admin/resources"
        },
        {
            title: "Reports",
            value: reports?.length || 0,
            icon: FileBarChart,
            color: "text-orange-500",
            href: "/admin/reports"
        },
        {
            title: "Alumni",
            value: alumni?.length || 0,
            icon: GraduationCap,
            color: "text-indigo-500",
            href: "/admin/alumni"
        }
    ];

    if (profile?.role === 'admin') {
        stats.push({
            title: "System Users",
            value: users?.length || 0,
            icon: Shield,
            color: "text-red-500",
            href: "/admin/users"
        });
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    Welcome back, {profile?.email?.split('@')[0] || 'Admin'}
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening across the platform today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Link key={stat.title} to={stat.href}>
                        <Card className="hover:shadow-lg transition-all duration-200 border-l-4" style={{ borderLeftColor: stat.color.replace('text-', 'bg-') }}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    View all <ArrowRight className="h-3 w-3" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center hover:bg-slate-50 hover:border-blue-500 transition-colors" asChild>
                        <Link to="/admin/stories">
                            <Plus className="h-6 w-6 text-blue-500" />
                            <span>Add Story</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center hover:bg-slate-50 hover:border-green-500 transition-colors" asChild>
                        <Link to="/admin/events">
                            <Plus className="h-6 w-6 text-green-500" />
                            <span>Add Event</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center hover:bg-slate-50 hover:border-purple-500 transition-colors" asChild>
                        <Link to="/admin/resources">
                            <Upload className="h-6 w-6 text-purple-500" /> {/* Changed from Upload to Plus if standard, but keeping Upload for resources implies file */}
                            <span>Upload Resource</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center hover:bg-slate-50 hover:border-orange-500 transition-colors" asChild>
                        <Link to="/admin/reports">
                            <FileBarChart className="h-6 w-6 text-orange-500" />
                            <span>Add Report</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
