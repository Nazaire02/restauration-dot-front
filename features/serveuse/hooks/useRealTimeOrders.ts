import { useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";
import { realtimeClient } from "@/mock-data/realtime.mock";

/** S'abonne au flux de commandes en direct pour les tables données. */
export function useRealtimeOrders(watchedTables?: number[]) {
  const pushOrder = useDataStore((s) => s.pushOrder);

  useEffect(() => {
    const unsubscribe = realtimeClient.on("order:new", (order) => {
      pushOrder(order);
      if (!watchedTables || watchedTables.includes(order.table)) {
        // toast("Nouvelle commande", {
        //   description: `Table ${order.table} · chaise ${order.chair}`,
        // });
      }
    });
    return unsubscribe;
  }, [pushOrder, watchedTables]);
}