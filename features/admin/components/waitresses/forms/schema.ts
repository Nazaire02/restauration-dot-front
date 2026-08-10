import z from "zod";

export const waitressSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis"),
  email: z.string().trim().email("E-mail invalide"),
  tables: z.string().optional(),
});

export type WaitressFormValues = z.infer<typeof waitressSchema>;