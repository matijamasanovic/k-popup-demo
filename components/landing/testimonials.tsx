import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Kim",
    role: "Food Blogger",
    avatar: "👩‍🍳",
    content: "The quality of products at K-Popup is incredible! The Shin Ramyun tastes exactly like what I had in Seoul. Fast shipping and great customer service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Home Cook",
    avatar: "👨‍🍳",
    content: "Finally found a place that sells authentic Korean ingredients. The gochugaru (chili flakes) is perfect for my homemade kimchi!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Park",
    role: "K-Food Enthusiast",
    avatar: "👩",
    content: "Best selection of Korean snacks I've found online. The Honey Butter Chips are always fresh. I'm a customer for life!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Happy Customers <span className="text-primary">Love</span> Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their K-Popup experience
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/20 hover:shadow-lg transition-all relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <Quote className="w-5 h-5 text-accent" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed text-pretty">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
