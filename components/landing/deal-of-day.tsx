import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

export async function DealOfDay() {
  const supabase = await createClient();

  const { data: deals } = await supabase
    .from("products")
    .select(
      "id, name_en, name_sr, price, discount_percent, images, in_stock, stock_quantity"
    )
    .eq("in_stock", true)
    .gt("discount_percent", 0)
    .order("discount_percent", { ascending: false })
    .limit(4);

  if (!deals || deals.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Deal of <span className="text-primary">the Day</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Limited time offers on our best-selling Korean food items
          </p>
        </div>

        {/* Deals grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {deals.map((deal) => {
            const discountedPrice =
              deal.price - (deal.price * deal.discount_percent) / 100;

            return (
              <div
                key={deal.id}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border flex flex-col"
              >
                {/* Image */}
                <Link href={`/products/${deal.id}`} className="block">
                  <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg z-10">
                      -{deal.discount_percent}%
                    </span>
                    {deal.images?.[0] ? (
                      <img
                        src={deal.images[0]}
                        alt={deal.name_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">
                        🍜
                      </span>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/products/${deal.id}`}>
                    <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors mb-3">
                      {deal.name_en}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3 mt-auto">
                    <span className="font-bold text-primary">
                      €{discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      €{deal.price.toFixed(2)}
                    </span>
                  </div>

                  <AddToCartButton product={deal} />
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/products?sort=discount"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all"
          >
            View All Deals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
