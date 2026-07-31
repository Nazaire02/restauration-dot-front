import { weddingConfig } from "@/lib/wedding-config";
import z from "zod";

export const schema = z.object({
  table: z.coerce
    .number("Numéro requis")
    .int("Nombre entier")
    .min(1, "Minimum 1")
    .max(weddingConfig.tableCount, `Maximum ${weddingConfig.tableCount}`),
  chair: z.coerce
    .number("Numéro requis")
    .int("Nombre entier")
    .min(1, "Minimum 1")
    .max(12, "Maximum 12"),
});

export type FormValues = z.input<typeof schema>;