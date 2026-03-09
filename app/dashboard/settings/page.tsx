import { createClient } from "@/lib/supabase/server";
import { ShippingSettings } from "@/components/dashboard/ShippingSettings";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("settings")
    .select("*")
    .eq("id", "shipping")
    .single();

  const shipping = data?.value ?? {
    cost: 3.99,
    free_threshold: 50,
    enabled: true,
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your store settings
        </p>
      </div>

      <ShippingSettings initialSettings={shipping} />
    </div>
  );
}
