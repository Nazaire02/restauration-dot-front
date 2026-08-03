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
import { useGuestStore } from "../../../../../store/useGuestStore";
import { useSessionStore } from "../../../../../store/useSessionStore";
import { FormValues, schema } from "./schema";

interface LoginFormProps {
  onSuccess?: (role: "admin" | "serveuse") => void;
  onError?: (message: string) => void;
}

export function LoginForm({ onSuccess, onError }: Readonly<LoginFormProps>) {
  const login = useSessionStore((s) => s.login);
  const setSeat = useGuestStore((s) => s.setSeat);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: FormValues) => {
    const user = login(values.email, values.password);

    if (!user) {
      onError?.("Identifiants incorrects.");
      return;
    }

    setSeat({ table: 1, chair: 1 });
    onSuccess?.(user.role);
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

        <Button type="submit" className="min-h-12 w-full rounded-full">
          Se connecter
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </Form>
  );
}
