"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const parseTables = (value: string) =>
  value
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isInteger(v) && v > 0);

type Waitress = {
  id: string;
  name: string;
  email: string;
  tables: number[];
  online: boolean;
};

type WaitressListProps = {
  waitresses: Waitress[];
  onUpdate: (id: string, data: Partial<Pick<Waitress, "tables" | "online">>) => void;
  onRemove: (id: string) => void;
};

export function WaitressList({
  waitresses,
  onUpdate,
  onRemove,
}: WaitressListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {waitresses.map((w) => (
        <li key={w.id} className="surface-card p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <p className="text-display truncate text-xl text-foreground">
                {w.name}
              </p>
              <p className="truncate text-sm text-muted-foreground">{w.email}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="min-h-11 min-w-11 shrink-0"
              aria-label={`Supprimer ${w.name}`}
              onClick={() => onRemove(w.id)}
            >
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`tables-${w.id}`}>Tables attribuées</Label>
            <Input
              id={`tables-${w.id}`}
              defaultValue={w.tables.join(", ")}
              className="min-h-11"
              onBlur={(e) =>
                onUpdate(w.id, { tables: parseTables(e.target.value) })
              }
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch
              id={`online-${w.id}`}
              checked={w.online}
              onCheckedChange={(online) => onUpdate(w.id, { online })}
            />
            <Label htmlFor={`online-${w.id}`}>En service</Label>
          </div>
        </li>
      ))}
    </ul>
  );
}