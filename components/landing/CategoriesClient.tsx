"use client";

import Link from "next/link";
import { Category } from "@/lib/types";

const iconBgs = [
  "bg-primary/20",
  "bg-secondary/20",
  "bg-accent/30",
  "bg-primary/10",
];

interface Props {
  categories: Category[];
}

export function CategoriesClient({ categories }: Props) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of authentic Korean food categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 4).map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${
                  iconBgs[i % iconBgs.length]
                } rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name_en}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-xl font-bold text-foreground">
                    {category.name_en.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-foreground mb-1 tracking-tight">
                {category.name_en}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category.name_sr}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
