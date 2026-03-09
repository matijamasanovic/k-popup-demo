import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { MapPin, Mail, Phone, Heart, Flame, Star, Leaf } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4" />
                Our Story
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight mb-6">
                Bringing Korea <br />
                <span className="text-primary">to Your Table</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We're a passionate team of Korean food lovers on a mission to
                make authentic Korean flavours accessible to everyone in the
                Balkans and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">
                  How It All <span className="text-primary">Started</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  It started with a craving. After falling in love with Korean
                  food — the bold spices, the deep umami, the satisfying warmth
                  of a good ramen bowl — we realized there was nowhere nearby to
                  actually buy these products.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  So we decided to do something about it. K-Popup was born out
                  of a simple idea: authentic Korean food shouldn't be a luxury.
                  It should be as easy to find as your favourite local snack.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today we source directly from Korea, bringing you the same
                  products you'd find in Seoul's convenience stores and markets
                  — delivered straight to your door.
                </p>
              </div>

              {/* Visual card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-secondary via-secondary to-secondary/80 rounded-3xl p-10 text-center relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="text-7xl mb-4">🏪</div>
                  <p className="text-secondary-foreground font-bold text-2xl tracking-tight">
                    K-Popup
                  </p>
                  <p className="text-secondary-foreground/80 text-sm mt-2">
                    Est. 2024 · Montenegro
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-secondary-foreground">
                        100+
                      </p>
                      <p className="text-xs text-secondary-foreground/70 mt-1">
                        Products
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-secondary-foreground">
                        500+
                      </p>
                      <p className="text-xs text-secondary-foreground/70 mt-1">
                        Happy Customers
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-secondary-foreground">
                        🇰🇷
                      </p>
                      <p className="text-xs text-secondary-foreground/70 mt-1">
                        Direct Import
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Korean Food */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
                Why <span className="text-primary">Korean Food?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Korean cuisine is one of the most exciting, diverse, and healthy
                food cultures in the world. Here's why we're obsessed.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  emoji: "🌶️",
                  title: "Bold Flavours",
                  desc: "From the fiery heat of buldak to the deep umami of doenjang — Korean food never plays it safe and we love it for that.",
                },
                {
                  emoji: "🥗",
                  title: "Incredibly Healthy",
                  desc: "Fermented foods like kimchi are packed with probiotics. Korean cuisine is naturally balanced with vegetables, lean proteins and minimal additives.",
                },
                {
                  emoji: "🍜",
                  title: "Endlessly Varied",
                  desc: "Ramen, tteokbokki, kimbap, bingsu — the variety is staggering. There's always something new to discover and fall in love with.",
                },
                {
                  emoji: "⚡",
                  title: "Quick to Prepare",
                  desc: "Most of our products are ready in minutes. Korean instant food is genuinely delicious — not a compromise, just convenience.",
                },
                {
                  emoji: "🎭",
                  title: "Cultural Experience",
                  desc: "Eating Korean food is a window into a rich culture. Every bite has a story, a tradition, a moment of shared history.",
                },
                {
                  emoji: "💜",
                  title: "K-Wave Approved",
                  desc: "From K-dramas to K-pop, Korean culture is everywhere. Now the food is too — and it tastes even better than it looks on screen.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
                Our <span className="text-primary">Mission & Values</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Flame,
                  color: "text-primary",
                  bg: "bg-primary/10",
                  title: "Authenticity First",
                  desc: "We only source products that are actually sold in Korea. No imitations, no shortcuts — just the real thing.",
                },
                {
                  icon: Leaf,
                  color: "text-green-600",
                  bg: "bg-green-500/10",
                  title: "Quality Over Quantity",
                  desc: "Every product in our store has been tried and tested by our team. If we wouldn't eat it ourselves, it doesn't make the cut.",
                },
                {
                  icon: Star,
                  color: "text-yellow-500",
                  bg: "bg-yellow-500/10",
                  title: "Community Driven",
                  desc: "Our customers shape what we stock. We listen, we respond, and we grow together with our Korean food community.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-card border border-border rounded-2xl p-8 space-y-4 text-center hover:border-primary/20 transition-all"
                  >
                    <div
                      className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto`}
                    >
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
                Get in <span className="text-primary">Touch</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Have a question, a suggestion, or just want to talk Korean food?
                We'd love to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Montenegro",
                  sub: "Delivering across the region",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@kpopup.me",
                  sub: "We reply within 24h",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+382 67 000 000",
                  sub: "Mon–Sat, 9am–6pm",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-card border border-border rounded-2xl p-6 text-center space-y-3 hover:border-primary/20 transition-all"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                        {item.label}
                      </p>
                      <p className="font-semibold text-foreground text-sm">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
