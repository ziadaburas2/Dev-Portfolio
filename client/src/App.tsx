import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Products from "@/pages/products";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import DashboardOverview from "@/pages/dashboard/index";
import ProfileManagement from "@/pages/dashboard/profile";
import ProjectsManagement from "@/pages/dashboard/projects";
import ProductsManagement from "@/pages/dashboard/products";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={DashboardOverview} />
      <Route path="/dashboard/profile" component={ProfileManagement} />
      <Route path="/dashboard/projects" component={ProjectsManagement} />
      <Route path="/dashboard/products" component={ProductsManagement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
