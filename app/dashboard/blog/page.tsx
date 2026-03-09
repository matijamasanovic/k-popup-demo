import { createClient } from "@/lib/supabase/server";
import { BlogTable } from "@/components/blog/BlogTable";
import { Plus } from "lucide-react";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground mt-1">
            {posts?.length ?? 0} posts total
          </p>
        </div>

        <a
          href="/dashboard/blog/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/25"
        >
          <Plus className="w-4 h-4" />
          New Post
        </a>
      </div>

      <BlogTable posts={posts ?? []} />
    </div>
  );
}
