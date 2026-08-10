"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { AdminStats } from "@/features/admin/components/admin-stats";
import { LatestOrders } from "@/features/admin/components/latest-orders";
import { useDataStore } from "@/store/useDataStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function AdminView() {
  const hydrated = useHydrated();
  const orders = useDataStore((s) => s.orders);
  const waitresses = useDataStore((s) => s.waitresses);

  const served = orders.filter((o) => o.status === "servie").length;
  const pending = orders.filter((o) => o.status !== "servie").length;
  

  if (!hydrated) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Tableau de bord"
        description="Vue d'ensemble du service en temps réel."
      />

      <AdminStats
        ordersCount={orders.length}
        servedCount={served}
        pendingCount={pending}
        onlineWaitresses={waitresses.filter((w) => w.online).length}
      />

      <LatestOrders orders={orders} />
    </div>
  );
}
