import { createClient } from "@/lib/supabase/server";
import { TrendingProductsClient } from "../TrendingProductsClient";

export async function TrendingProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name_en, name_sr)")
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .limit(8);

  return <TrendingProductsClient products={products ?? []} />;
}
