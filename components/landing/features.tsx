import { Truck, RefreshCw, Headphones, Mail } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Orders over $50",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
    iconBg: "bg-accent/20",
    iconColor: "text-accent-foreground",
  },
  {
    icon: Mail,
    title: "Newsletter",
    description: "Get 10% off first order",
    iconBg: "bg-muted",
    iconColor: "text-primary",
  },
];

export function Features() {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 ${feature.iconBg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
              >
                <feature.icon
                  className={`w-5 h-5 md:w-6 md:h-6 ${feature.iconColor}`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
