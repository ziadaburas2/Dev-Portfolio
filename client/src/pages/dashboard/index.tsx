import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { 
  User, 
  FolderOpen, 
  Package, 
  LogOut, 
  Menu,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/dashboard/profile", label: "Profile", icon: User },
  { path: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { path: "/dashboard/products", label: "Products", icon: Package },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setLocation("/login");
      }
    } catch {
      setIsAuthenticated(false);
      setLocation("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      setLocation("/login");
    } catch {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location === item.path}
                        data-testid={`link-dashboard-${item.label.toLowerCase()}`}
                      >
                        <Link href={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 h-14 px-4 border-b border-border bg-background">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <nav className="flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">Dashboard</span>
              </nav>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio content from here
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/profile">
            <div className="p-6 rounded-lg border border-border bg-card hover-elevate cursor-pointer" data-testid="card-dashboard-profile">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Profile</h3>
                  <p className="text-sm text-muted-foreground">Edit your personal information</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/projects">
            <div className="p-6 rounded-lg border border-border bg-card hover-elevate cursor-pointer" data-testid="card-dashboard-projects">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Projects</h3>
                  <p className="text-sm text-muted-foreground">Manage your project portfolio</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/products">
            <div className="p-6 rounded-lg border border-border bg-card hover-elevate cursor-pointer" data-testid="card-dashboard-products">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Products</h3>
                  <p className="text-sm text-muted-foreground">Manage your products</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
