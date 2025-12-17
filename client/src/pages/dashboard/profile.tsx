import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "./index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Save, User } from "lucide-react";
import type { Profile } from "@shared/schema";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  photoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  title: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileManagement() {
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: profile ? {
      name: profile.name || "",
      email: profile.email || "",
      photoUrl: profile.photoUrl || "",
      title: profile.title || "",
      bio: profile.bio || "",
      location: profile.location || "",
      phone: profile.phone || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      twitter: profile.twitter || "",
      website: profile.website || "",
    } : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const cleanData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value === "" ? null : value])
      );
      
      if (profile) {
        return apiRequest("PUT", "/api/profile", cleanData);
      } else {
        return apiRequest("POST", "/api/profile", cleanData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl">
          <Skeleton className="h-8 w-48" />
          <Card>
            <CardContent className="pt-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3" data-testid="text-profile-management-title">
            <User className="h-8 w-8 text-primary" />
            Profile Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Update your personal information and contact details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your name, title, and photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  data-testid="input-profile-name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Full Stack Developer"
                  data-testid="input-profile-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  {...register("photoUrl")}
                  placeholder="https://example.com/photo.jpg"
                  data-testid="input-profile-photo"
                />
                {errors.photoUrl && (
                  <p className="text-sm text-destructive">{errors.photoUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  className="min-h-32"
                  data-testid="input-profile-bio"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How people can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  data-testid="input-profile-email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  data-testid="input-profile-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="San Francisco, CA"
                  data-testid="input-profile-location"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Your online presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  {...register("github")}
                  placeholder="https://github.com/username"
                  data-testid="input-profile-github"
                />
                {errors.github && (
                  <p className="text-sm text-destructive">{errors.github.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  {...register("linkedin")}
                  placeholder="https://linkedin.com/in/username"
                  data-testid="input-profile-linkedin"
                />
                {errors.linkedin && (
                  <p className="text-sm text-destructive">{errors.linkedin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  {...register("twitter")}
                  placeholder="https://twitter.com/username"
                  data-testid="input-profile-twitter"
                />
                {errors.twitter && (
                  <p className="text-sm text-destructive">{errors.twitter.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  {...register("website")}
                  placeholder="https://yourwebsite.com"
                  data-testid="input-profile-website"
                />
                {errors.website && (
                  <p className="text-sm text-destructive">{errors.website.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={mutation.isPending}
              data-testid="button-save-profile"
            >
              <Save className="h-4 w-4 mr-2" />
              {mutation.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
