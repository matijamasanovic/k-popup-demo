import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  // Fetch 3 related posts (other published posts)
  const { data: related } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("slug", slug)
    .limit(3);

  return (
    <>
      <Header />
      <BlogPostContent post={post} related={related ?? []} />
      <Footer />
    </>
  );
}
