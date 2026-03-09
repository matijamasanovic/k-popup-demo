import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/blog/BlogForm";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Blog
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-2">
          Edit Post
        </h1>
        <p className="text-muted-foreground mt-1">{post.title_en}</p>
      </div>

      <BlogForm post={post} />
    </div>
  );
}
