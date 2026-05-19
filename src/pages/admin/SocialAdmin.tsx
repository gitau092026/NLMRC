import { useSocialFeeds, useUpdateSocialFeed } from "@/integrations/supabase/hooks/useSocialFeeds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const SocialAdmin = () => {
    const { data: feeds, isLoading } = useSocialFeeds();
    const updateFeed = useUpdateSocialFeed();

    const [facebookUrl, setFacebookUrl] = useState("");
    const [facebookActive, setFacebookActive] = useState(true);
    const [tiktokUrl, setTiktokUrl] = useState("");
    const [tiktokActive, setTiktokActive] = useState(true);

    // Store IDs to update correctly
    const [facebookId, setFacebookId] = useState<string | null>(null);
    const [tiktokId, setTiktokId] = useState<string | null>(null);

    useEffect(() => {
        if (feeds) {
            const fb = feeds.find((f) => f.platform === "facebook");
            if (fb) {
                setFacebookUrl(fb.url);
                setFacebookActive(fb.is_active || false);
                setFacebookId(fb.id);
            }

            const tt = feeds.find((f) => f.platform === "tiktok");
            if (tt) {
                setTiktokUrl(tt.url);
                setTiktokActive(tt.is_active || false);
                setTiktokId(tt.id);
            }
        }
    }, [feeds]);

    const handleSave = async () => {
        try {
            const promises = [];

            if (facebookId) {
                promises.push(updateFeed.mutateAsync({
                    id: facebookId,
                    url: facebookUrl,
                    is_active: facebookActive
                }));
            }

            if (tiktokId) {
                promises.push(updateFeed.mutateAsync({
                    id: tiktokId,
                    url: tiktokUrl,
                    is_active: tiktokActive
                }));
            }

            await Promise.all(promises);
            toast.success("Social feeds configuration updated");
        } catch (error) {
            toast.error("Failed to update settings");
        }
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Social Feeds Configuration</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Facebook Feed</CardTitle>
                    <CardDescription>Configure your Facebook Page embedding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Enable Facebook Feed</label>
                        <Switch checked={facebookActive} onCheckedChange={setFacebookActive} />
                    </div>
                    <div className="space-y-2">
                        <label>Facebook Page URL</label>
                        <Input
                            value={facebookUrl}
                            onChange={(e) => setFacebookUrl(e.target.value)}
                            placeholder="https://www.facebook.com/your-page-id"
                        />
                        <p className="text-xs text-muted-foreground">The full URL to your Facebook profile or page.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>TikTok Feed</CardTitle>
                    <CardDescription>Configure your TikTok Profile embedding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Enable TikTok Feed</label>
                        <Switch checked={tiktokActive} onCheckedChange={setTiktokActive} />
                    </div>
                    <div className="space-y-2">
                        <label>TikTok Profile URL</label>
                        <Input
                            value={tiktokUrl}
                            onChange={(e) => setTiktokUrl(e.target.value)}
                            placeholder="https://www.tiktok.com/@your-handle"
                        />
                        <p className="text-xs text-muted-foreground">The full URL to your TikTok profile.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={updateFeed.isPending}>
                    {updateFeed.isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
};

export default SocialAdmin;
