"use client";

import { useEffect, useState } from "react";
import { Armchair, Check, PencilLine, Utensils, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { weddingConfig } from "@/lib/wedding-config";
import { useGuestStore } from "@/store/useGuestStore";

export function SeatEditorCard() {
  const seat = useGuestStore((s) => s.seat);
  const setSeat = useGuestStore((s) => s.setSeat);

  const [isEditing, setIsEditing] = useState(false);
  const [table, setTable] = useState(seat?.table ?? 1);
  const [chair, setChair] = useState(seat?.chair ?? 1);

  useEffect(() => {
    if (seat) {
      setTable(seat.table);
      setChair(seat.chair);
    }
  }, [seat]);

  const handleSave = () => {
    const nextTable = Math.min(
      Math.max(Number.parseInt(String(table), 10) || 1, 1),
      weddingConfig.tableCount,
    );
    const nextChair = Math.min(Math.max(Number.parseInt(String(chair), 10) || 1, 1), 12);

    setSeat({ table: nextTable, chair: nextChair });
    setTable(nextTable);
    setChair(nextChair);
    setIsEditing(false);
  };

  return (
    <div className="surface-card mb-6 rounded-[1.5rem] border border-border/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-primary">Votre place</p>
          <h2 className="mt-2 text-display text-xl font-semibold text-foreground">
            {seat ? `Table ${seat.table} · chaise ${seat.chair}` : "Choisissez votre place"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {seat
              ? "Votre commande sera envoyée à cette place."
              : "Indiquez votre table et votre chaise pour personnaliser votre expérience."}
          </p>
        </div>

        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            className="min-h-11 rounded-full"
            onClick={() => {
              setTable(seat?.table ?? 1);
              setChair(seat?.chair ?? 1);
              setIsEditing(true);
            }}
          >
            <PencilLine className="size-4" aria-hidden />
            <span>{seat ? "Modifier" : "Ajouter"}</span>
          </Button>
        ) : null}
      </div>

      {isEditing ? (
        <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-secondary/30 p-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-foreground">
            <span className="flex items-center gap-2">
              <Utensils className="size-4 text-primary" aria-hidden />
              Numéro de table
            </span>
            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={weddingConfig.tableCount}
              value={table}
              onChange={(event) => setTable(Number(event.target.value))}
              className="min-h-11"
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span className="flex items-center gap-2">
              <Armchair className="size-4 text-primary" aria-hidden />
              Numéro de chaise
            </span>
            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={chair}
              onChange={(event) => setChair(Number(event.target.value))}
              className="min-h-11"
            />
          </label>

          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="button" className="min-h-11 rounded-full" onClick={handleSave}>
              <Check className="size-4" aria-hidden />
              <span>Enregistrer</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-11 rounded-full"
              onClick={() => setIsEditing(false)}
            >
              <X className="size-4" aria-hidden />
              <span>Annuler</span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
