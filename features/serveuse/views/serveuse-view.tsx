"use client";

import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { HandPlatter } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { useDataStore } from "@/store/useDataStore";
import { ServeuseOrderCard } from "../components/serveuse-order-card";
import { useRealtimeOrders } from "../hooks/useRealTimeOrders";
import { useRoleGuard } from "../hooks/useRoleGuard";
import { initialWaitresses } from "@/mock-data/staff.mock";
import { initialOrders } from "@/mock-data/orders.mock";

export default function ServeuseView() {
  const { user, ready } = useRoleGuard("serveuse");
  const waitresses = useDataStore((state) => state.waitresses);
  const orders = useDataStore((state) => state.orders);
  const setOrderStatus = useDataStore((state) => state.setOrderStatus);

  const myTables = useMemo(
    () => waitresses.find((waitress) => waitress.id === user?.id)?.tables ?? [],
    [waitresses, user?.id],
  );

  useRealtimeOrders(myTables);

  const visibleOrders = orders
    .filter((order) => myTables.includes(order.table) && order.status !== "servie")
    .sort((a, b) => a.createdAt - b.createdAt);

//   if (!ready) return null;

  return (
    <div> 
      <PageHeader
        eyebrow={`Tables ${myTables.join(", ") || "—"}`}
        title="Mes commandes"
        description="Les nouvelles commandes de vos tables arrivent ici en direct."
      />

      {initialOrders.length === 0 ? (
        <EmptyState
          icon={HandPlatter}
          title="Tout est servi"
          description="Aucune commande en attente sur vos tables."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 mt-4">
          <AnimatePresence mode="popLayout">
            {initialOrders.map((order) => (
              <ServeuseOrderCard
                key={order.id}
                order={order}
                onTake={() => setOrderStatus(order.id, "en_cours", user?.id ?? null)}
                onServe={() => setOrderStatus(order.id, "servie", user?.id ?? null)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
