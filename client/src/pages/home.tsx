import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/public-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Globe, User } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function Home() {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Skeleton className="h-48 w-48 rounded-full" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full max-w-xl" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!profile) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <User className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2" data-testid="text-no-profile">No Profile Found</h2>
          <p className="text-muted-foreground max-w-md">
            The developer profile hasn't been set up yet. Please check back later or contact the administrator.
          </p>
        </div>
      </PublicLayout>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PublicLayout>
      <div className="space-y-12">
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-8">
          <Avatar className="h-48 w-48 border-4 border-primary/20">
            <AvatarImage src={profile.photoUrl || ""} alt={profile.name} />
            <AvatarFallback className="text-4xl font-semibold bg-primary/10 text-primary">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-profile-name">
                {profile.name}
              </h1>
              {profile.title && (
                <p className="text-xl text-muted-foreground mt-2" data-testid="text-profile-title">
                  {profile.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {profile.location && (
                <Badge variant="secondary" className="gap-1" data-testid="badge-location">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </Badge>
              )}
              {profile.email && (
                <Badge variant="secondary" className="gap-1" data-testid="badge-email">
                  <Mail className="h-3 w-3" />
                  {profile.email}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {profile.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" data-testid="link-github">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {profile.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {profile.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer" data-testid="link-twitter">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              )}
              {profile.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" data-testid="link-website">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        {profile.bio && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed whitespace-pre-wrap" data-testid="text-profile-bio">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.email && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${profile.email}`} className="font-medium hover:text-primary transition-colors" data-testid="text-contact-email">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${profile.phone}`} className="font-medium hover:text-primary transition-colors" data-testid="text-contact-phone">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium" data-testid="text-contact-location">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  );
}
