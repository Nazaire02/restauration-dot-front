"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { useRoleGuard } from "@/features/serveuse/hooks/useRoleGuard";
import { useDataStore } from "@/store/useDataStore";
import { useHydrated } from "@/hooks/useHydrated";
import { OrdersFilters } from "../components/commandes/order-filters";
import { OrdersTable } from "../components/commandes/orders-table";

export default function CommandesView() {
  const hydrated = useHydrated();
  const { ready } = useRoleGuard("admin");
  const orders = useDataStore((s) => s.orders);
  const waitresses = useDataStore((s) => s.waitresses);

  const [table, setTable] = useState("all");
  const [waitress, setWaitress] = useState("all");
  const [status, setStatus] = useState("all");

  if (!hydrated) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const tables = [...new Set(orders.map((o) => o.table))].sort((a, b) => a - b);

  const rows = orders
    .filter((o) => table === "all" || String(o.table) === table)
    .filter((o) => waitress === "all" || o.waitressId === waitress)
    .filter((o) => status === "all" || o.status === status)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Commandes" />

      <OrdersFilters
        table={table}
        waitress={waitress}
        status={status}
        tables={tables}
        waitresses={waitresses}
        onTableChange={setTable}
        onWaitressChange={setWaitress}
        onStatusChange={setStatus}
      />

      <OrdersTable orders={rows} waitresses={waitresses} />
    </div>
  );
}