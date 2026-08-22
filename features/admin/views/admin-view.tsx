"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { AdminStats } from "@/features/admin/components/admin-stats";
import { LatestOrders } from "@/features/admin/components/latest-orders";
import { useHydrated } from "@/hooks/useHydrated";

export default function AdminView() {
  const hydrated = useHydrated();
  

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
        ordersCount={5}
        servedCount={1}
        pendingCount={2}
        onlineWaitresses={4}
      />

      <LatestOrders orders={[]} />
    </div>
  );
}
