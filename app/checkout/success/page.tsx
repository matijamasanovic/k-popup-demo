import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderId } = await searchParams;
  const supabase = await createClient();

  const { data: order } = orderId
    ? await supabase.from("orders").select("*").eq("id", orderId).single()
    : { data: null };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Order Placed!
            </h1>
            <p className="text-muted-foreground mt-2">
              Thank you for your order. We will contact you shortly to confirm.
            </p>
          </div>

          {order && (
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold text-foreground">
                  #{order.id.slice(0, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  €{order.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-semibold text-foreground capitalize">
                  {order.payment_method.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="bg-yellow-500/10 text-yellow-600 text-xs font-medium px-3 py-1 rounded-full capitalize">
                  {order.status}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center px-6 py-3 border border-border rounded-xl text-foreground font-semibold hover:bg-muted transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
