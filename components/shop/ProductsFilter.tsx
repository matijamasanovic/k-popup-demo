"use client";

import { useRouter, usePathname } from "next/navigation";
import { Category } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  categories: Category[];
  selectedCategory?: string;
  selectedSort?: string;
  search?: string;
}

const sortOptions = [
  { value: "", label: "Default" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export function ProductsFilter({
  categories,
  selectedCategory,
  selectedSort,
  search,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(search ?? "");

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedSort) params.set("sort", selectedSort);
    if (searchValue) params.set("search", searchValue);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ search: searchValue || undefined });
  }

  function clearAll() {
    setSearchValue("");
    startTransition(() => router.push(pathname));
  }

  const hasFilters = selectedCategory || selectedSort || search;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go
          </button>
        </form>
      </div>

      {/* Sort */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground text-sm">Sort By</h3>
        </div>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParams({ sort: opt.value || undefined })}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                (selectedSort ?? "") === opt.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-foreground text-sm">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateParams({ category: undefined })}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
              !selectedCategory
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams({ category: cat.slug })}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all"
        >
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );
}
