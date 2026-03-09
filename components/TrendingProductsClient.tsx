"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

interface Props {
  products: Product[];
}

export function TrendingProductsClient({ products }: Props) {
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

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Trending <span className="text-primary">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular Korean food items loved by customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                {/* Image */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted p-6 block"
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

                  <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name_en}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-7xl">🍜</span>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {product.name_en}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.name_sr}
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < 4 ? "fill-accent text-accent" : "text-border"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary text-lg">
                      €
                      {discountedPrice
                        ? discountedPrice.toFixed(2)
                        : product.price.toFixed(2)}
                    </span>
                    {discountedPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        €{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to cart — independent button, no parent link */}
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

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-12 font-semibold shadow-lg shadow-primary/25 transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
