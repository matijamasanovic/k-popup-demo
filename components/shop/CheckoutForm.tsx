"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ShoppingBag, ArrowLeft, Truck } from "lucide-react";
import Link from "next/link";

type FormData = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_street: string;
  address_city: string;
  address_postal_code: string;
  address_country: string;
  customer_note: string;
};

interface ShippingConfig {
  cost: number;
  free_threshold: number;
  enabled: boolean;
}

export function CheckoutForm() {
  const router = useRouter();
  const supabase = createClient();
  const { items, totalPrice, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shipping, setShipping] = useState<ShippingConfig>({
    cost: 3.99,
    free_threshold: 50,
    enabled: true,
  });

  const [form, setForm] = useState<FormData>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address_street: "",
    address_city: "",
    address_postal_code: "",
    address_country: "Montenegro",
    customer_note: "",
  });

  useEffect(() => {
    async function fetchShipping() {
      const { data } = await supabase
        .from("settings")
        .select("value")
        .eq("id", "shipping")
        .single();
      if (data?.value) setShipping(data.value as ShippingConfig);
    }
    fetchShipping();
  }, []);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const shippingCost = !shipping.enabled
    ? 0
    : shipping.free_threshold > 0 && totalPrice >= shipping.free_threshold
    ? 0
    : shipping.cost;

  const orderTotal = totalPrice + shippingCost;

  async function handleSubmit() {
    if (
      !form.customer_name ||
      !form.customer_email ||
      !form.address_street ||
      !form.address_city
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError("");

    // 1. Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || null,
        address_street: form.address_street,
        address_city: form.address_city,
        address_postal_code: form.address_postal_code || null,
        address_country: form.address_country,
        payment_method: "cash_on_delivery",
        customer_note: form.customer_note || null,
        subtotal: totalPrice,
        shipping_cost: shippingCost,
        discount_amount: 0,
        total: orderTotal,
        status: "pending",
        payment_status: "unpaid",
      })
      .select()
      .single();

    if (orderError || !order) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // 2. Create order items
    const orderItems = items.map((item) => {
      const price =
        item.product.discount_percent > 0
          ? item.product.price -
            (item.product.price * item.product.discount_percent) / 100
          : item.product.price;
      return {
        order_id: order.id,
        product_id: item.product.id,
        product_name_en: item.product.name_en,
        product_name_sr: item.product.name_sr,
        product_image: item.product.images?.[0] ?? null,
        quantity: item.quantity,
        unit_price: price,
        total_price: price * item.quantity,
      };
    });

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      setError("Something went wrong saving your items. Please try again.");
      setSubmitting(false);
      return;
    }

    // 3. Umanji stock_quantity za svaki proizvod
    await Promise.all(
      items.map(async (item) => {
        const { data: product } = await supabase
          .from("products")
          .select("stock_quantity")
          .eq("id", item.product.id)
          .single();

        if (product) {
          await supabase
            .from("products")
            .update({
              stock_quantity: Math.max(
                0,
                product.stock_quantity - item.quantity
              ),
            })
            .eq("id", item.product.id);
        }
      })
    );

    // 4. Send email notifications (non-blocking)
    fetch("/api/orders/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        customerName: form.customer_name,
        customerEmail: form.customer_email,
        customerPhone: form.customer_phone || null,
        addressStreet: form.address_street,
        addressCity: form.address_city,
        addressPostalCode: form.address_postal_code || null,
        addressCountry: form.address_country,
        items: orderItems.map((item) => ({
          name: item.product_name_en,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          totalPrice: item.total_price,
        })),
        subtotal: totalPrice,
        shippingCost,
        total: orderTotal,
        customerNote: form.customer_note || null,
      }),
    }).catch(() => {});

    clearCart();
    router.push(`/checkout/success?order=${order.id}`);
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground">
          Add some products before checking out
        </p>
        <Link
          href="/products"
          className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Customer info */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name *
              </label>
              <input
                value={form.customer_name}
                onChange={(e) => update("customer_name", e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email *
              </label>
              <input
                type="email"
                value={form.customer_email}
                onChange={(e) => update("customer_email", e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <input
              value={form.customer_phone}
              onChange={(e) => update("customer_phone", e.target.value)}
              placeholder="+382 67 123 456"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">
            Shipping Address
          </h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Street Address *
            </label>
            <input
              value={form.address_street}
              onChange={(e) => update("address_street", e.target.value)}
              placeholder="Ulica bb"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Postal Code
              </label>
              <input
                value={form.address_postal_code}
                onChange={(e) => update("address_postal_code", e.target.value)}
                placeholder="81000"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                City *
              </label>
              <input
                value={form.address_city}
                onChange={(e) => update("address_city", e.target.value)}
                placeholder="Podgorica"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Country
              </label>
              <input
                value={form.address_country}
                onChange={(e) => update("address_country", e.target.value)}
                placeholder="Montenegro"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">
            Payment Method
          </h2>
          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-xl">💵</span>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                Cash on Delivery
              </p>
              <p className="text-xs text-muted-foreground">
                Pay when your order arrives at your door
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">Order Note</h2>
          <textarea
            value={form.customer_note}
            onChange={(e) => update("customer_note", e.target.value)}
            placeholder="Any special instructions for your order..."
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          />
        </div>
      </div>

      {/* Order summary */}
      <div className="space-y-4 lg:sticky lg:top-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Order Summary</h2>
          </div>

          <div className="divide-y divide-border max-h-72 overflow-y-auto">
            {items.map((item) => {
              const price =
                item.product.discount_percent > 0
                  ? item.product.price -
                    (item.product.price * item.product.discount_percent) / 100
                  : item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="px-6 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden shrink-0">
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name_en}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">
                        🍜
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.product.name_en}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground shrink-0">
                    €{(price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Shipping</span>
              </div>
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                <span>€{shippingCost.toFixed(2)}</span>
              )}
            </div>
            {shipping.enabled &&
              shippingCost > 0 &&
              shipping.free_threshold > 0 && (
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                  Add €{(shipping.free_threshold - totalPrice).toFixed(2)} more
                  for free shipping
                </p>
              )}
            <div className="flex justify-between font-bold text-foreground text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span>€{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 text-base"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ShoppingBag className="w-5 h-5" />
          )}
          {submitting ? "Placing Order..." : "Place Order"}
        </button>

        <Link
          href="/products"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
