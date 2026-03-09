"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Order, OrderStatus, PaymentStatus } from "@/lib/types";
import { Save, Loader2 } from "lucide-react";

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];
const paymentOptions: PaymentStatus[] = ["unpaid", "paid", "refunded"];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  processing: "bg-purple-500/10 text-purple-600",
  shipped: "bg-orange-500/10 text-orange-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-destructive/10 text-destructive",
};

interface Props {
  order: Order;
}

export function OrderDetail({ order }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    order.payment_status
  );
  const [adminNote, setAdminNote] = useState(order.admin_note ?? "");

  async function handleSave() {
    setSaving(true);
    await supabase
      .from("orders")
      .update({
        status,
        payment_status: paymentStatus,
        admin_note: adminNote || null,
      })
      .eq("id", order.id);
    router.refresh();
    setSaving(false);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left — Order items + customer note */}
      <div className="lg:col-span-2 space-y-6">
        {/* Items */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Order Items</h2>
          </div>
          <div className="divide-y divide-border">
            {order.order_items?.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                  {item.product_image ? (
                    <img
                      src={item.product_image}
                      alt={item.product_name_en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      🍜
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">
                    {item.product_name_en}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.product_name_sr}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground">
                    €{item.total_price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    €{item.unit_price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-border bg-muted/20 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>€{order.subtotal.toFixed(2)}</span>
            </div>
            {order.shipping_cost > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>€{order.shipping_cost.toFixed(2)}</span>
              </div>
            )}
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-€{order.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
              <span>Total</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer note */}
        {order.customer_note && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <h2 className="font-semibold text-foreground">Customer Note</h2>
            <p className="text-sm text-muted-foreground">
              {order.customer_note}
            </p>
          </div>
        )}

        {/* Customer info */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Customer & Shipping</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Name
                </p>
                <p className="font-medium text-foreground">
                  {order.customer_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="font-medium text-foreground">
                  {order.customer_email}
                </p>
              </div>
              {order.customer_phone && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <p className="font-medium text-foreground">
                    {order.customer_phone}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="font-medium text-foreground">
                  {order.address_street}
                </p>
                <p className="text-muted-foreground">
                  {order.address_postal_code} {order.address_city}
                </p>
                <p className="text-muted-foreground">{order.address_country}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Payment Method
                </p>
                <p className="font-medium text-foreground capitalize">
                  {order.payment_method.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Status management */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Manage Order</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <div
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${statusColors[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(e.target.value as PaymentStatus)
              }
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              {paymentOptions.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Admin Note
            </label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Internal notes about this order..."
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 text-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Order meta */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-semibold text-foreground">Order Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-foreground">
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="text-foreground">
                {new Date(order.created_at).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Updated</span>
              <span className="text-foreground">
                {new Date(order.updated_at).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
