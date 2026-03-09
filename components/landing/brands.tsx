const brands = [
  { name: "Nongshim", korean: "농심" },
  { name: "Samyang", korean: "삼양" },
  { name: "Ottogi", korean: "오뚜기" },
  { name: "CJ Foods", korean: "씨제이" },
  { name: "Lotte", korean: "롯데" },
  { name: "Haitai", korean: "해태" },
]

export function Brands() {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <span className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-muted-foreground">{brand.korean}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
