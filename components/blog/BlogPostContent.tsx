"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

export function BlogPostContent({ post, related }: Props) {
  const [lang, setLang] = useState<"en" | "sr">("en");

  const title = lang === "en" ? post.title_en : post.title_sr;
  const content = lang === "en" ? post.content_en : post.content_sr;
  const excerpt = lang === "en" ? post.excerpt_en : post.excerpt_sr;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-fit mb-8">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              lang === "en"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("sr")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              lang === "sr"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Srpski
          </button>
        </div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="aspect-video rounded-3xl overflow-hidden mb-8 bg-muted">
            <img
              src={post.cover_image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
            {title}
          </h1>
          {excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Content */}
        {content ? (
          <div className="prose prose-neutral max-w-none text-foreground">
            {content.split("\n").map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </div>
        ) : (
          <p className="text-muted-foreground italic">
            {lang === "en"
              ? "No content available in English."
              : "Nema sadržaja na srpskom."}
          </p>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              More <span className="text-primary">Articles</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                    {p.cover_image ? (
                      <img
                        src={p.cover_image}
                        alt={p.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-4xl">📝</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                      {lang === "en" ? p.title_en : p.title_sr}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(p.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
