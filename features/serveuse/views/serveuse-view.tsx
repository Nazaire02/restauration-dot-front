"use client";

import { AnimatePresence } from "motion/react";
import { HandPlatter } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { ServeuseOrderCard } from "../components/serveuse-order-card";
import { getCurrentUser } from "@/features/connexion/store/useUserStore";
import { fetchCommandesByServeuse, markServed } from "../services/serveuse-services";
import { ErrorState } from "@/components/common/ErrorState";
import { toast } from "react-toastify";

export default function ServeuseView() {
  const user = getCurrentUser()
  const { data: responseOrders, error: errorOrders, refetch } = fetchCommandesByServeuse({ waitressId: user?.id || "" });

  if (errorOrders) {
    return <ErrorState />
  }

  const handleOnServe = async (id: string) => {
    try {
      await markServed(id)
      await refetch()
      toast.success("Commande servie avec succès")
    } catch {
      toast.error("Oops, une erreur s'est produite")
    }
  }

  return (
    <div>
      <PageHeader
        title="Mes commandes"
        description="Les nouvelles commandes de vos tables arrivent ici en direct"
      />

      {responseOrders?.length === 0 ? (
        <EmptyState
          icon={HandPlatter}
          title="Tout est servi"
          description="Aucune commande en attente sur vos tables, veuillez rafraîchir la page de temps à autre"
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 mt-4">
          <AnimatePresence mode="popLayout">
            {responseOrders?.map((order, index) => (
              <ServeuseOrderCard
                key={index + 1}
                order={order}
                onServe={(id) => handleOnServe(id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
