"use client";

import { Reveal } from "@/components/common/Reveal";
import { GoldRule } from "@/components/common/GoldRule";
import PositionForm from "../components/form/position/position-form";

export default function InviteView() {
  return (
    <div className="mx-auto max-w-lg">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Bienvenue</p>
        <h1 className="text-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Où êtes-vous installé ?
        </h1>
        <GoldRule className="mx-auto mt-4" />
        <p className="mt-4 text-sm text-muted-foreground">
          Ces informations permettent à nos serveuses de vous retrouver rapidement.
        </p>
      </Reveal>
        <PositionForm />
    </div>
  );
}