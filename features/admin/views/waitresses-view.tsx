"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { useDataStore } from "@/store/useDataStore";
import { WaitressForm } from "../components/waitresses/forms/waitress-form";
import { WaitressList } from "../components/waitresses/waitress-list";
import { fetchWaitresses } from "../services/waitress-services";
import { ErrorState } from "@/components/common/ErrorState";

export default function WaitressesView() {
  const addWaitress = useDataStore((s) => s.addWaitress);
  const updateWaitress = useDataStore((s) => s.updateWaitress);
  const removeWaitress = useDataStore((s) => s.removeWaitress);

  const {data: responseWaitresses, error: errorWaitresses} = fetchWaitresses();
    if (errorWaitresses) {
      return <ErrorState/>
    }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Serveuses" />

      <WaitressForm onSubmit={addWaitress} />

      <WaitressList
        waitresses={responseWaitresses || []}
        onUpdate={updateWaitress}
        onRemove={removeWaitress}
      />
    </div>
  );
}