"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusLabels } from "@/utils/format";
import type { OrderStatus } from "@/type";

type Waitress = {
  id: string;
  name: string;
};

type OrdersFiltersProps = {
  table: string;
  waitress: string;
  status: string;
  tables: number[];
  waitresses: Waitress[];
  onTableChange: (value: string) => void;
  onWaitressChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function OrdersFilters({
  table,
  waitress,
  status,
  tables,
  waitresses,
  onTableChange,
  onWaitressChange,
  onStatusChange,
}: OrdersFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={table} onValueChange={onTableChange}>
        <SelectTrigger className="min-h-11 w-40" aria-label="Filtrer par table">
          <SelectValue placeholder="Table" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les tables</SelectItem>
          {tables.map((t) => (
            <SelectItem key={t} value={String(t)}>
              Table {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={waitress} onValueChange={onWaitressChange}>
        <SelectTrigger className="min-h-11 w-52" aria-label="Filtrer par serveuse">
          <SelectValue placeholder="Serveuse" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les serveuses</SelectItem>
          {waitresses.map((w) => (
            <SelectItem key={w.id} value={w.id}>
              {w.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="min-h-11 w-48" aria-label="Filtrer par statut">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
            <SelectItem key={s} value={s}>
              {statusLabels[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}