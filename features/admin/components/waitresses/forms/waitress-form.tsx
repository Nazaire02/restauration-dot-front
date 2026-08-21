"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WaitressFormValues, waitressSchema } from "./schema";
import { addWaitress } from "@/features/admin/services/waitress-services";
import { toast } from "react-toastify";

const parseTables = (value: string) =>
  value
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isInteger(v) && v > 0);

type WaitressFormProps = {
  onSubmit: (data: { name: string; email: string; tables: number[] }) => void;
};

export function WaitressForm({ onSubmit }: Readonly<WaitressFormProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitressFormValues>({
    resolver: zodResolver(waitressSchema),
    defaultValues: {
      name: "",
      email: "",
      tables: "",
      password: ""
    },
  });

  const onValid = async (values: WaitressFormValues) => {
    try {
      await addWaitress({
        name: values.name,
        email: values.email,
        password: values.password,
        tables: parseTables(values.tables ?? ""),
      })
      toast.success("Serveur ajouté avec succès")
    } catch {
      toast.error("Une erreur s'est produite")
    }
    reset();
  };

  return (
    <form
      className="surface-card grid gap-4 p-6 sm:grid-cols-4"
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="w-name">Nom</Label>
        <Input
          id="w-name"
          className="min-h-11"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="w-email">E-mail</Label>
        <Input
          id="w-email"
          type="email"
          className="min-h-11"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="w-password">Password</Label>
        <Input
          id="w-password"
          type="password"
          className="min-h-11"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="w-tables">Tables (ex : 1, 2, 3)</Label>
        <Input
          id="w-tables"
          className="min-h-11"
          {...register("tables")}
        />
      </div>

      <div className="flex items-end">
        <Button
          type="submit"
          className="min-h-11 w-full rounded-full"
          disabled={isSubmitting}
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
}