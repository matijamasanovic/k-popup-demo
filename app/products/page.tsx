import { createClient } from "@/lib/supabase/server";
import { ProductsGrid } from "@/components/shop/ProductsGrid";
import { ProductsFilter } from "@/components/shop/ProductsFilter";
import { Product } from "@/lib/types";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

interface Props {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, sort, search } = await searchParams;
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, category:categories(id, name_en, name_sr, slug)")
      .eq("in_stock", true),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  let filtered: Product[] = (products ?? []) as Product[];

  if (category) {
    filtered = filtered.filter(
      (p: Product) => (p.category as any)?.slug === category
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p: Product) =>
        p.name_en.toLowerCase().includes(q) ||
        p.name_sr.toLowerCase().includes(q)
    );
  }

  if (sort === "price_asc")
    filtered.sort((a: Product, b: Product) => a.price - b.price);
  if (sort === "price_desc")
    filtered.sort((a: Product, b: Product) => b.price - a.price);
  if (sort === "newest")
    filtered.sort(
      (a: Product, b: Product) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              All <span className="text-primary">Products</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              {filtered.length} products found
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <ProductsFilter
                categories={categories ?? []}
                selectedCategory={category}
                selectedSort={sort}
                search={search}
              />
            </aside>
            <div className="flex-1">
              <ProductsGrid products={filtered} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
