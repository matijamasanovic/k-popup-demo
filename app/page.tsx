import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { PromoBanners } from "@/components/landing/promo-banners";
import { Categories } from "@/components/landing/CategoriesServer";
import { TrendingProducts } from "@/components/landing/trending-products";
import { FeaturedBanner } from "@/components/landing/featured-banner";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { DealOfDay } from "@/components/landing/deal-of-day";
import { Brands } from "@/components/landing/brands";
import { BlogSection } from "@/components/landing/blog-section";
import { Newsletter } from "@/components/landing/newsletter";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PromoBanners />
      <Categories />
      <TrendingProducts />
      <FeaturedBanner />
      <Features />
      <Testimonials />
      <DealOfDay />
      <Brands />
      <BlogSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
