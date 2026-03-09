import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";

export function FeaturedBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/90 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
            {/* Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 text-secondary-foreground px-4 py-2 rounded-xl text-sm font-medium w-fit">
                <Leaf className="w-4 h-4" />
                <span>100% Authentic Korean</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight text-balance tracking-tight">
                The Authentic Korean Grocery Store
              </h2>

              <p className="text-secondary-foreground/90 text-lg max-w-md text-pretty">
                Direct imports from Korea. Fresh, authentic, and delivered with
                care. Experience the true taste of Korean cuisine at home.
              </p>

              <div>
                <Link
                  href="/products"
                  className="inline-flex items-center bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 h-12 group font-semibold shadow-lg transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl md:text-9xl">🏪</div>
                    <p className="text-secondary-foreground font-semibold mt-4">
                      K-Popup
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 text-5xl animate-bounce">
                🍜
              </div>
              <div className="absolute bottom-8 left-4 text-4xl animate-pulse">
                🌶️
              </div>
              <div className="absolute top-1/2 right-0 text-4xl">🍡</div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
        </div>
      </div>
    </section>
  );
}
