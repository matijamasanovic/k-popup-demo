import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const banners = [
  {
    title: "Spicy Noodle Collection",
    subtitle: "For heat lovers!",
    emoji: "🌶️",
    bgClass: "bg-gradient-to-br from-primary to-primary/80",
    textClass: "text-primary-foreground",
  },
  {
    title: "Sweet Korean Treats",
    subtitle: "Satisfy your cravings",
    emoji: "🍡",
    bgClass: "bg-gradient-to-br from-secondary to-secondary/80",
    textClass: "text-secondary-foreground",
  },
]

export function PromoBanners() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {banners.map((banner, index) => (
            <div 
              key={index}
              className={`${banner.bgClass} rounded-2xl p-8 flex items-center justify-between overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow`}
            >
              <div className="relative z-10">
                <p className={`${banner.textClass} text-sm font-medium opacity-90 mb-2`}>
                  {banner.subtitle}
                </p>
                <h3 className={`${banner.textClass} text-2xl md:text-3xl font-bold mb-4 text-balance tracking-tight`}>
                  {banner.title}
                </h3>
                <Button 
                  variant="secondary" 
                  className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl h-10 font-medium group/btn"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="text-8xl md:text-9xl opacity-30 group-hover:scale-110 transition-transform duration-300">
                {banner.emoji}
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
