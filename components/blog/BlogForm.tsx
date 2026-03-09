"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/lib/types";
import { Save, Loader2, Upload, X } from "lucide-react";

interface Props {
  post?: BlogPost;
}

export function BlogForm({ post }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  const [form, setForm] = useState({
    title_en: post?.title_en ?? "",
    title_sr: post?.title_sr ?? "",
    slug: post?.slug ?? "",
    excerpt_en: post?.excerpt_en ?? "",
    excerpt_sr: post?.excerpt_sr ?? "",
    content_en: post?.content_en ?? "",
    content_sr: post?.content_sr ?? "",
    cover_image: post?.cover_image ?? "",
    author: post?.author ?? "K-Popup Team",
    published: post?.published ?? false,
    featured: post?.featured ?? false,
  });

  function update(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);

    const ext = file.name.split(".").pop();
    const filename = `blog-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filename, file);

    if (!error) {
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filename);
      update("cover_image", data.publicUrl);
    }

    setUploadingCover(false);
  }

  async function handleSave() {
    if (!form.title_en || !form.title_sr || !form.slug) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title_en: form.title_en,
      title_sr: form.title_sr,
      slug: form.slug,
      excerpt_en: form.excerpt_en || null,
      excerpt_sr: form.excerpt_sr || null,
      content_en: form.content_en || null,
      content_sr: form.content_sr || null,
      cover_image: form.cover_image || null,
      author: form.author,
      published: form.published,
      featured: form.featured,
    };

    if (post) {
      const { error } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", post.id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    router.push("/dashboard/blog");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Titles */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Title & Slug</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Title (English) *
            </label>
            <input
              value={form.title_en}
              onChange={(e) => {
                update("title_en", e.target.value);
                if (!post) update("slug", generateSlug(e.target.value));
              }}
              placeholder="How to Cook Korean Ramen"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Title (Serbian) *
            </label>
            <input
              value={form.title_sr}
              onChange={(e) => update("title_sr", e.target.value)}
              placeholder="Kako Kuvati Korejski Ramen"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="how-to-cook-korean-ramen"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Auto-generated from English title
          </p>
        </div>
      </div>

      {/* Excerpts */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Excerpt</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Excerpt (English)
            </label>
            <textarea
              value={form.excerpt_en}
              onChange={(e) => update("excerpt_en", e.target.value)}
              placeholder="Short summary of the post..."
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Excerpt (Serbian)
            </label>
            <textarea
              value={form.excerpt_sr}
              onChange={(e) => update("excerpt_sr", e.target.value)}
              placeholder="Kratak opis posta..."
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Content</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Content (English)
            </label>
            <textarea
              value={form.content_en}
              onChange={(e) => update("content_en", e.target.value)}
              placeholder="Write your post content in English..."
              rows={12}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Content (Serbian)
            </label>
            <textarea
              value={form.content_sr}
              onChange={(e) => update("content_sr", e.target.value)}
              placeholder="Napišite sadržaj posta na srpskom..."
              rows={12}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none font-mono text-sm"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Supports Markdown formatting
        </p>
      </div>

      {/* Cover Image */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Cover Image</h2>
        {form.cover_image ? (
          <div className="relative">
            <img
              src={form.cover_image}
              alt="Cover"
              className="w-full h-48 object-cover rounded-xl border border-border"
            />
            <button
              type="button"
              onClick={() => update("cover_image", "")}
              className="absolute top-3 right-3 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-primary/5 group">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            {uploadingCover ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium text-foreground">
                  Click to upload cover image
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP supported
                </p>
              </div>
            )}
          </label>
        )}
      </div>

      {/* Meta */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Meta</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Author</label>
          <input
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
            placeholder="K-Popup Team"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => update("published", !form.published)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                form.published ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              Published
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => update("featured", !form.featured)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                form.featured ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              Featured
            </span>
          </label>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <Link
          href="/dashboard/blog"
          className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 text-sm"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : post ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </div>
  );
}
