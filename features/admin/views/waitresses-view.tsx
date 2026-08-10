"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { useRoleGuard } from "@/features/serveuse/hooks/useRoleGuard";
import { useDataStore } from "@/store/useDataStore";
import { WaitressForm } from "../components/waitresses/forms/waitress-form";
import { WaitressList } from "../components/waitresses/waitress-list";

export default function WaitressesView() {
  const { ready } = useRoleGuard("admin");
  const waitresses = useDataStore((s) => s.waitresses);
  const addWaitress = useDataStore((s) => s.addWaitress);
  const updateWaitress = useDataStore((s) => s.updateWaitress);
  const removeWaitress = useDataStore((s) => s.removeWaitress);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Serveuses" />

      <WaitressForm onSubmit={addWaitress} />

      <WaitressList
        waitresses={waitresses}
        onUpdate={updateWaitress}
        onRemove={removeWaitress}
      />
    </div>
  );
}