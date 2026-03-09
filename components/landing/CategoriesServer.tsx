import { createClient } from "@/lib/supabase/server";
import { CategoriesClient } from "./CategoriesClient";

export async function Categories() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return <CategoriesClient categories={categories ?? []} />;
}
