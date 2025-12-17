import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/public-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, MessageCircle } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function Contact() {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
            <p className="text-muted-foreground mt-2">Get in touch with me</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </PublicLayout>
    );
  }

  if (!profile) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
            <p className="text-muted-foreground mt-2">Get in touch with me</p>
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2" data-testid="text-no-contact">Contact Information Unavailable</h2>
            <p className="text-muted-foreground max-w-md">
              Contact information will be available once the profile is set up.
            </p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const hasContact = profile.email || profile.phone || profile.location;
  const hasSocial = profile.github || profile.linkedin || profile.twitter || profile.website;

  return (
    <PublicLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight" data-testid="text-contact-title">Get In Touch</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            I'd love to hear from you. Feel free to reach out!
          </p>
        </div>

        {hasContact && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {profile.email && (
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover-elevate transition-colors"
                    data-testid="link-contact-email"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-lg">{profile.email}</p>
                    </div>
                  </a>
                )}
                {profile.phone && (
                  <a 
                    href={`tel:${profile.phone}`} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover-elevate transition-colors"
                    data-testid="link-contact-phone"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-lg">{profile.phone}</p>
                    </div>
                  </a>
                )}
                {profile.location && (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-lg" data-testid="text-contact-location">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {hasSocial && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Connect With Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.github && (
                  <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" data-testid="link-social-github">
                      <Github className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">GitHub</p>
                        <p className="text-xs text-muted-foreground">View my repositories</p>
                      </div>
                    </a>
                  </Button>
                )}
                {profile.linkedin && (
                  <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" data-testid="link-social-linkedin">
                      <Linkedin className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-xs text-muted-foreground">Professional profile</p>
                      </div>
                    </a>
                  </Button>
                )}
                {profile.twitter && (
                  <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" data-testid="link-social-twitter">
                      <Twitter className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Twitter</p>
                        <p className="text-xs text-muted-foreground">Follow for updates</p>
                      </div>
                    </a>
                  </Button>
                )}
                {profile.website && (
                  <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" data-testid="link-social-website">
                      <Globe className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Website</p>
                        <p className="text-xs text-muted-foreground">Visit my website</p>
                      </div>
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PublicLayout>
  );
}
