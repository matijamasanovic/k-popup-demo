import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function BlogSection() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title_en, excerpt_en, cover_image, slug, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            From Our <span className="text-primary">Blog</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recipes, tips, and stories from the world of Korean cuisine
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              {/* Image */}
              <div className="aspect-[4/3] bg-muted rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    📝
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title & excerpt */}
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title_en}
              </h3>
              {post.excerpt_en && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.excerpt_en}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
