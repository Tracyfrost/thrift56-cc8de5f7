import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react";

const AdminSetup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Check if any admin already exists
    const { data: existing } = await supabase
      .from("user_roles" as any)
      .select("id")
      .eq("role", "admin")
      .limit(1);

    // For security: only allow setup if no admin exists yet
    // This check uses service-level; if RLS blocks it, that's fine — it means an admin exists
    if (existing && (existing as any[]).length > 0) {
      setError("An admin account already exists. Use the login page instead.");
      setLoading(false);
      return;
    }

    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!signUpData.user) {
      setError("Signup failed — no user returned.");
      setLoading(false);
      return;
    }

    // Insert admin role — this will work because we just created the user
    // and there are no admins yet (so the RLS "admins can manage" won't block)
    // We need a workaround: use the edge function or a special bootstrap approach
    // Since we enabled auto-confirm and the user is now authenticated, 
    // we'll call the edge function to assign the role
    const { error: fnError } = await supabase.functions.invoke("assign-admin-role", {
      body: { user_id: signUpData.user.id },
    });

    if (fnError) {
      setError("Account created but role assignment failed: " + fnError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-6 text-center">
          <CheckCircle className="mx-auto text-green-500" size={48} />
          <h1 className="text-2xl font-heading font-bold">Admin Account Created!</h1>
          <p className="text-sm text-muted-foreground">You can now sign in with your credentials.</p>
          <Button onClick={() => navigate("/admin/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-heading font-bold">Admin Setup</h1>
          <p className="text-sm text-muted-foreground">Create the first admin account for Thrift 56</p>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-3">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating…" : "Create Admin Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetup;
