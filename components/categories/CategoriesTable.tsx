"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/lib/types";
import { CategoryForm } from "./CategoryForm";
import { Pencil, Trash2, Tags, X } from "lucide-react";

export function CategoriesTable({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);

  async function handleDelete(id: string) {
    if (
      !confirm("Are you sure? Products in this category will be uncategorized.")
    )
      return;
    setDeleting(id);
    await supabase.from("categories").delete().eq("id", id);
    router.refresh();
    setDeleting(null);
  }

  if (categories.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center">
        <Tags className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="font-semibold text-foreground">No categories yet</p>
        <p className="text-muted-foreground text-sm mt-1">
          Add your first category using the form
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Edit Category</h2>
              <button
                onClick={() => {
                  setEditing(null);
                  router.refresh();
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <CategoryForm category={editing} />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE — card list */}
      <div className="md:hidden space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {cat.name_en}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {cat.name_sr}
              </p>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground mt-1 inline-block">
                {cat.slug}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditing(cat)}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                disabled={deleting === cat.id}
                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP — table */}
      <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Slug
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Order
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-foreground text-sm">
                    {cat.name_en}
                  </p>
                  <p className="text-xs text-muted-foreground">{cat.name_sr}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="font-mono text-xs bg-muted px-2 py-1 rounded-lg text-muted-foreground">
                    {cat.slug}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-muted-foreground">
                    {cat.sort_order}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditing(cat)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deleting === cat.id}
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
