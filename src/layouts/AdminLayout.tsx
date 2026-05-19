import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/supabase";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Users,
    Image,
    LogOut,
    Menu,
    Briefcase,
    FileText,
    Globe,
    Mail,
    FileBarChart
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProfile } from "@/integrations/supabase/hooks/useProfile";
import { Shield, GraduationCap } from "lucide-react";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/login");
            } else {
                setEmail(session.user.email);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/login");
            } else {
                setEmail(session.user.email);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
        toast.success("Logged out successfully");
    };

    const { data: profile } = useProfile();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/stories", label: "Stories", icon: BookOpen },
        { href: "/admin/events", label: "Events", icon: Calendar },
        { href: "/admin/team", label: "Team", icon: Users },
        { href: "/admin/gallery", label: "Gallery", icon: Image },
        { href: "/admin/hr", label: "HR & Jobs", icon: Briefcase },
        { href: "/admin/resources", label: "Resources", icon: FileText },
        { href: "/admin/global-impact", label: "Global Impact", icon: Globe },
        { href: "/admin/newsletters", label: "Newsletters", icon: Mail },
        { href: "/admin/reports", label: "Reports", icon: FileBarChart },
        { href: "/admin/hero", label: "Hero Slider", icon: Image },
        { href: "/admin/impact-report", label: "Impact Report", icon: FileBarChart },
        { href: "/admin/alumni", label: "Alumni", icon: GraduationCap },
    ];

    if (profile?.role === 'admin') {
        navItems.push({ href: "/admin/users", label: "Users", icon: Shield });
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-900 text-white">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-xs text-slate-400 mt-1">{email}</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <Button
                    variant="destructive"
                    className="w-full justify-start gap-3"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 flex items-center justify-between">
                <span className="font-bold">Admin Panel</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-r-0 bg-slate-900">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:h-screen pt-16 md:pt-0">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
