"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import { Pencil, Trash2, Star, Package } from "lucide-react";

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    await supabase.from("products").delete().eq("id", id);
    router.refresh();
    setDeleting(null);
  }

  if (products.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-16 text-center">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground">No products yet</p>
        <p className="text-muted-foreground mt-1">
          Add your first product to get started
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
                Product
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Stock
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Featured
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-muted/20 transition-colors"
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🍜
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {product.name_en}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.name_sr}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {(product.category as any)?.name_en ?? "—"}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      €{product.price.toFixed(2)}
                    </p>
                    {product.discount_percent > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        -{product.discount_percent}%
                      </span>
                    )}
                  </div>
                </td>

                {/* Stock */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                        product.in_stock
                          ? "bg-green-500/10 text-green-600"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.in_stock ? "bg-green-500" : "bg-destructive"
                        }`}
                      />
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                    <p className="text-xs text-muted-foreground pl-1">
                      Qty: {product.stock_quantity ?? 0}
                    </p>
                  </div>
                </td>

                {/* Featured */}
                <td className="px-6 py-4">
                  <Star
                    className={`w-4 h-4 ${
                      product.featured
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/dashboard/products/${product.id}`}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
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
