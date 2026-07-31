"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoldRule } from "@/components/common/GoldRule";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { weddingConfig } from "@/lib/wedding-config";
import Image from "next/image";


const ease = [0.22, 1, 0.36, 1] as const;
export default function Home() {
  const [curtain, setCurtain] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setCurtain(false), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AnimatePresence>
        {curtain ? (
          <motion.div
            key="curtain"
            aria-hidden
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, ease }}
              className="text-display text-2xl text-primary-foreground"
            >
              {weddingConfig.monogram}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Décor très discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[26rem] rounded-full bg-primary-soft blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 size-[22rem] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease }}
          className="max-w-xl text-center lg:text-left"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Cérémonie de dot</p>
          <GoldRule className="mx-auto mt-4 lg:mx-0" />
          <h1 className="text-display mt-6 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Bienvenue à la cérémonie de dot de {weddingConfig.groom} &amp; {weddingConfig.bride}
          </h1>
          <p className="mt-5 text-base text-muted-foreground">
            {weddingConfig.date} · {weddingConfig.place}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Installez-vous, indiquez votre place, et laissez-vous servir.
          </p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <Button asChild size="lg" className="min-h-12 rounded-full px-10 shadow-soft">
              <Link href="/invite">Entrer</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.7, ease }}
          className="grid w-full max-w-md grid-cols-2 gap-4"
        >
          <Image
            src="/assets/bride.jpg"
            alt={`${weddingConfig.groom} et ${weddingConfig.bride} en tenue de cérémonie`}
            width={1200}
            height={1504}
            className="col-span-2 h-72 w-full rounded-3xl object-cover shadow-lifted sm:h-96"
          />
          <Image
            src="/assets/groom.jpg"
            alt={`Portrait du marié ${weddingConfig.groom}`}
            width={900}
            height={1200}
            loading="lazy"
            className="h-40 w-full rounded-2xl object-cover shadow-soft sm:h-48"
          />
          <Image
            src="/assets/bride.jpg"
            alt={`Portrait de la mariée ${weddingConfig.bride}`}
            width={900}
            height={1200}
            loading="lazy"
            className="h-40 w-full rounded-2xl object-cover shadow-soft sm:h-48"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 text-center text-xs text-muted-foreground"
      >
        Équipe &amp; service ·{" "}
        <Link href="/connexion" className="underline underline-offset-4 hover:text-primary">
          Espace personnel
        </Link>
      </motion.div>
    </div>
  );
}
