"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, LockKeyhole, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { FormValues, schema } from "./schema";
import { login } from "@/features/connexion/services/connexion-services";
import { useUserStore } from "@/features/connexion/store/useUserStore";
import { isErrorResponse } from "@/services/error-handler";
import { Role } from "@/type";

interface LoginFormProps {
  onSuccess?: (role: Role) => void;
  onError?: (message: string | null) => void;
}

export function LoginForm({ onSuccess, onError }: Readonly<LoginFormProps>) {
  const setSession = useUserStore((s) => s.setSession);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    onError?.(null);
    try {
      const session = await login(values);
      setSession(session);
      onSuccess?.(session.user.role);
    } catch (error) {
      onError?.(
        isErrorResponse(error)
          ? error.details
          : "Connexion impossible. Veuillez réessayer.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="size-4 text-primary" aria-hidden />
                Adresse e-mail
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="vous@dot.ci"
                  className="min-h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <LockKeyhole className="size-4 text-primary" aria-hidden />
                Mot de passe
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  className="min-h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="min-h-12 w-full rounded-full"
        >
          {form.formState.isSubmitting ? "Connexion..." : "Se connecter"}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </Form>
  );
}
