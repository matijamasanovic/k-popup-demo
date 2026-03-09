import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: related }] = await Promise.all([
    supabase
      .from("products")
      .select("*, category:categories(id, name_en, name_sr, slug)")
      .eq("id", id)
      .single(),
    supabase
      .from("products")
      .select("*, category:categories(id, name_en, name_sr, slug)")
      .eq("in_stock", true)
      .neq("id", id)
      .limit(4),
  ]);

  if (!product) notFound();

  return <ProductDetail product={product} related={related ?? []} />;
}
