"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";

const menuItems = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/products",
    submenu: [
      { name: "All Products", href: "/products" },
      { name: "Ramen & Noodles", href: "/products?category=ramen-noodles" },
      { name: "Snacks", href: "/products?category=snacks" },
      { name: "Drinks", href: "/products?category=drinks" },
      { name: "Sauces & Pastes", href: "/products?category=sauces-pastes" },
      { name: "Sweets & Candy", href: "/products?category=sweets-candy" },
      { name: "Frozen Food", href: "/products?category=frozen-food" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

  // Prevent hydration mismatch — only show cart count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-xl text-foreground tracking-tight">
                K-<span className="text-primary">Popup</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.submenu && setActiveSubmenu(item.name)
                  }
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted"
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Submenu */}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search + Cart */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-muted rounded-xl px-3 py-2 w-48 lg:w-64">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val)
                        window.location.href = `/products?search=${encodeURIComponent(
                          val
                        )}`;
                    }
                  }}
                />
              </div>

              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 hover:bg-muted rounded-xl transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile search */}
              <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 mt-2">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        setMobileOpen(false);
                        window.location.href = `/products?search=${encodeURIComponent(
                          val
                        )}`;
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
