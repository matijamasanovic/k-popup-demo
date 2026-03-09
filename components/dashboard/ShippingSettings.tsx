"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Truck, Info } from "lucide-react";

interface ShippingConfig {
  cost: number;
  free_threshold: number;
  enabled: boolean;
}

interface Props {
  initialSettings: ShippingConfig;
}

export function ShippingSettings({ initialSettings }: Props) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<ShippingConfig>(initialSettings);

  function update(field: keyof ShippingConfig, value: any) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    const { error } = await supabase
      .from("settings")
      .update({ value: settings, updated_at: new Date().toISOString() })
      .eq("id", "shipping");

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-2xl">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-sm px-4 py-3 rounded-xl">
          Settings saved successfully!
        </div>
      )}

      {/* Toggle */}
      <div className="bg-card border border-border rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Shipping</h2>
            <p className="text-xs text-muted-foreground">
              Configure delivery cost and free shipping threshold
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div
            onClick={() => update("enabled", !settings.enabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              settings.enabled ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-foreground">
            {settings.enabled ? "Shipping enabled" : "Free for all orders"}
          </span>
        </div>
      </div>

      {/* Cost */}
      {settings.enabled && (
        <div className="bg-card border border-border rounded-2xl p-5 md:p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Delivery Cost</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Shipping Cost (€)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  €
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={settings.cost}
                  onChange={(e) =>
                    update("cost", parseFloat(e.target.value) || 0)
                  }
                  className="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Charged on orders below the free threshold
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Free Shipping Above (€)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  €
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={settings.free_threshold}
                  onChange={(e) =>
                    update("free_threshold", parseFloat(e.target.value) || 0)
                  }
                  className="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Set to 0 to disable free shipping.
              </p>
            </div>
          </div>
          <div className="bg-muted/40 border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium uppercase tracking-wider">
                Preview
              </span>
            </div>
            <div className="flex justify-between text-sm gap-2">
              <span className="text-muted-foreground">
                Under €{settings.free_threshold}
              </span>
              <span className="font-semibold text-foreground shrink-0">
                +€{settings.cost.toFixed(2)} shipping
              </span>
            </div>
            <div className="flex justify-between text-sm gap-2">
              <span className="text-muted-foreground">
                €{settings.free_threshold}+
              </span>
              <span className="font-semibold text-green-600 shrink-0">
                Free shipping 🎉
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 text-sm w-full sm:w-auto justify-center"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
