"use client"

import Link from "next/link"

const categories = [
  {
    name: "Noodles",
    koreanName: "면류",
    emoji: "🍜",
    count: "50+ Products",
    href: "/category/noodles",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary/20",
    iconBg: "bg-primary/20",
  },
  {
    name: "Spices",
    koreanName: "양념",
    emoji: "🌶️",
    count: "30+ Products",
    href: "/category/spices",
    bgColor: "bg-secondary/10",
    hoverBg: "hover:bg-secondary/20",
    iconBg: "bg-secondary/20",
  },
  {
    name: "Sweets",
    koreanName: "과자",
    emoji: "🍡",
    count: "45+ Products",
    href: "/category/sweets",
    bgColor: "bg-accent/20",
    hoverBg: "hover:bg-accent/30",
    iconBg: "bg-accent/30",
  },
  {
    name: "Drinks",
    koreanName: "음료",
    emoji: "🧃",
    count: "40+ Products",
    href: "/category/drinks",
    bgColor: "bg-muted",
    hoverBg: "hover:bg-muted/80",
    iconBg: "bg-primary/10",
  },
  {
    name: "Teas",
    koreanName: "차",
    emoji: "🍵",
    count: "25+ Products",
    href: "/category/teas",
    bgColor: "bg-secondary/10",
    hoverBg: "hover:bg-secondary/20",
    iconBg: "bg-secondary/20",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of authentic Korean food categories
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group bg-card border border-border hover:border-primary/30 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 ${category.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{category.emoji}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1 tracking-tight">{category.name}</h3>
              <p className="text-xs text-muted-foreground mb-1">{category.koreanName}</p>
              <p className="text-xs font-medium text-primary">{category.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
