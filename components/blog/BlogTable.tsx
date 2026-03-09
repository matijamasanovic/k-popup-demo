"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/lib/types";
import { Pencil, Trash2, BookOpen, Star, Eye, EyeOff } from "lucide-react";

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(id);

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (!error) router.refresh();

    setDeleting(null);
  }

  async function handleTogglePublish(id: string, current: boolean) {
    setToggling(id);

    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !current })
      .eq("id", id);

    if (!error) router.refresh();

    setToggling(null);
  }

  if (posts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-16 text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground">No posts yet</p>
        <p className="text-muted-foreground mt-1">
          Create your first blog post
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Post
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Author
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Featured
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/20 transition-colors">
                {/* Post */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          📝
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate max-w-xs">
                        {post.title_en}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-xs">
                        {post.title_sr}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Author */}
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {post.author}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                      post.published
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        post.published ? "bg-green-500" : "bg-muted-foreground"
                      }`}
                    />
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Featured */}
                <td className="px-6 py-4">
                  <Star
                    className={`w-4 h-4 ${
                      post.featured
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        handleTogglePublish(post.id, post.published)
                      }
                      disabled={toggling === post.id}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50"
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {post.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                    <Link
                      href={`/dashboard/blog/${post.id}`}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
