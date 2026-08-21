"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { useRoleGuard } from "@/features/serveuse/hooks/useRoleGuard";
import { useDataStore } from "@/store/useDataStore";
import { useHydrated } from "@/hooks/useHydrated";
import { OrdersFilters } from "../components/commandes/order-filters";
import { OrdersTable } from "../components/commandes/orders-table";
import { fetchTables } from "../services/table-and-chair-services";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchWaitresses } from "../services/waitress-services";
import { fetchCommandes } from "../services/commande-services";

export default function CommandesView() {
  const hydrated = useHydrated();
  const orders = useDataStore((s) => s.orders);

  const [table, setTable] = useState("all");
  const [waitress, setWaitress] = useState("all");
  const [status, setStatus] = useState("all");

  const {data: responseTables, error: errorTables} = fetchTables();
  const {data: responseWaitresses, error: errorWaitresses} = fetchWaitresses();
  const {data: responseOrders, error: errorOrders} = fetchCommandes({table, waitressId: waitress, status});

  if (errorTables || errorWaitresses || errorOrders) {
    return <ErrorState />
  }

  if (!hydrated) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const tables = responseTables?.map(tab => tab.number) ?? [];
  console.log(tables, "tab")

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
        waitresses={responseWaitresses || []}
        onTableChange={setTable}
        onWaitressChange={setWaitress}
        onStatusChange={setStatus}
      />

      <OrdersTable orders={responseOrders || []} waitresses={responseWaitresses || []} />
    </div>
  );
}