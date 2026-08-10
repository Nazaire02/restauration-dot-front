"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { useRoleGuard } from "@/features/serveuse/hooks/useRoleGuard";
import { useDataStore } from "@/store/useDataStore";
import { DishForm } from "../components/menu/forms/dish-form";
import { DishList } from "../components/menu/dish-list";

export default function MenuView() {
  const { ready } = useRoleGuard("admin");
  const dishes = useDataStore((s) => s.dishes);
  const addDish = useDataStore((s) => s.addDish);
  const updateDish = useDataStore((s) => s.updateDish);
  const removeDish = useDataStore((s) => s.removeDish);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Menu" />
      <DishForm
        fallbackImage={dishes[0]?.image ?? ""}
        onSubmit={addDish}
      />
      <DishList
        dishes={dishes}
        onUpdate={updateDish}
        onRemove={removeDish}
      />
    </div>
  );
}