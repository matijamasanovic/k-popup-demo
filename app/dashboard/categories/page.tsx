import { createClient } from "@/lib/supabase/server";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { CategoryForm } from "@/components/categories/CategoryForm";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Categories
        </h1>
        <p className="text-muted-foreground mt-1">
          {categories?.length ?? 0} categories total
        </p>
      </div>

      {/* On mobile: stacked. On lg+: form left, table right */}
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-1">
          <CategoryForm />
        </div>
        <div className="lg:col-span-2">
          <CategoriesTable categories={categories ?? []} />
        </div>
      </div>
    </div>
  );
}
