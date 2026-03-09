import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { BlogGrid } from "@/components/blog/BlogGrid";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Recipes, tips and stories about Korean food culture
            </p>
          </div>
          <BlogGrid posts={posts ?? []} />
        </div>
      </div>
      <Footer />
    </>
  );
}
