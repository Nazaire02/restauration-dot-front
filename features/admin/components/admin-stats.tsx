import { ClipboardList, CheckCircle2, Hourglass, Users, Table2 } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { weddingConfig } from "@/lib/wedding-config";

interface AdminStatsProps {
  ordersCount: number;
  servedCount: number;
  pendingCount: number;
  onlineWaitresses: number;
}

export function AdminStats({ ordersCount, servedCount, pendingCount, onlineWaitresses }: Readonly<AdminStatsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 mt-4">
      <StatCard label="Commandes du jour" value={ordersCount} icon={ClipboardList} />
      <StatCard label="Servies" value={servedCount} icon={CheckCircle2} delay={0.05} />
      <StatCard label="En attente" value={pendingCount} icon={Hourglass} delay={0.1} />
      <StatCard label="Serveuses connectées" value={onlineWaitresses} icon={Users} delay={0.15} />
      <StatCard label="Tables" value={weddingConfig.tableCount} icon={Table2} delay={0.2} />
    </div>
  );
}
