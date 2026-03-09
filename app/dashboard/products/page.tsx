import { createClient } from "@/lib/supabase/server";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(id, name_en, name_sr)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Products
          </h1>
          <p className="text-muted-foreground mt-1">
            {products?.length ?? 0} products total
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/25"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <ProductsTable products={products ?? []} />
    </div>
  );
}
