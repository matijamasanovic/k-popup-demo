"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Product, Category } from "@/lib/types";
import { ImageUploader } from "./ImageUploader";
import { Save, Loader2 } from "lucide-react";

interface Props {
  product?: Product;
  categories: Category[];
}

export function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name_en: product?.name_en ?? "",
    name_sr: product?.name_sr ?? "",
    description_en: product?.description_en ?? "",
    description_sr: product?.description_sr ?? "",
    price: product?.price?.toString() ?? "",
    discount_percent: product?.discount_percent?.toString() ?? "0",
    stock_quantity: product?.stock_quantity?.toString() ?? "0",
    category_id: product?.category_id ?? "",
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
    images: product?.images ?? [],
  });

  function update(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.name_en || !form.name_sr || !form.price) {
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
      price: parseFloat(form.price),
      discount_percent: parseInt(form.discount_percent) || 0,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      category_id: form.category_id || null,
      in_stock: form.in_stock,
      featured: form.featured,
      images: form.images,
    };

    if (product) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", product.id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    router.push("/dashboard/products");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Names */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Product Name</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Name (English) *
            </label>
            <input
              value={form.name_en}
              onChange={(e) => update("name_en", e.target.value)}
              placeholder="Buldak Fire Noodles"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Name (Serbian) *
            </label>
            <input
              value={form.name_sr}
              onChange={(e) => update("name_sr", e.target.value)}
              placeholder="Buldak Vatreni Rezanci"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Description</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description (English)
            </label>
            <textarea
              value={form.description_en}
              onChange={(e) => update("description_en", e.target.value)}
              placeholder="Describe the product in English..."
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description (Serbian)
            </label>
            <textarea
              value={form.description_sr}
              onChange={(e) => update("description_sr", e.target.value)}
              placeholder="Opišite proizvod na srpskom..."
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Pricing & Stock</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Price (€) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="4.99"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.discount_percent}
              onChange={(e) => update("discount_percent", e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={(e) => update("stock_quantity", e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category
            </label>
            <select
              value={form.category_id}
              onChange={(e) => update("category_id", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_en} / {cat.name_sr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Images</h2>
        <ImageUploader
          images={form.images}
          onChange={(imgs) => update("images", imgs)}
        />
      </div>

      {/* Options */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Options</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => update("in_stock", !form.in_stock)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                form.in_stock ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.in_stock ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              In Stock
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
              Featured Product
            </span>
          </label>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <Link
          href="/dashboard/products"
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
          {saving ? "Saving..." : product ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </div>
  );
}
