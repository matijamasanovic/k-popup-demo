import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Check<span className="text-primary">out</span>
            </h1>
            <p className="text-muted-foreground mt-2">Complete your order</p>
          </div>
          <CheckoutForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
