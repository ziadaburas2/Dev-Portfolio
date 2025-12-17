import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/public-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, FolderOpen, Code } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">A collection of my work and side projects</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">A collection of my work and side projects</p>
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2" data-testid="text-no-projects">No Projects Yet</h2>
            <p className="text-muted-foreground max-w-md">
              Projects will appear here once they are added through the dashboard.
            </p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight" data-testid="text-projects-title">Projects</h1>
          <p className="text-muted-foreground mt-2">A collection of my work and side projects</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group flex flex-col hover-elevate" data-testid={`card-project-${project.id}`}>
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                  </div>
                </div>
                {project.description && (
                  <CardDescription className="text-base mt-2 line-clamp-3">
                    {project.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-3">
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.split(",").map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs" data-testid={`badge-tech-${project.id}-${idx}`}>
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.url && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" data-testid={`link-project-${project.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Project
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
