"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { BookOpen, Calendar, User } from "lucide-react";

interface Props {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: Props) {
  const [lang, setLang] = useState<"en" | "sr">("en");

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No posts yet</h3>
        <p className="text-muted-foreground mt-2">
          Check back soon for new content
        </p>
      </div>
    );
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="space-y-10">
      {/* Language switcher */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-fit">
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

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group grid md:grid-cols-2 gap-0 bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="aspect-video md:aspect-auto bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
          {featured.cover_image ? (
            <img
              src={featured.cover_image}
              alt={featured.title_en}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-8xl">📝</span>
          )}
        </div>
        <div className="p-8 flex flex-col justify-center space-y-4">
          {featured.featured && (
            <span className="inline-flex w-fit items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
          <h2 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {lang === "en" ? featured.title_en : featured.title_sr}
          </h2>
          {(lang === "en" ? featured.excerpt_en : featured.excerpt_sr) && (
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {lang === "en" ? featured.excerpt_en : featured.excerpt_sr}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {featured.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(featured.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>

      {/* Rest of posts */}
      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-5xl">📝</span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {lang === "en" ? post.title_en : post.title_sr}
                </h3>
                {(lang === "en" ? post.excerpt_en : post.excerpt_sr) && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {lang === "en" ? post.excerpt_en : post.excerpt_sr}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
