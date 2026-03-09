import { createClient } from "@/lib/supabase/server";
import { Package, Tags, TrendingUp, ShoppingBag } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: featuredCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("featured", true),
  ]);

  const stats = [
    {
      label: "Total Products",
      value: productsCount ?? 0,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Categories",
      value: categoriesCount ?? 0,
      icon: Tags,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Featured",
      value: featuredCount ?? 0,
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "In Stock",
      value: productsCount ?? 0,
      icon: ShoppingBag,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to K-Popup Admin
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/dashboard/products/new"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/25"
          >
            + Add Product
          </a>
          <a
            href="/dashboard/categories"
            className="bg-muted hover:bg-muted/80 text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            Manage Categories
          </a>
        </div>
      </div>
    </div>
  );
}
