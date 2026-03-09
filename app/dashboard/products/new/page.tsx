import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/products/ProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Add Product
        </h1>
        <p className="text-muted-foreground mt-1">
          Create a new product for your store
        </p>
      </div>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
