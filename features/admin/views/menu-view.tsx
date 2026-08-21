"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { useRoleGuard } from "@/features/serveuse/hooks/useRoleGuard";
import { useDataStore } from "@/store/useDataStore";
import { DishForm } from "../components/menu/forms/dish-form";
import { DishList } from "../components/menu/dish-list";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchMenu } from "@/features/guess/services/guess-services";
import { addDish } from "../services/menu-services";
import { Dish } from "@/type";
import { DishFormValues } from "../components/menu/forms/schema";
import { toast } from "react-toastify";

export default function MenuView() {
  const dishes = useDataStore((s) => s.dishes);
  const updateDish = useDataStore((s) => s.updateDish);
  const removeDish = useDataStore((s) => s.removeDish);

    const {data: responseMenu, error: errorMenu, refetch} = fetchMenu();
      if (errorMenu) {
        return <ErrorState/>
      }

  const handleAddDish = async (dish: DishFormValues)=>{
    try {
      await addDish({
        name: dish.name,
        description: dish.description || "",
        image: dish.image || "",
        available: true
      })
      await refetch();
      toast.success("Plat ajouté avec succès")
    } catch{
      toast.error("Une erreur s'est produite")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Menu" />
      <DishForm
        fallbackImage={dishes[0]?.image ?? ""}
        onSubmit={handleAddDish}
      />
      <DishList
        dishes={responseMenu || []}
        onUpdate={updateDish}
        onRemove={removeDish}
      />
    </div>
  );
}