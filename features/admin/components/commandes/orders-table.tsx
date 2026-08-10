"use client";

import { StatusBadge } from "@/components/common/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTime } from "@/utils/format";
import { Waitress } from "../../types/order";
import { Order } from "@/type";

export type OrdersTableProps = {
  orders: Order[];
  waitresses: Waitress[];
};

export function OrdersTable({ orders, waitresses }: Readonly<OrdersTableProps>) {
  return (
    <div className="surface-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Heure</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Chaise</TableHead>
            <TableHead>Plats</TableHead>
            <TableHead>Serveuse</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatTime(order.createdAt)}</TableCell>
              <TableCell>{order.table}</TableCell>
              <TableCell>{order.chair}</TableCell>
              <TableCell className="max-w-xs truncate">
                {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
              </TableCell>
              <TableCell>
                {waitresses.find((w) => w.id === order.waitressId)?.name ?? "—"}
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}