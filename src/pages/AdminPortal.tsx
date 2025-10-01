import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Code2, LogOut, Users, FolderKanban, Mail, Shield } from "lucide-react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
  selected_package: string | null;
  selected_addons: string[] | null;
  estimated_total: number | null;
}

interface Project {
  id: string;
  title: string;
  status: string;
  client_id: string;
  created_at: string;
}

const AdminPortal = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          checkAdminRole(session.user.id);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (!data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin permissions",
          variant: "destructive",
        });
        navigate("/client");
        return;
      }

      setIsAdmin(true);
      fetchData();
    } catch (error) {
      console.error("Error checking admin role:", error);
      navigate("/client");
    }
  };

  const fetchData = async () => {
    try {
      const [contactsRes, projectsRes] = await Promise.all([
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (projectsRes.error) throw projectsRes.error;

      setContacts(contactsRes.data || []);
      setProjects(projectsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error loading data",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  Presencify
                </h1>
                <p className="text-sm text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="gradient-card rounded-2xl p-8 shadow-glow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Admin Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Manage your business operations
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  New Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold gradient-text">
                  {contacts.filter(c => c.status === "new").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold gradient-text">
                  {projects.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold gradient-text">
                  {projects.filter(p => p.status === "in-progress").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold gradient-text">
                  {new Set(projects.map(p => p.client_id)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Recent Contact Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No contact submissions yet
                </p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {contact.company && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Company: {contact.company}
                        </p>
                      )}
                      {contact.selected_package && (
                        <div className="mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-sm font-semibold text-primary mb-1">
                            Package: {contact.selected_package}
                          </p>
                          {contact.selected_addons && contact.selected_addons.length > 0 && (
                            <div className="text-xs text-muted-foreground mb-1">
                              Add-ons: {contact.selected_addons.join(', ')}
                            </div>
                          )}
                          {contact.estimated_total && (
                            <p className="text-sm font-bold gradient-text">
                              Est. Total: ${contact.estimated_total.toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                      <p className="text-sm">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5" />
                All Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No projects yet
                </p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Status: {project.status.replace("-", " ").toUpperCase()}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;
