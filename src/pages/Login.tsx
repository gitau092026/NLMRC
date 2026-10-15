import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Shield, Lock, Mail, Eye, EyeOff, AlertTriangle, ArrowLeft } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isAuthenticated,
    loginWithSupabase,
    loginWithPassphrase,
  } = useAuth();

  // Redirect to admin if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      // 1. Try Supabase backend authentication if email is provided
      if (trimmedEmail) {
        const res = await loginWithSupabase(trimmedEmail, trimmedPassword);
        if (res.success) {
          toast.success("Welcome back!");
          navigate("/admin", { replace: true });
          return;
        }
      }

      // 2. Fallback to passphrase authentication
      if (loginWithPassphrase(trimmedPassword)) {
        toast.success("Signed in successfully");
        navigate("/admin", { replace: true });
        return;
      }

      // If both fail:
      setErrorMsg("Invalid email or password. Please try again.");
      toast.error("Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2e17] via-[#103b1e] to-[#0a1e12] flex flex-col justify-center items-center p-4 font-sans text-foreground relative overflow-hidden">
      <SEO
        title="Staff Login | New Life Mwangaza Rehabilitation Centre"
        description="Authorized staff portal for New Life Mwangaza Rehabilitation Centre."
        noindex={true}
      />
      {/* Background ambient blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[hsl(var(--orange))]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 space-y-6">
        {/* Brand Logo */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-[hsl(var(--orange))] hover:scale-105 transition-transform"
            title="Return to website"
          >
            <Shield className="w-7 h-7" />
          </Link>
        </div>

        {/* Clean Login Card */}
        <Card className="border border-white/15 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 text-center">
            <CardTitle className="text-lg font-bold">Sign In</CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11 text-sm bg-background border-border/80"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 h-11 text-sm bg-background border-border/80"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 font-semibold text-sm bg-[hsl(var(--green))] hover:bg-[hsl(var(--green))]/90 text-white shadow-md transition-all mt-2"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Back Link */}
            <div className="mt-5 pt-4 border-t border-border/60 text-center">
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
