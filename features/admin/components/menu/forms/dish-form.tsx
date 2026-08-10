"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DishFormValues, dishSchema } from "./schema";

type DishFormProps = {
  fallbackImage: string;
  onSubmit: (data: {
    name: string;
    description: string;
    image: string;
    available: boolean;
  }) => void;
};

export function DishForm({
  fallbackImage,
  onSubmit,
}: Readonly<DishFormProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DishFormValues>({
    resolver: zodResolver(dishSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const onValid = (values: DishFormValues) => {
    onSubmit({
      name: values.name,
      description: values.description ?? "",
      image: values.image || fallbackImage,
      available: true,
    });
    reset({
      name: "",
      description: "",
      image: ""
    });
  };

  return (
    <section className="surface-card p-6">
      <h2 className="text-display text-2xl text-foreground">Nouveau plat</h2>

      <form
        className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        onSubmit={handleSubmit(onValid)}
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="d-name">Nom</Label>
          <Input
            id="d-name"
            className="min-h-11"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="d-desc">Description</Label>
          <Input
            id="d-desc"
            className="min-h-11"
            {...register("description")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="d-image">Photo (URL)</Label>
          <Input id="d-image" className="min-h-11" {...register("image")} />
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            className="min-h-11 w-full rounded-full"
            disabled={isSubmitting}
          >
            Ajouter le plat
          </Button>
        </div>
      </form>
    </section>
  );
}