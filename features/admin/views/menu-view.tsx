"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { DishForm } from "../components/menu/forms/dish-form";
import { DishList } from "../components/menu/dish-list";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchMenu } from "@/features/guess/services/guess-services";
import { addDish } from "../services/menu-services";
import { DishFormValues } from "../components/menu/forms/schema";
import { toast } from "react-toastify";

export default function MenuView() {
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
        fallbackImage={""}
        onSubmit={handleAddDish}
      />
      <DishList
        dishes={responseMenu || []}
        onUpdate={()=>console.log("")}
        onRemove={()=>console.log("")}
      />
    </div>
  );
}