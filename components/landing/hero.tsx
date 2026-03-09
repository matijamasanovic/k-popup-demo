"use client";

import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-muted/30 via-background to-muted/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Flame className="w-4 h-4 text-primary" />
              <span>New Arrivals - Hot & Spicy Collection</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
              Authentic <span className="text-primary">Korean</span> Flavors
              Delivered to Your Door
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Discover the best Korean ramen, snacks, drinks, and more. From
              spicy Buldak to classic Shin Ramyun, we bring Korea&apos;s
              favorite foods straight to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-12 font-semibold shadow-lg shadow-primary/25 group transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  Fast
                </div>
                <div className="text-sm text-muted-foreground">Delivery</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full scale-90" />

              {/* Product image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src="/chapagetti.png"
                  alt="Chapagetti Korean Noodles"
                  className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl font-semibold shadow-lg animate-bounce">
                -20% OFF
              </div>
              <div className="absolute bottom-8 left-0 bg-card/95 backdrop-blur-sm border border-border px-4 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-xl">
                    🔥
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Bestseller
                    </p>
                    <p className="text-xs text-muted-foreground">Chapagetti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
