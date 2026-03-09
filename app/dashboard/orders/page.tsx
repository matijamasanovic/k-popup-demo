import { createClient } from "@/lib/supabase/server";
import { OrdersTable } from "@/components/orders/OrdersTable";

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          {orders?.length ?? 0} orders total
        </p>
      </div>
      <OrdersTable orders={orders ?? []} />
    </div>
  );
}
