"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/lib/types";
import { Save, Loader2 } from "lucide-react";

interface Props {
  category?: Category;
}

export function CategoryForm({ category }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name_en: category?.name_en ?? "",
    name_sr: category?.name_sr ?? "",
    description_en: category?.description_en ?? "",
    description_sr: category?.description_sr ?? "",
    slug: category?.slug ?? "",
    sort_order: category?.sort_order?.toString() ?? "0",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  async function handleSave() {
    if (!form.name_en || !form.name_sr || !form.slug) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      name_en: form.name_en,
      name_sr: form.name_sr,
      description_en: form.description_en || null,
      description_sr: form.description_sr || null,
      slug: form.slug,
      sort_order: parseInt(form.sort_order) || 0,
    };

    if (category) {
      const { error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", category.id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("categories").insert(payload);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    router.refresh();
    setSaving(false);

    if (!category) {
      setForm({
        name_en: "",
        name_sr: "",
        description_en: "",
        description_sr: "",
        slug: "",
        sort_order: "0",
      });
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 space-y-4">
      <h2 className="font-semibold text-foreground">
        {category ? "Edit Category" : "Add Category"}
      </h2>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs px-3 py-2.5 rounded-xl">
          {error}
        </div>
      )}

      {/* Names side by side on mobile too */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Name (EN) *
          </label>
          <input
            value={form.name_en}
            onChange={(e) => {
              update("name_en", e.target.value);
              if (!category) update("slug", generateSlug(e.target.value));
            }}
            placeholder="Ramen & Noodles"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Name (SR) *
          </label>
          <input
            value={form.name_sr}
            onChange={(e) => update("name_sr", e.target.value)}
            placeholder="Ramen i Rezanci"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Slug *</label>
        <input
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="ramen-noodles"
          className={`${inputClass} font-mono`}
        />
        <p className="text-xs text-muted-foreground">
          Auto-generated from English name
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Description (EN)
          </label>
          <textarea
            value={form.description_en}
            onChange={(e) => update("description_en", e.target.value)}
            placeholder="Category description..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Description (SR)
          </label>
          <textarea
            value={form.description_sr}
            onChange={(e) => update("description_sr", e.target.value)}
            placeholder="Opis kategorije..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">
          Sort Order
        </label>
        <input
          type="number"
          min="0"
          value={form.sort_order}
          onChange={(e) => update("sort_order", e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 text-sm"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {saving ? "Saving..." : category ? "Save Changes" : "Add Category"}
      </button>
    </div>
  );
}
