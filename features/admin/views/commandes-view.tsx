"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { useHydrated } from "@/hooks/useHydrated";
import { OrdersFilters } from "../components/commandes/order-filters";
import { OrdersTable } from "../components/commandes/orders-table";
import { fetchTables } from "../services/table-and-chair-services";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchWaitresses } from "../services/waitress-services";
import { fetchCommandes } from "../services/commande-services";

export default function CommandesView() {
  const hydrated = useHydrated();

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