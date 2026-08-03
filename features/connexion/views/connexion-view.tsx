"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoldRule } from "@/components/common/GoldRule";
import { Reveal } from "@/components/common/Reveal";
import { weddingConfig } from "@/lib/wedding-config";
import { LoginForm } from "@/features/connexion/components/form/login/login-form";

export function ConnexionView() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="surface-card relative w-full max-w-md p-8"
      >
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-primary">{weddingConfig.monogram}</p>
          <h1 className="text-display mt-3 text-3xl font-semibold text-foreground">
            Espace personnel
          </h1>
          <GoldRule className="mt-3" />
          <p className="mt-3 text-sm text-muted-foreground">
            Réservé aux administrateurs et aux serveuses.
          </p>
        </Reveal>

        <LoginForm
          onError={setError}
          onSuccess={(role) => {
            router.push(role === "admin" ? "/admin" : "/serveuse");
          }}
        />

        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
