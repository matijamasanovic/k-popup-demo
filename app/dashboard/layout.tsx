import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {/* pt-14 on mobile for topbar, lg:pl-64 for desktop sidebar */}
      <main className="pt-14 lg:pt-0 lg:pl-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
