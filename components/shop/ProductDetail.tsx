"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Minus,
  Plus,
  Star,
  Package,
  Tag,
} from "lucide-react";
import { Header } from "../landing/header";
import { Footer } from "../landing/footer";
import { useCart } from "@/lib/CartContext";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const discountedPrice =
    product.discount_percent > 0
      ? product.price - (product.price * product.discount_percent) / 100
      : null;

  function incrementQty() {
    if (quantity < product.stock_quantity) setQuantity((q) => q + 1);
  }

  function decrementQty() {
    if (quantity > 1) setQuantity((q) => q - 1);
  }

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {/* Main product */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-3xl overflow-hidden flex items-center justify-center relative">
                {product.discount_percent > 0 && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-xl z-10">
                    -{product.discount_percent}%
                  </span>
                )}
                {product.images?.[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name_en}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <span className="text-9xl">🍜</span>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              {product.category && (
                <Link
                  href={`/products?category=${(product.category as any).slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {(product.category as any).name_en}
                </Link>
              )}

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  {product.name_en}
                </h1>
                <p className="text-muted-foreground mt-1">{product.name_sr}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "fill-accent text-accent" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.0 / 5.0</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  €
                  {discountedPrice
                    ? discountedPrice.toFixed(2)
                    : product.price.toFixed(2)}
                </span>
                {discountedPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    €{product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {product.description_en && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description_en}
                </p>
              )}

              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                {product.stock_quantity > 5 ? (
                  <span className="text-sm text-green-600 font-medium">
                    In Stock
                  </span>
                ) : product.stock_quantity > 0 ? (
                  <span className="text-sm text-orange-500 font-medium">
                    Only {product.stock_quantity} left
                  </span>
                ) : (
                  <span className="text-sm text-destructive font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {product.stock_quantity > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">
                      Quantity
                    </span>
                    <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                      <button
                        onClick={decrementQty}
                        disabled={quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors disabled:opacity-40"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQty}
                        disabled={quantity >= product.stock_quantity}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors disabled:opacity-40"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg ${
                        added
                          ? "bg-green-500 text-white shadow-green-500/25"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25"
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {added ? "Added to Cart!" : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => setLiked((l) => !l)}
                      className={`p-3.5 rounded-xl border-2 transition-all ${
                        liked
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 text-muted-foreground"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${liked ? "fill-primary" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                You might also <span className="text-primary">like</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => {
                  const rDiscounted =
                    p.discount_percent > 0
                      ? p.price - (p.price * p.discount_percent) / 100
                      : null;

                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="bg-card border border-border hover:border-primary/20 rounded-2xl overflow-hidden group transition-all hover:shadow-lg"
                    >
                      <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center p-4">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name_en}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                            🍜
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                          {p.name_en}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-primary text-sm">
                            €
                            {rDiscounted
                              ? rDiscounted.toFixed(2)
                              : p.price.toFixed(2)}
                          </span>
                          {rDiscounted && (
                            <span className="text-xs text-muted-foreground line-through">
                              €{p.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
