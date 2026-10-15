import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  FileText,
  Briefcase,
  Download,
  Upload,
  RotateCcw,
  Check,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  Settings,
  HelpCircle,
  X,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Database,
  Mail,
  Server,
  Key,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { SUPABASE_URL, supabase } from "@/lib/supabase";

import {
  Story,
  Job,
  GalleryItem,
  getStories,
  saveStories,
  addStory,
  updateStory,
  deleteStory,
  getJobs,
  saveJobs,
  addJob,
  updateJob,
  deleteJob,
  getGallery,
  saveGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  login,
  logout,
  isAuthenticated,
  getAdminPassword,
  setAdminPassword,
  resetToDefaults,
  exportAllData,
  importAllData,
  fileToDataUrl,
  DEFAULT_STORIES,
  DEFAULT_JOBS,
  DEFAULT_GALLERY,
} from "@/lib/adminData";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Preset Centre Images from assets for convenient selection
const PRESET_ASSET_IMAGES = [
  { label: "Empowering Youth (Tailoring)", url: DEFAULT_STORIES[0].image },
  { label: "Rebuilding Families (Reunion)", url: DEFAULT_STORIES[1].image },
  { label: "Children Learning (Classroom)", url: DEFAULT_STORIES[2].image },
  { label: "Community Baraza (Advocacy)", url: DEFAULT_STORIES[3].image },
  { label: "Katani Centre Morning Assembly", url: DEFAULT_GALLERY[0].url },
  { label: "Vocational Skills Workshop", url: DEFAULT_GALLERY[1].url },
  { label: "Accelerated Education Class", url: DEFAULT_GALLERY[2].url },
  { label: "Sports & Recreation Match", url: DEFAULT_GALLERY[3].url },
];

export default function AdminPage() {
  const navigate = useNavigate();

  // ─── Supabase & Passphrase Auth State ──────────────────────────────────────
  const {
    user,
    isAuthenticated: authed,
    logout: authLogout,
  } = useAuth();

  const handleLogout = async () => {
    await authLogout();
    toast.info("Logged out successfully");
  };

  // ─── Data State ────────────────────────────────────────────────────────────
  const [stories, setStories] = useState<Story[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // ─── Delete Confirmation State ─────────────────────────────────────────────
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: "story" | "job" | "gallery" | null;
    id: string;
    title: string;
    loading: boolean;
  }>({
    open: false,
    type: null,
    id: "",
    title: "",
    loading: false,
  });

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id || !deleteDialog.type) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    const { id, type } = deleteDialog;

    try {
      if (type === "gallery") {
        deleteGalleryItem(id);
        setGallery((prev) => prev.filter((g) => String(g.id) !== String(id)));
        try {
          await supabase.from("gallery_images").delete().eq("id", id);
        } catch (err) {
          console.warn("Supabase gallery delete:", err);
        }
        toast.success("Photo removed from gallery");
      } else if (type === "story") {
        deleteStory(id);
        setStories((prev) => prev.filter((s) => String(s.id) !== String(id)));
        try {
          await supabase.from("stories").delete().eq("id", id);
        } catch (err) {
          console.warn("Supabase story delete:", err);
        }
        toast.success("Story deleted");
      } else if (type === "job") {
        deleteJob(id);
        setJobs((prev) => prev.filter((j) => String(j.id) !== String(id)));
        try {
          await supabase.from("job_postings").delete().eq("id", id);
        } catch (err) {
          console.warn("Supabase job delete:", err);
        }
        toast.success("Job posting deleted");
      }
    } finally {
      setDeleteDialog({ open: false, type: null, id: "", title: "", loading: false });
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (authed) {
      setStories(getStories());
      setJobs(getJobs());
      setGallery(getGallery());

      // Fetch latest Supabase gallery images and merge
      supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped: GalleryItem[] = data.map((img: any) => ({
              id: img.id,
              url: img.image_url,
              caption: img.caption || img.title || "Gallery Photo",
              category: img.category || "Centre Life",
              date: img.created_at ? new Date(img.created_at).getFullYear().toString() : "2024",
              featured: false,
            }));
            setGallery(mapped);
            saveGallery(mapped);
          }
        });
    }
  }, [authed]);

  // ─── Search & Filters ──────────────────────────────────────────────────────
  const [storySearch, setStorySearch] = useState("");
  const [storyCategory, setStoryCategory] = useState("all");

  const [jobSearch, setJobSearch] = useState("");
  const [jobStatus, setJobStatus] = useState("all");

  const [galleryCategory, setGalleryCategory] = useState("all");

  const filteredStories = useMemo(() => {
    return stories.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(storySearch.toLowerCase()) ||
        s.excerpt.toLowerCase().includes(storySearch.toLowerCase()) ||
        s.category.toLowerCase().includes(storySearch.toLowerCase());
      const matchCat = storyCategory === "all" || s.category.toLowerCase() === storyCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [stories, storySearch, storyCategory]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        j.location.toLowerCase().includes(jobSearch.toLowerCase()) ||
        j.department.toLowerCase().includes(jobSearch.toLowerCase());
      const matchStatus = jobStatus === "all" || j.status === jobStatus;
      return matchSearch && matchStatus;
    });
  }, [jobs, jobSearch, jobStatus]);

  const filteredGallery = useMemo(() => {
    return gallery.filter((g) => {
      return galleryCategory === "all" || g.category.toLowerCase() === galleryCategory.toLowerCase();
    });
  }, [gallery, galleryCategory]);

  // ─── Story Modal State ─────────────────────────────────────────────────────
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<{
    title: string;
    category: string;
    excerpt: string;
    content: string;
    image: string;
    readTime: string;
    date: string;
    author: string;
    featured: boolean;
  }>({
    title: "",
    category: "Rehabilitation",
    excerpt: "",
    content: "",
    image: "",
    readTime: "4 min read",
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    author: "NLMRC Team",
    featured: false,
  });

  const openNewStoryModal = () => {
    setEditingStoryId(null);
    setStoryForm({
      title: "",
      category: "Rehabilitation",
      excerpt: "",
      content: "",
      image: PRESET_ASSET_IMAGES[0].url,
      readTime: "4 min read",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      author: "NLMRC Team",
      featured: false,
    });
    setStoryModalOpen(true);
  };

  const openEditStoryModal = (s: Story) => {
    setEditingStoryId(s.id);
    setStoryForm({
      title: s.title,
      category: s.category,
      excerpt: s.excerpt,
      content: s.content,
      image: s.image,
      readTime: s.readTime,
      date: s.date,
      author: s.author || "NLMRC Team",
      featured: !!s.featured,
    });
    setStoryModalOpen(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title.trim()) {
      toast.error("Please enter a story title");
      return;
    }
    if (!storyForm.excerpt.trim()) {
      toast.error("Please provide a short excerpt");
      return;
    }

    if (editingStoryId) {
      updateStory(editingStoryId, storyForm);
      toast.success("Story updated successfully");
    } else {
      addStory(storyForm);
      toast.success("New story created and published");
    }
    setStories(getStories());
    setStoryModalOpen(false);
  };

  const handleDeleteStory = (id: string, title: string) => {
    setDeleteDialog({
      open: true,
      type: "story",
      id,
      title,
      loading: false,
    });
  };

  // ─── Job Modal State ───────────────────────────────────────────────────────
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState<{
    title: string;
    slug: string;
    type: string;
    department: string;
    location: string;
    deadline: string;
    description: string;
    responsibilities: string;
    requirements: string;
    howToApply: string;
    status: "active" | "closed";
    postedDate: string;
  }>({
    title: "",
    slug: "",
    type: "Full-time",
    department: "Social Work & Rehabilitation",
    location: "Katani Centre, Machakos County",
    deadline: "Open until filled",
    description: "",
    responsibilities: "",
    requirements: "",
    howToApply: "Email your CV and Cover Letter to office@newlifemwangaza.org",
    status: "active",
    postedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  });

  const openNewJobModal = () => {
    setEditingJobId(null);
    setJobForm({
      title: "",
      slug: "",
      type: "Full-time",
      department: "Social Work & Rehabilitation",
      location: "Katani Centre, Machakos County",
      deadline: "Open until filled",
      description: "",
      responsibilities: "",
      requirements: "",
      howToApply: "Email your CV and Cover Letter to office@newlifemwangaza.org",
      status: "active",
      postedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
    setJobModalOpen(true);
  };

  const openEditJobModal = (j: Job) => {
    setEditingJobId(j.id);
    setJobForm({
      title: j.title,
      slug: j.slug,
      type: j.type,
      department: j.department || "Operations",
      location: j.location,
      deadline: j.deadline,
      description: j.description,
      responsibilities: j.responsibilities || "",
      requirements: j.requirements || "",
      howToApply: j.howToApply || "Email office@newlifemwangaza.org",
      status: j.status,
      postedDate: j.postedDate || "Recent",
    });
    setJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim()) {
      toast.error("Please enter a job title");
      return;
    }
    const computedSlug = jobForm.slug.trim() || generateSlug(jobForm.title);

    const payload = {
      ...jobForm,
      slug: computedSlug,
    };

    if (editingJobId) {
      updateJob(editingJobId, payload);
      toast.success("Job posting updated");
    } else {
      addJob(payload);
      toast.success("New job posting published");
    }
    setJobs(getJobs());
    setJobModalOpen(false);
  };

  const handleDeleteJob = (id: string, title: string) => {
    setDeleteDialog({
      open: true,
      type: "job",
      id,
      title,
      loading: false,
    });
  };

  // ─── Gallery Modal State ───────────────────────────────────────────────────
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<{
    url: string;
    caption: string;
    category: string;
    date: string;
    featured: boolean;
  }>({
    url: PRESET_ASSET_IMAGES[4].url,
    caption: "",
    category: "Centre Life",
    date: new Date().getFullYear().toString(),
    featured: false,
  });

  const openNewGalleryModal = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      url: PRESET_ASSET_IMAGES[4].url,
      caption: "",
      category: "Centre Life",
      date: new Date().getFullYear().toString(),
      featured: false,
    });
    setGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      url: item.url,
      caption: item.caption,
      category: item.category,
      date: item.date,
      featured: !!item.featured,
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.caption.trim()) {
      toast.error("Please provide a photo caption");
      return;
    }
    if (!galleryForm.url.trim()) {
      toast.error("Please upload or provide an image URL");
      return;
    }

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, galleryForm);
      toast.success("Photo details updated");
    } else {
      addGalleryItem(galleryForm);
      toast.success("New photo added to gallery");
    }
    setGallery(getGallery());
    setGalleryModalOpen(false);
  };

  const handleDeleteGallery = (id: string, caption?: string) => {
    setDeleteDialog({
      open: true,
      type: "gallery",
      id,
      title: caption || "this photo",
      loading: false,
    });
  };

  // ─── Settings / Security State ─────────────────────────────────────────────
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setAdminPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Admin password successfully updated!");
  };

  const handleResetData = () => {
    if (
      confirm(
        "WARNING: This will reset all Stories, Jobs, and Gallery items back to default seed data. Proceed?"
      )
    ) {
      resetToDefaults();
      setStories(getStories());
      setJobs(getJobs());
      setGallery(getGallery());
      toast.success("Data reset to defaults successfully");
    }
  };

  const handleExportData = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nlmrc_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded successfully");
  };

  const handleImportData = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAllData(content)) {
        setStories(getStories());
        setJobs(getJobs());
        setGallery(getGallery());
        toast.success("Data imported successfully!");
      } else {
        toast.error("Invalid backup file format");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Image file handler helper for Story modal
  const handleStoryImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setStoryForm((prev) => ({ ...prev, image: dataUrl }));
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to read image file");
    }
  };

  // Image file handler helper for Gallery modal
  const handleGalleryImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setGalleryForm((prev) => ({ ...prev, url: dataUrl }));
      toast.success("Photo uploaded successfully");
    } catch {
      toast.error("Failed to read image file");
    }
  };

  // Redirect to login if not authenticated
  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // AUTHENTICATED DASHBOARD
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground flex flex-col">
      <SEO
        title="Admin Management Portal | New Life Mwangaza Rehabilitation Centre"
        description="Administrative dashboard for New Life Mwangaza Rehabilitation Centre."
        noindex={true}
      />
      {/* ─── Top Brand Navigation Bar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[hsl(var(--green))] text-white shadow-md border-b border-emerald-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-[hsl(var(--orange))]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight leading-none">
                  NLMRC Admin Portal
                </h1>
                {user ? (
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 text-[10px] py-0 px-2 h-5 font-mono flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SUPABASE: {user.email}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-[10px] py-0 px-1.5 h-4 font-mono"
                  >
                    PASSPHRASE ACCESS
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-emerald-200/80 mt-0.5">
                New Life Mwangaza Rehabilitation Centre
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-medium h-8"
            >
              <Link to="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Website
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-emerald-100 hover:text-white hover:bg-red-500/20 text-xs font-medium h-8"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Main Admin Container ─────────────────────────────────────────── */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Dashboard Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
            <TabsList className="bg-slate-200/80 dark:bg-zinc-800 p-1 rounded-xl">
              <TabsTrigger value="overview" className="gap-2 text-xs sm:text-sm font-semibold">
                <Layers className="w-4 h-4 text-emerald-600" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="stories" className="gap-2 text-xs sm:text-sm font-semibold">
                <FileText className="w-4 h-4 text-emerald-600" />
                Stories ({stories.length})
              </TabsTrigger>
              <TabsTrigger value="jobs" className="gap-2 text-xs sm:text-sm font-semibold">
                <Briefcase className="w-4 h-4 text-amber-500" />
                Careers ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2 text-xs sm:text-sm font-semibold">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Gallery ({gallery.length})
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 text-xs sm:text-sm font-semibold">
                <Settings className="w-4 h-4 text-zinc-500" />
                Settings & Backup
              </TabsTrigger>
            </TabsList>

            {/* Quick Action Buttons based on tab */}
            <div className="flex items-center gap-2">
              {activeTab === "stories" && (
                <Button
                  onClick={openNewStoryModal}
                  size="sm"
                  className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  New Story
                </Button>
              )}
              {activeTab === "jobs" && (
                <Button
                  onClick={openNewJobModal}
                  size="sm"
                  className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Post Job / Opportunity
                </Button>
              )}
              {activeTab === "gallery" && (
                <Button
                  onClick={openNewGalleryModal}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Upload Photo
                </Button>
              )}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              TAB 1: OVERVIEW DASHBOARD
              ───────────────────────────────────────────────────────────────── */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-emerald-600 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Published Stories
                    </span>
                    <span className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <FileText className="w-4 h-4" />
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-black mt-1">{stories.length}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground pt-0 flex items-center justify-between">
                  <span>Visible on /stories</span>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs text-emerald-700 font-semibold"
                    onClick={() => setActiveTab("stories")}
                  >
                    Manage →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Active Careers
                    </span>
                    <span className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                      <Briefcase className="w-4 h-4" />
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-black mt-1">
                    {jobs.filter((j) => j.status === "active").length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground pt-0 flex items-center justify-between">
                  <span>{jobs.length} total postings</span>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs text-amber-600 font-semibold"
                    onClick={() => setActiveTab("jobs")}
                  >
                    Manage →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Gallery Photos
                    </span>
                    <span className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <ImageIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-black mt-1">{gallery.length}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground pt-0 flex items-center justify-between">
                  <span>Visible on /gallery</span>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs text-blue-600 font-semibold"
                    onClick={() => setActiveTab("gallery")}
                  >
                    Manage →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[hsl(var(--orange))] shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Centre Target
                    </span>
                    <span className="p-2 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-black mt-1">64 Boys</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground pt-0">
                  <span>Annual Katani rehabilitation cohort</span>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={openNewStoryModal}
                    className="w-full text-left p-4 bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm hover:border-emerald-600 hover:shadow transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Publish Success Story</p>
                        <p className="text-xs text-muted-foreground">Add rehabilitation or rescue testimony</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>

                  <button
                    onClick={openNewJobModal}
                    className="w-full text-left p-4 bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm hover:border-amber-500 hover:shadow transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Post Career or Volunteer</p>
                        <p className="text-xs text-muted-foreground">Add job vacancies or volunteer roles</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>

                  <button
                    onClick={openNewGalleryModal}
                    className="w-full text-left p-4 bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm hover:border-blue-500 hover:shadow transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Upload Centre Media</p>
                        <p className="text-xs text-muted-foreground">Add photos to community gallery</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>

                  <button
                    onClick={handleExportData}
                    className="w-full text-left p-4 bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm hover:border-zinc-400 hover:shadow transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Backup Everything to JSON</p>
                        <p className="text-xs text-muted-foreground">Download instant database snapshot</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                </div>
              </div>

              {/* Recent Stories & Jobs */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Live Published Highlights
                  </h3>
                  <Link
                    to="/stories"
                    target="_blank"
                    className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    View Stories Page ↗
                  </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-border p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Recent Stories
                  </h4>
                  {stories.slice(0, 3).map((story) => (
                    <div
                      key={story.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors border border-border/40"
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-16 h-12 object-cover rounded-md shrink-0 border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4 font-normal">
                            {story.category}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">{story.readTime}</span>
                        </div>
                        <h5 className="font-semibold text-sm truncate text-foreground">{story.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {story.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openEditStoryModal(story)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                        >
                          <Link to={`/stories/${story.id}`} target="_blank">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Recent Careers & Opportunities
                    </h4>
                    <Link
                      to="/career"
                      target="_blank"
                      className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1"
                    >
                      View Careers Page ↗
                    </Link>
                  </div>
                  {jobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors border border-border/40"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={`text-[10px] py-0 px-1.5 h-4 ${
                              job.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {job.status === "active" ? "Active" : "Closed"}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">{job.type}</span>
                        </div>
                        <h5 className="font-semibold text-sm text-foreground">{job.title}</h5>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openEditJobModal(job)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                        >
                          <Link to={`/career/${job.slug}`} target="_blank">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ─────────────────────────────────────────────────────────────────
              TAB 2: STORIES MANAGER
              ───────────────────────────────────────────────────────────────── */}
          <TabsContent value="stories" className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search stories by title or keyword..."
                  value={storySearch}
                  onChange={(e) => setStorySearch(e.target.value)}
                  className="pl-9 h-10 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Category:</span>
                {["all", "Rehabilitation", "Reintegration", "Prevention", "Community"].map((cat) => (
                  <Button
                    key={cat}
                    variant={storyCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium capitalize"
                    onClick={() => setStoryCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <Button
                onClick={openNewStoryModal}
                size="sm"
                className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Story
              </Button>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <Card
                  key={story.id}
                  className="overflow-hidden border border-border hover:border-emerald-600/50 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-white/90 text-zinc-900 font-semibold backdrop-blur-sm text-xs shadow">
                        {story.category}
                      </Badge>
                    </div>
                    {story.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[hsl(var(--orange))] text-white font-semibold text-xs shadow">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="p-4 pb-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{story.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{story.readTime}</span>
                    </div>
                    <CardTitle className="text-base font-bold line-clamp-2 text-foreground">
                      {story.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-2 border-t border-border/50 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs font-semibold h-8"
                    >
                      <Link to={`/stories/${story.id}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Live View
                      </Link>
                    </Button>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditStoryModal(story)}
                        className="h-8 px-2 text-xs text-emerald-700 hover:text-emerald-800"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStory(story.id, story.title)}
                        className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStories.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-border">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-bold text-lg">No stories match your filter</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search query or add a new story.
                </p>
                <Button onClick={openNewStoryModal} className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create First Story
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ─────────────────────────────────────────────────────────────────
              TAB 3: CAREERS & JOBS MANAGER
              ───────────────────────────────────────────────────────────────── */}
          <TabsContent value="jobs" className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title or department..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="pl-9 h-10 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Status:</span>
                {["all", "active", "closed"].map((st) => (
                  <Button
                    key={st}
                    variant={jobStatus === st ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs capitalize"
                    onClick={() => setJobStatus(st)}
                  >
                    {st}
                  </Button>
                ))}
              </div>

              <Button
                onClick={openNewJobModal}
                size="sm"
                className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Post New Opening
              </Button>
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-border hover:border-amber-500/50 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={`text-xs ${
                          job.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {job.status === "active" ? "Active" : "Closed"}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {job.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        /career/{job.slug}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-foreground">{job.title}</h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        Deadline: <strong className="text-foreground">{job.deadline}</strong>
                      </span>
                      {job.department && (
                        <span className="bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs font-semibold h-9"
                    >
                      <Link to={`/career/${job.slug}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Preview
                      </Link>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openEditJobModal(job)}
                      className="text-xs font-semibold h-9"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="text-xs text-destructive hover:text-destructive h-9"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-border">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-bold text-lg">No job openings found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Post new employment, volunteer, or internship opportunities for the Centre.
                </p>
                <Button onClick={openNewJobModal} className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Post Job Opening
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ─────────────────────────────────────────────────────────────────
              TAB 4: PHOTO GALLERY MANAGER
              ───────────────────────────────────────────────────────────────── */}
          <TabsContent value="gallery" className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Filter:</span>
                {[
                  "all",
                  "Centre Life",
                  "Vocational Training",
                  "Education",
                  "Sports & Recreation",
                  "Community Outreach",
                  "Reintegration",
                ].map((cat) => (
                  <Button
                    key={cat}
                    variant={galleryCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium"
                    onClick={() => setGalleryCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-xs"
                >
                  <Link to="/gallery" target="_blank">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    View Live Gallery
                  </Link>
                </Button>
                <Button
                  onClick={openNewGalleryModal}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Upload Photo
                </Button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden relative">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/60 text-white backdrop-blur-sm text-[10px]">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-foreground font-medium line-clamp-2">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                      <span>{item.date}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditGalleryModal(item)}
                          className="p-1 hover:text-foreground transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGallery(item.id, item.caption)}
                          className="p-1 text-destructive hover:opacity-80 transition-opacity"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGallery.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-border">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-bold text-lg">No photos in this category</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload photos showcasing Centre life, workshops, or graduation ceremonies.
                </p>
                <Button onClick={openNewGalleryModal} className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Photo
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ─────────────────────────────────────────────────────────────────
              TAB 5: SETTINGS & BACKUP
              ───────────────────────────────────────────────────────────────── */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Supabase Backend & MCP Server Status */}
              <Card className="border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-sm md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                      <Database className="w-5 h-5 text-emerald-600" />
                      Supabase Cloud Backend & MCP Server
                    </CardTitle>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-300">
                      Active
                    </Badge>
                  </div>
                  <CardDescription>
                    Cloud PostgreSQL backend, GoTrue authentication, and Model Context Protocol (MCP) server integration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-border">
                      <p className="text-muted-foreground font-semibold uppercase text-[10px]">Project Ref</p>
                      <code className="text-foreground font-mono font-bold text-xs mt-0.5 block truncate">
                        mmgihxnlpculdhbbqgpu
                      </code>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-border">
                      <p className="text-muted-foreground font-semibold uppercase text-[10px]">Current Session</p>
                      <p className="text-foreground font-medium text-xs mt-0.5 truncate">
                        {user ? user.email : "Staff Passphrase Access"}
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-border">
                      <p className="text-muted-foreground font-semibold uppercase text-[10px]">MCP Config</p>
                      <p className="text-foreground font-medium text-xs mt-0.5">.agents/mcp_config.json</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-muted/60 rounded-xl border border-border/60 text-xs text-muted-foreground space-y-1.5">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-emerald-600" />
                      Model Context Protocol (MCP) Server
                    </p>
                    <p>
                      The official Supabase MCP server (<code className="font-mono text-foreground font-semibold">@supabase/mcp-server-supabase</code>) is configured in your project at <code className="font-mono text-foreground font-semibold">.agents/mcp_config.json</code> with project reference <code className="font-mono text-foreground font-semibold">mmgihxnlpculdhbbqgpu</code>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Security / Password Management */}
              <Card className="border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-600" />
                    Change Admin Password
                  </CardTitle>
                  <CardDescription>
                    Update the security credential used to authenticate into this portal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="At least 6 characters..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Re-type new password..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-10 text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white"
                    >
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Data Backup & Restore */}
              <Card className="border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-600" />
                    Database Backup & Restore
                  </CardTitle>
                  <CardDescription>
                    Export an offline JSON backup or restore stories, careers, and media from a previous snapshot.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/60 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">Download Backup (JSON)</p>
                      <p className="text-xs text-muted-foreground">
                        Saves all {stories.length} stories, {jobs.length} jobs, and {gallery.length} photos.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      className="gap-1.5 text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" /> Export
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl border border-border/60 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">Restore from Backup</p>
                      <p className="text-xs text-muted-foreground">
                        Select a previously exported .json file to restore.
                      </p>
                    </div>
                    <label className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1.5 text-xs font-semibold"
                      >
                        <span>
                          <Upload className="w-4 h-4" /> Import
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImportData}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Reset to Seed Defaults */}
              <Card className="border border-destructive/30 bg-destructive/5 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-destructive flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Factory Seed Reset
                  </CardTitle>
                  <CardDescription className="text-destructive/80">
                    If demo or test content needs to be refreshed, this resets all stories, careers, and gallery photos back to the original verified NLMRC defaults.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    This action will overwrite local edits. Make sure to download a backup above first if you wish to keep custom edits.
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleResetData}
                    className="shrink-0"
                  >
                    Reset All to Defaults
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL: CREATE / EDIT STORY
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog open={storyModalOpen} onOpenChange={setStoryModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingStoryId ? "Edit Story" : "Create New Success Story"}
            </DialogTitle>
            <DialogDescription>
              Share inspiring testimonials of child rescue, rehabilitation, and family reunification.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveStory} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Story Title *
                </label>
                <Input
                  placeholder="e.g., From Street Crisis to Carpentry Master"
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Category
                </label>
                <select
                  value={storyForm.category}
                  onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                  className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Rehabilitation">Rehabilitation</option>
                  <option value="Reintegration">Reintegration</option>
                  <option value="Prevention">Prevention</option>
                  <option value="Education">Education</option>
                  <option value="Community">Community</option>
                  <option value="Vocational">Vocational</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Est. Read Time
                </label>
                <Input
                  placeholder="e.g., 4 min read"
                  value={storyForm.readTime}
                  onChange={(e) => setStoryForm({ ...storyForm, readTime: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Publish Date
                </label>
                <Input
                  placeholder="e.g., October 2024"
                  value={storyForm.date}
                  onChange={(e) => setStoryForm({ ...storyForm, date: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Author / Desk
                </label>
                <Input
                  placeholder="e.g., NLMRC Social Work Desk"
                  value={storyForm.author}
                  onChange={(e) => setStoryForm({ ...storyForm, author: e.target.value })}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Short Excerpt / Teaser * (Shows on cards & preview)
                </label>
                <Textarea
                  placeholder="Brief 1-2 sentence overview of the transformation..."
                  value={storyForm.excerpt}
                  onChange={(e) => setStoryForm({ ...storyForm, excerpt: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Full Story Narrative (Separate paragraphs with blank lines)
                </label>
                <Textarea
                  placeholder="Tell the full narrative: intake background, six months of recovery at Katani, skills learned, and present life..."
                  value={storyForm.content}
                  onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                  rows={6}
                />
              </div>

              {/* Image Selection / Upload */}
              <div className="space-y-2 md:col-span-2 p-3 bg-muted/40 rounded-xl border border-border">
                <label className="text-xs font-semibold uppercase text-muted-foreground flex items-center justify-between">
                  <span>Story Cover Image</span>
                  <span className="text-[11px] font-normal text-muted-foreground">
                    Upload from device or pick a preset asset
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {storyForm.image && (
                    <img
                      src={storyForm.image}
                      alt="Story preview"
                      className="w-20 h-16 object-cover rounded-lg border shadow-sm shrink-0"
                    />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <Input
                      placeholder="Paste image URL (https://... or data:image/...)"
                      value={storyForm.image}
                      onChange={(e) => setStoryForm({ ...storyForm, image: e.target.value })}
                      className="text-xs"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer">
                        <Button type="button" variant="secondary" size="sm" asChild className="h-7 text-xs">
                          <span>
                            <Upload className="w-3 h-3 mr-1" /> Upload Image File
                          </span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleStoryImageUpload}
                        />
                      </label>

                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setStoryForm({ ...storyForm, image: e.target.value });
                          }
                        }}
                        className="h-7 text-xs px-2 py-0 bg-background border rounded-md"
                        defaultValue=""
                      >
                        <option value="" disabled>Choose Centre Stock Asset...</option>
                        {PRESET_ASSET_IMAGES.map((preset, idx) => (
                          <option key={idx} value={preset.url}>
                            {preset.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="featured-story"
                  checked={storyForm.featured}
                  onChange={(e) => setStoryForm({ ...storyForm, featured: e.target.checked })}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <label htmlFor="featured-story" className="text-xs font-medium text-foreground cursor-pointer">
                  Feature this story prominently on the public homepage and stories hero section
                </label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStoryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white"
              >
                {editingStoryId ? "Save Changes" : "Publish Story"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL: CREATE / EDIT JOB
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog open={jobModalOpen} onOpenChange={setJobModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingJobId ? "Edit Opportunity" : "Post New Career or Volunteer Opening"}
            </DialogTitle>
            <DialogDescription>
              Recruit social workers, educators, counsellors, and passionate volunteers for NLMRC.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveJob} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Job Title *
                </label>
                <Input
                  placeholder="e.g., Child Protection Social Worker"
                  value={jobForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setJobForm({
                      ...jobForm,
                      title,
                      slug: editingJobId ? jobForm.slug : generateSlug(title),
                    });
                  }}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Employment Type
                </label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Paid Volunteer">Paid Volunteer</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Department
                </label>
                <Input
                  placeholder="e.g., Social Work & Rehabilitation"
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Location
                </label>
                <Input
                  placeholder="e.g., Katani Centre, Machakos County"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Application Deadline
                </label>
                <Input
                  placeholder="e.g., November 30, 2024 or Ongoing"
                  value={jobForm.deadline}
                  onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Status
                </label>
                <select
                  value={jobForm.status}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, status: e.target.value as "active" | "closed" })
                  }
                  className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="active">Active (Accepting applications)</option>
                  <option value="closed">Closed / Expired</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Custom URL Slug
                </label>
                <Input
                  placeholder="e.g., child-protection-social-worker"
                  value={jobForm.slug}
                  onChange={(e) => setJobForm({ ...jobForm, slug: generateSlug(e.target.value) })}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Job Summary & Purpose
                </label>
                <Textarea
                  placeholder="Describe the role overview and why it matters to NLMRC's mission..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Key Duties & Responsibilities (One per line)
                </label>
                <Textarea
                  placeholder="Conduct intake assessments&#10;Facilitate family mediation&#10;Maintain case records"
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Qualifications & Requirements (One per line)
                </label>
                <Textarea
                  placeholder="Degree or Diploma in Social Work&#10;Valid Certificate of Good Conduct&#10;2+ years youth work experience"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  How to Apply Instructions
                </label>
                <Input
                  placeholder="Send CV and cover letter to office@newlifemwangaza.org with subject..."
                  value={jobForm.howToApply}
                  onChange={(e) => setJobForm({ ...jobForm, howToApply: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setJobModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white"
              >
                {editingJobId ? "Save Posting" : "Publish Opening"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL: ADD / EDIT GALLERY ITEM
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog open={galleryModalOpen} onOpenChange={setGalleryModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingGalleryId ? "Edit Photo" : "Add Photo to Centre Gallery"}
            </DialogTitle>
            <DialogDescription>
              Upload high-quality imagery reflecting daily life, skills development, and community reach.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveGallery} className="space-y-4 py-2">
            <div className="space-y-2 p-3 bg-muted/40 rounded-xl border border-border">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Photo Preview & Source
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {galleryForm.url && (
                  <img
                    src={galleryForm.url}
                    alt="Gallery item preview"
                    className="w-24 h-20 object-cover rounded-lg border shadow-sm shrink-0"
                  />
                )}
                <div className="flex-1 w-full space-y-2">
                  <Input
                    placeholder="Image URL or data:image/..."
                    value={galleryForm.url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                    className="text-xs"
                    required
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer">
                      <Button type="button" variant="secondary" size="sm" asChild className="h-7 text-xs">
                        <span>
                          <Upload className="w-3 h-3 mr-1" /> Choose File
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleGalleryImageUpload}
                      />
                    </label>

                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setGalleryForm({ ...galleryForm, url: e.target.value });
                        }
                      }}
                      className="h-7 text-xs px-2 py-0 bg-background border rounded-md"
                      defaultValue=""
                    >
                      <option value="" disabled>Pick Stock Photo...</option>
                      {PRESET_ASSET_IMAGES.map((preset, idx) => (
                        <option key={idx} value={preset.url}>
                          {preset.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Caption / Description *
              </label>
              <Textarea
                placeholder="Brief caption explaining the activity, participants, or event..."
                value={galleryForm.caption}
                onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Category
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Centre Life">Centre Life</option>
                  <option value="Vocational Training">Vocational Training</option>
                  <option value="Education">Education</option>
                  <option value="Sports & Recreation">Sports & Recreation</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Reintegration">Reintegration</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Year / Date
                </label>
                <Input
                  placeholder="e.g., 2024"
                  value={galleryForm.date}
                  onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setGalleryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingGalleryId ? "Save Photo" : "Add to Gallery"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Confirmation Modal ─────────────────────────────────────── */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!open && !deleteDialog.loading) {
            setDeleteDialog((prev) => ({ ...prev, open: false }));
          }
        }}
      >
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-2">
              <Trash2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Confirm Delete
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                "{deleteDialog.title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={deleteDialog.loading}
              onClick={() => setDeleteDialog((prev) => ({ ...prev, open: false }))}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteDialog.loading}
              onClick={handleConfirmDelete}
              className="gap-2"
            >
              {deleteDialog.loading ? (
                "Deleting..."
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
