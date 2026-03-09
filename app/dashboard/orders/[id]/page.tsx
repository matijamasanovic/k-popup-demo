import { createClient } from "@/lib/supabase/server";
import { OrderDetail } from "@/components/orders/OrderDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div>
        <a
          href="/dashboard/orders"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Orders
        </a>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mt-2">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </h1>
        <p className="text-muted-foreground mt-1">
          {new Date(order.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <OrderDetail order={order} />
    </div>
  );
}
