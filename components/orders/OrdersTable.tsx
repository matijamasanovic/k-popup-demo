"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Order, OrderStatus } from "@/lib/types";
import { ShoppingBag, Eye } from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-yellow-500/10 text-yellow-600" },
  confirmed: { label: "Confirmed", classes: "bg-blue-500/10 text-blue-600" },
  processing: {
    label: "Processing",
    classes: "bg-purple-500/10 text-purple-600",
  },
  shipped: { label: "Shipped", classes: "bg-orange-500/10 text-orange-600" },
  delivered: { label: "Delivered", classes: "bg-green-500/10 text-green-600" },
  cancelled: {
    label: "Cancelled",
    classes: "bg-destructive/10 text-destructive",
  },
};

const paymentConfig = {
  unpaid: { label: "Unpaid", classes: "bg-destructive/10 text-destructive" },
  paid: { label: "Paid", classes: "bg-green-500/10 text-green-600" },
  refunded: { label: "Refunded", classes: "bg-muted text-muted-foreground" },
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: OrderStatus) {
    setUpdatingId(id);
    await supabase.from("orders").update({ status }).eq("id", id);
    router.refresh();
    setUpdatingId(null);
  }

  if (orders.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-16 text-center">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground">No orders yet</p>
        <p className="text-muted-foreground mt-1">
          Orders from your store will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Order
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Items
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Payment
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const payment = paymentConfig[order.payment_status];
              const itemCount = order.order_items?.length ?? 0;

              return (
                <tr
                  key={order.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  {/* Order ID + Date */}
                  <td className="px-6 py-4">
                    <p className="font-mono font-semibold text-foreground text-sm">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground text-sm">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer_email}
                    </p>
                  </td>

                  {/* Items count */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground text-sm">
                      €{order.total.toFixed(2)}
                    </p>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${payment.classes}`}
                    >
                      {payment.label}
                    </span>
                  </td>

                  {/* Status dropdown */}
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 ${status.classes}`}
                    >
                      {Object.entries(statusConfig).map(
                        ([value, { label }]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <a
                        href={`/dashboard/orders/${order.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
