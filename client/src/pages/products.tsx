import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/public-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingBag } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-2">Products and services I offer</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!products || products.length === 0) {
    return (
      <PublicLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-2">Products and services I offer</p>
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2" data-testid="text-no-products">No Products Yet</h2>
            <p className="text-muted-foreground max-w-md">
              Products will appear here once they are added through the dashboard.
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
          <h1 className="text-4xl font-bold tracking-tight" data-testid="text-products-title">Products</h1>
          <p className="text-muted-foreground mt-2">Products and services I offer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover-elevate" data-testid={`card-product-${product.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {product.description && (
                  <CardDescription className="text-base leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
