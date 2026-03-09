"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Heart, ShoppingCart, PackageX } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface Props {
  products: Product[];
}

export function ProductsGrid({ products }: Props) {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const { addItem } = useCart();

  function toggleLike(e: React.MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handleAddToCart(product: Product) {
    addItem(product, 1);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  }

  function getDiscountedPrice(price: number, discount: number) {
    return discount > 0 ? price - (price * discount) / 100 : null;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">
          No products found
        </h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const discountedPrice = getDiscountedPrice(
          product.price,
          product.discount_percent
        );
        const isAdded = addedIds.includes(product.id);

        return (
          <div
            key={product.id}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
          >
            {/* Image — clicking navigates to product */}
            <Link
              href={`/products/${product.id}`}
              className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted p-4 block"
            >
              {product.discount_percent > 0 && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-lg z-10">
                  -{product.discount_percent}%
                </span>
              )}

              <button
                onClick={(e) => toggleLike(e, product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    likedIds.includes(product.id)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>

              <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name_en}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-6xl">🍜</span>
                )}
              </div>
            </Link>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
              {/* Name — clicking navigates to product */}
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 text-sm">
                  {product.name_en}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                {product.name_sr}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    €
                    {discountedPrice
                      ? discountedPrice.toFixed(2)
                      : product.price.toFixed(2)}
                  </span>
                  {discountedPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      €{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                  <span className="text-xs text-orange-500 font-medium">
                    Only {product.stock_quantity} left
                  </span>
                )}
              </div>

              {/* Add to cart — completely independent, no parent link */}
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={`w-full flex items-center justify-center gap-1.5 rounded-xl text-xs h-9 font-medium transition-all mt-auto ${
                  isAdded
                    ? "bg-green-500 text-white"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                {isAdded ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
